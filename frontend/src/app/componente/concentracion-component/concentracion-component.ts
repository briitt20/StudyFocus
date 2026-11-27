import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SesionService } from '../../core/services/sesion.service';
import { MetodoService } from '../../core/services/metodo.service';
import { SesionCreate, SesionOut } from '../../core/models/sesion.model';
import { MetodoOut } from '../../core/models/metodo.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-concentracion-component',
  styleUrl: './concentracion-component.css',
  templateUrl: './concentracion-component.html',
})
export class ConcentracionComponent implements OnInit {
  private sesionService = inject(SesionService);
  private metodoService = inject(MetodoService);

  nivelSeleccionado = 4;
  sesionGuardada = false;
  errorMensaje = '';
  metodos: MetodoOut[] = [];
  historial: SesionOut[] = [];
  idMetodoActivo = 0;

  niveles = [
    { valor: 1, titulo: 'Bajo',      colorClase: 'text-danger',  descripcion: 'Con distracciones frecuentes' },
    { valor: 2, titulo: 'Medio',     colorClase: 'text-warning', descripcion: 'Enfoque parcial intermitente' },
    { valor: 3, titulo: 'Alto',      colorClase: 'text-primary', descripcion: 'Ritmo sólido y continuado' },
    { valor: 4, titulo: 'Excelente', colorClase: 'text-success', descripcion: 'Flujo ininterrumpido pleno' }
  ];

  ngOnInit(): void {
    this.metodoService.getMetodos().subscribe({
      next: (data) => {
        this.metodos = data;
        this.idMetodoActivo = data[0]?.id_metodo ?? 0;
      }
    });

    this.sesionService.getSesiones().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: () => {
        this.errorMensaje = 'No se pudo cargar el historial de sesiones.';
      }
    });
  }

  seleccionarNivel(valor: number) {
    this.nivelSeleccionado = valor;
    this.sesionGuardada = false;
    this.errorMensaje = '';
  }

  /**
   * Guarda la sesión con el nivel de concentración seleccionado.
   * Usa el primer método disponible si no se especificó otro.
   */
  guardarSesion(): void {
    if (!this.idMetodoActivo) {
      this.errorMensaje = 'No hay métodos disponibles.';
      return;
    }
    const payload: SesionCreate = {
      id_metodo: this.idMetodoActivo,
      fecha: new Date().toISOString().split('T')[0],
      concentracion: this.nivelSeleccionado
    };
    this.sesionService.createSesion(payload).subscribe({
      next: (sesion) => {
        const metodo = this.metodos.find(m => m.id_metodo === sesion.id_metodo);
        sesion.nombre_metodo = metodo?.nombre ?? sesion.nombre_metodo;
        this.historial.unshift(sesion);
        this.sesionGuardada = true;
      },
      error: () => { this.errorMensaje = 'Error al guardar la sesión.'; }
    });
  }

  obtenerNivelTexto(nivel?: number): string {
    const encontrado = this.niveles.find(n => n.valor === nivel);
    return encontrado ? encontrado.titulo : 'Sin registro';
  }

  obtenerBadgeClase(nivel?: number): string {
    switch (nivel) {
      case 1: return 'bg-danger-subtle text-danger';
      case 2: return 'bg-warning-subtle text-warning';
      case 3: return 'bg-primary-subtle text-primary';
      case 4: return 'bg-success-subtle text-success';
      default: return 'bg-light text-muted';
    }
  }
}
