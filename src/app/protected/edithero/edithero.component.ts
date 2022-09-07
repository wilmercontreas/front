import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-edithero',
  templateUrl: './edithero.component.html',
  styleUrls: ['./edithero.component.css']
})
export class EditheroComponent implements OnInit {

  hero: any = {};
  id: string = ""; 
  heroNotFound: boolean = false;

  //creacion del formulario reactivo 
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    alias: ['', [Validators.required]],
    power: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.cargarHeroe();
  }

  cargarHeroe(){
    this.activatedRoute.params.pipe(
      switchMap( params => {
        this.id = params['id'];
        return this.heroService.getHeroePorId(params['id']);
      })
    ).subscribe({
        next: resp => {
          if (resp.length === 0) {
            this.heroNotFound = true;
          }
          this.hero = resp[0];
          this.miFormulario.patchValue({
            name: this.hero.name,
            alias: this.hero.alias,
            power: this.hero.power
          });
        },
        error: () => this.heroNotFound = true
    });
  }

  // mostrar mensaje de error para el campo de name 
  get mnsgErrName(): string {
    if(this.miFormulario.controls['name']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // mostrar mensaje de error para el campo de alias 
  get mnsgErrAlias(): string {
    if(this.miFormulario.controls['alias']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // mostrar mensaje de error para el campo de power 
  get mnsgErrpower(): string {
    if(this.miFormulario.controls['power']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // evaluar si campos del fomulario fueron tocados y son invalidos para mostrarmensage de error
  campoNoValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }
  
  // metodo submit del formulario
  editarHeroe(){
    // campos del formulario incorrecto
    if (!this.miFormulario.valid) {
      this.miFormulario.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Llene el formulario correctamente',
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    const obj = {
      id: this.id,
      ...this.miFormulario.value
    }
    // llamado al servicio de crear
    this.heroService.editarHeroe(obj).subscribe(ok => {
      if ( ok.ok === true ) {
        Swal.fire({
          icon: 'success',
          title: 'Creado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops... no se realizo la accion',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
