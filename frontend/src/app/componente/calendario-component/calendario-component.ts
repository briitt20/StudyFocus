import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarioService } from '../../core/services/calendario.service';
import { CalendarioOut, CalendarioCreate } from '../../core/models/calendario.model';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-calendario-component',
  styleUrl: './calendario-component.css',
  templateUrl: './calendario-component.html',
})
export class CalendarioComponent implements OnInit {
  private calendarioService = inject(CalendarioService);

  eventos: CalendarioOut[] = [];
  actividadGuardada = false;
  cargando = false;
  errorMensaje = '';

  // Formulario alineado al backend: titulo, fecha, tipo
  nuevaActividad: CalendarioCreate = {
    titulo: '',
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'tarea'
  };

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.cargando = true;
    this.calendarioService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'No se pudieron cargar los eventos.';
      }
    });
  }

  guardarActividad(): void {
    if (!this.nuevaActividad.titulo.trim() || !this.nuevaActividad.fecha) return;
    this.errorMensaje = '';

    this.calendarioService.createEvento(this.nuevaActividad).subscribe({
      next: (creado) => {
        this.eventos.push(creado);
        this.actividadGuardada = true;
        this.nuevaActividad = {
          titulo: '',
          fecha: new Date().toISOString().split('T')[0],
          tipo: 'tarea'
        };
      },
      error: () => { this.errorMensaje = 'Error al guardar el evento.'; }
    });
  }

  eliminarEvento(id: number): void {
    this.calendarioService.deleteEvento(id).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.id_evento !== id);
      },
      error: () => { this.errorMensaje = 'Error al eliminar el evento.'; }
    });
  }
}
