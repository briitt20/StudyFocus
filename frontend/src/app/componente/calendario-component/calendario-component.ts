import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-calendario-component',
  styleUrl: './calendario-component.css',
  templateUrl: './calendario-component.html',
})
export class CalendarioComponent {
  actividadGuardada = false;

  nuevaActividad = {
    titulo: '',
    tipo: 'tarea',
    asignatura: 'Fisiología',
    fecha: '2025-11-17',
    hora: '23:59'
  };

  guardarActividad() {
    if (this.nuevaActividad.titulo.trim()) {
      this.actividadGuardada = true;
      this.nuevaActividad.titulo = '';
    }
  }
}
