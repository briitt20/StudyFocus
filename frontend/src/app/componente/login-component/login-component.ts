import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  modo: 'acceso' | 'registro' = 'acceso';
  mostrarClave = false;
  intentoAcceso = false;
  intentoRegistro = false;
  registroExitoso = false;
  errorMensaje = '';
  cargando = false;

  loginData = { correo: '', clave: '', recordar: false };
  registroData = { nombres: '', apellidos: '', correo: '', clave: '' };

  cambiarModo(nuevoModo: 'acceso' | 'registro') {
    this.modo = nuevoModo;
    this.registroExitoso = false;
    this.errorMensaje = '';
  }

  iniciarSesion() {
    this.intentoAcceso = true;
    this.errorMensaje = '';
    if (!this.loginData.correo || this.loginData.clave.length < 6) return;

    this.cargando = true;
    this.authService.login(this.loginData.correo, this.loginData.clave).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje =
          err?.error?.detail ?? 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
      }
    });
  }

  registrarCuenta() {
    this.intentoRegistro = true;
    this.errorMensaje = '';
    if (
      !this.registroData.nombres ||
      !this.registroData.apellidos ||
      !this.registroData.correo ||
      this.registroData.clave.length < 6
    ) return;

    this.cargando = true;
    this.authService
      .register(
        this.registroData.nombres,
        this.registroData.apellidos,
        this.registroData.correo,
        this.registroData.clave
      )
      .subscribe({
        next: () => {
          this.cargando = false;
          this.registroExitoso = true;
        },
        error: (err) => {
          this.cargando = false;
          this.errorMensaje =
            err?.error?.detail ?? 'Error al registrar. Comprueba los datos e inténtalo de nuevo.';
        }
      });
  }
}
