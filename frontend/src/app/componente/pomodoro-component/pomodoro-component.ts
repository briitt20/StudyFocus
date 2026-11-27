import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SesionService } from '../../core/services/sesion.service';
import { MetodoService } from '../../core/services/metodo.service';
import { SesionOut, SesionCreate } from '../../core/models/sesion.model';
import { MetodoOut } from '../../core/models/metodo.model';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-pomodoro-component',
  styleUrl: './pomodoro-component.css',
  templateUrl: './pomodoro-component.html',
})
export class PomodoroComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private sesionService = inject(SesionService);
  private metodoService = inject(MetodoService);

  // --- Temporizador ---
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

  // --- Sesión ---
  metodos: MetodoOut[] = [];
  idMetodoSeleccionado = 0;
  sesionGuardada = false;
  errorSesion = '';

  get tareasCompletadas(): number {
    return this.tareas.filter(t => t.completada).length;
  }

  get tiempoFormateado(): string {
    const m = String(Math.floor(this.segundos / 60)).padStart(2, '0');
    const s = String(this.segundos % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  ngOnInit(): void {
    this.metodoService.getMetodos().subscribe({
      next: (data) => {
        this.metodos = data;
        // Pre-seleccionar Pomodoro si existe
        const pomodoro = data.find(m => m.nombre.toLowerCase().includes('pomodoro'));
        this.idMetodoSeleccionado = pomodoro?.id_metodo ?? data[0]?.id_metodo ?? 0;
      }
    });
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

  /**
   * Registra una sesión de estudio usando el método Pomodoro y el nivel de concentración
   * determinado por las tareas completadas (escala 1-4).
   */
  guardarSesion(): void {
    if (!this.idMetodoSeleccionado) return;
    this.errorSesion = '';

    const concentracion = Math.min(4, Math.max(1, this.tareasCompletadas || 1));
    const payload: SesionCreate = {
      id_metodo: this.idMetodoSeleccionado,
      fecha: new Date().toISOString().split('T')[0],
      concentracion
    };
    this.sesionService.createSesion(payload).subscribe({
      next: () => { this.sesionGuardada = true; },
      error: () => { this.errorSesion = 'Error al registrar la sesión.'; }
    });
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
