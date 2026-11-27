import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioOut, UsuarioUpdate } from '../../core/models/usuario.model';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-perfil-component',
  styleUrl: './perfil-component.css',
  templateUrl: './perfil-component.html',
})
export class PerfilComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  cargando = true;
  cambiosGuardados = false;
  errorMensaje = '';

  estudiante: UsuarioOut = {
    id_usuario: 0,
    nombre: '',
    correo: '',
    carrera: '',
    ciclo: undefined
  };

  // Copia para restaurar al descartar
  private datosIniciales: UsuarioOut = { ...this.estudiante };

  ngOnInit(): void {
    this.usuarioService.getMe().subscribe({
      next: (data) => {
        this.estudiante = { ...data };
        this.datosIniciales = { ...data };
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'No se pudo cargar el perfil.';
      }
    });
  }

  guardarCambios() {
    this.errorMensaje = '';
    const payload: UsuarioUpdate = {
      nombre: this.estudiante.nombre,
      carrera: this.estudiante.carrera,
      ciclo: this.estudiante.ciclo
    };
    this.usuarioService.updateMe(payload).subscribe({
      next: (data) => {
        this.estudiante = { ...data };
        this.datosIniciales = { ...data };
        this.cambiosGuardados = true;
      },
      error: () => {
        this.errorMensaje = 'Error al guardar los cambios.';
      }
    });
  }

  descartarCambios() {
    this.estudiante = { ...this.datosIniciales };
    this.cambiosGuardados = false;
    this.errorMensaje = '';
  }
}
