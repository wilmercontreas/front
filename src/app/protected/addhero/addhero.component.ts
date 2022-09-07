import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addhero',
  templateUrl: './addhero.component.html',
  styleUrls: ['./addhero.component.css']
})
export class AddheroComponent implements OnInit {

  // creacion del formulario reactivo 
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    alias: ['', [Validators.required]],
    power: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private heroService: HeroService){}

  ngOnInit(): void {}

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
  crearHeroe(){
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
    
    // llamado al servicio de crear
    this.heroService.agregarHeroe(this.miFormulario.value).subscribe(ok => {

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
