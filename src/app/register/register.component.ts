/*import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent implements OnInit {
  formularioRegister: FormGroup;
  authService = inject(AuthService);

  constructor(private form: FormBuilder) {
    this.formularioRegister = this.form.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.formularioRegister = this.form.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  hasError(controlName: string, errorType: string) {
    return this.formularioRegister.get(controlName)?.hasError(errorType) && this.formularioRegister.get(controlName)?.touched;
  }

  register() {
    if (this.formularioRegister.invalid) {
      this.formularioRegister.markAllAsTouched();
      return;
    }

    const registerData = this.formularioRegister.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful');
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration error, please try again');
      }
    });
  }
}*/

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  registrarUsuario() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.userService.register(this.registroForm.value).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro');
      }
    });
  }
}


