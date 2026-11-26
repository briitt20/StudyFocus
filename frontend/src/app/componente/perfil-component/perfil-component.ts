import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-perfil-component',
  styleUrl: './perfil-component.css',
  templateUrl: './perfil-component.html',
})
export class PerfilComponent {
  cambiosGuardados = false;

  private datosIniciales = {
    nombres: 'Estudiante',
    apellidos: 'Universitario',
    codigo: '20210492',
    correo: 'estudiante@universidad.edu.pe',
    carrera: 'Medicina Humana',
    sede: 'Hospital Nacional Dos de Mayo'
  };

  estudiante = { ...this.datosIniciales };

  guardarCambios() {
    this.cambiosGuardados = true;
  }

  descartarCambios() {
    this.estudiante = { ...this.datosIniciales };
    this.cambiosGuardados = false;
  }
}
