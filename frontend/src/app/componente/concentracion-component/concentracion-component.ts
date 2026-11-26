import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-concentracion-component',
  styleUrl: './concentracion-component.css',
  templateUrl: './concentracion-component.html',
})
export class ConcentracionComponent {
  nivelSeleccionado = 4;
  sesionGuardada = true;

  niveles = [
    { valor: 1, titulo: 'Bajo', colorClase: 'text-danger', descripcion: 'Con distracciones frecuentes' },
    { valor: 2, titulo: 'Medio', colorClase: 'text-warning', descripcion: 'Enfoque parcial intermitente' },
    { valor: 3, titulo: 'Alto', colorClase: 'text-primary', descripcion: 'Ritmo sólido y continuado' },
    { valor: 4, titulo: 'Excelente', colorClase: 'text-success', descripcion: 'Flujo ininterrumpido pleno' }
  ];

  historial = [
    { fecha: '24/10/2024', metodo: 'Pomodoro', nivelTexto: 'Excelente', badgeClase: 'bg-success-subtle text-success' },
    { fecha: '23/10/2024', metodo: 'Recuperación Activa', nivelTexto: 'Alto', badgeClase: 'bg-primary-subtle text-primary' },
    { fecha: '22/10/2024', metodo: 'Método Cornell', nivelTexto: 'Medio', badgeClase: 'bg-warning-subtle text-warning' },
    { fecha: '22/10/2024', metodo: 'Repetición Espaciada', nivelTexto: 'Alto', badgeClase: 'bg-primary-subtle text-primary' }
  ];

  seleccionarNivel(valor: number) {
    this.nivelSeleccionado = valor;
    this.sesionGuardada = true;
  }
}
