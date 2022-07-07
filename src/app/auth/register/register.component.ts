import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // creacion del formucario reactivo 
  miFormulario : FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.authService.validatorEmailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router : Router,
    private authService: AuthService) {}

  ngOnInit(): void {
  }

  // mostrar mensaje de error para el campo de name 
  get mnsgErrName(): string {
    if(this.miFormulario.controls['name']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // mostrar mensaje de error para el campo de email 
  get mnsgErrEmail(): string {
    if(this.miFormulario.controls['email']?.errors?.['required']){
      return 'El campo es obligatorio'
    } else if(this.miFormulario.controls['email']?.errors?.['pattern']){
      return 'El Formato del correo no es valido'
    }
    return '';
  };

  // mostrar mensaje de error para el campo de password 
  get mnsgErrPassword(): string {
    if(this.miFormulario.controls['password']?.errors?.['required']){
      return 'El campo es obligatorio'
    } else if(this.miFormulario.controls['password']?.errors?.['minlength']){
      return 'Este campo debe tener minimo 6 caracteres'
    }
    return '';
  };

  // evaluar si campos del fomulario fueron tocados y son invalidos para mostrarmensage de error
  campoNoValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  // metodo submit del formulario 
  register(){
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
    
    // llamado al servicio de registro
    this.authService.registro(this.miFormulario.value).subscribe(ok => {
      if (ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok
        });
      }
    });
  }

}
