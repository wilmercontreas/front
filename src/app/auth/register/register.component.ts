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

  miFormulario : FormGroup = this.fb.group({
    name: ['wilmer contreras', [Validators.required]],
    email: ['wilmer.152.contreras@gmail.com', [Validators.required, Validators.email]],
    password: ['wilmer123', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
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
