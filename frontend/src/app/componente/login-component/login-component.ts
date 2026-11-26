import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private router = inject(Router);

  modo: 'acceso' | 'registro' = 'acceso';
  mostrarClave = false;
  intentoAcceso = false;
  intentoRegistro = false;
  registroExitoso = false;

  loginData = { correo: '', clave: '', recordar: false };
  registroData = { nombres: '', apellidos: '', correo: '', clave: '' };

  cambiarModo(nuevoModo: 'acceso' | 'registro') {
    this.modo = nuevoModo;
    this.registroExitoso = false;
  }

  iniciarSesion() {
    this.intentoAcceso = true;
    if (this.loginData.correo && this.loginData.clave.length >= 6) {
      this.router.navigate(['/inicio']);
    }
  }

  registrarCuenta() {
    this.intentoRegistro = true;
    if (
      this.registroData.nombres &&
      this.registroData.apellidos &&
      this.registroData.correo &&
      this.registroData.clave.length >= 6
    ) {
      this.registroExitoso = true;
    }
  }
}
