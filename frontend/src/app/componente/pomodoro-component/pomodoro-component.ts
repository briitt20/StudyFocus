import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-pomodoro-component',
  styleUrl: './pomodoro-component.css',
  templateUrl: './pomodoro-component.html',
})
export class PomodoroComponent implements OnDestroy{
  private cdr = inject(ChangeDetectorRef);
  minutosModo = 25;
  segundos = 25 * 60;
  temporizador: any = null;
  textoBoton = 'Iniciar Temporizador';
  nuevaTarea = '';

  tareas = [
    { titulo: 'Revisar ciclo cardíaco y ruidos', subtitulo: 'Guía pág. 42-47', completada: true, prioridad: false },
    { titulo: 'Anotar fórmulas de gasto cardíaco', subtitulo: 'Prioridad alta', completada: false, prioridad: true },
    { titulo: 'Resolver 3 casos clínicos', subtitulo: 'Banco de preguntas', completada: false, prioridad: false }
  ];

  get tareasCompletadas(): number {
    return this.tareas.filter(t => t.completada).length;
  }

  get tiempoFormateado(): string {
    const m = String(Math.floor(this.segundos / 60)).padStart(2, '0');
    const s = String(this.segundos % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  seleccionarModo(minutos: number) {
    this.minutosModo = minutos;
    this.detenerIntervalo();
    this.textoBoton = 'Iniciar Temporizador';
    this.segundos = minutos * 60;
  }

  alternarTemporizador() {
    if (this.temporizador) {
      this.detenerIntervalo();
      this.textoBoton = 'Reanudar Temporizador';
    } else {
      this.textoBoton = 'Pausar Temporizador';
      this.temporizador = setInterval(() => {
        if (this.segundos > 0) {
          this.segundos--;
        } else {
          this.detenerIntervalo();
          this.textoBoton = 'Iniciar Temporizador';
          alert('¡Bloque Pomodoro completado!');
        }
        this.cdr.markForCheck();
      }, 1000);
    }
  }

  reiniciarTemporizador() {
    this.detenerIntervalo();
    this.textoBoton = 'Iniciar Temporizador';
    this.segundos = this.minutosModo * 60;
  }

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      this.tareas.push({
        titulo: this.nuevaTarea.trim(),
        subtitulo: 'Nueva tarea',
        completada: false,
        prioridad: false
      });
      this.nuevaTarea = '';
    }
  }

  private detenerIntervalo() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }

  ngOnDestroy() {
    this.detenerIntervalo();
  }
}
