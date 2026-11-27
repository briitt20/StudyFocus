import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CornellService } from '../../core/services/cornell.service';
import { CornellOut, CornellCreate } from '../../core/models/cornell.model';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-cornell-component',
  styleUrl: './cornell-component.css',
  templateUrl: './cornell-component.html',
})
export class CornellComponent implements OnInit {
  private cornellService = inject(CornellService);

  notas: CornellOut[] = [];
  notaActiva: CornellOut | null = null;
  apunteGuardado = false;
  cargando = false;
  errorMensaje = '';

  // Formulario de nueva nota — campos alineados al backend
  apunte: CornellCreate = {
    tema: '',
    clave: '',
    apunte: '',
    resumen: ''
  };

  ngOnInit(): void {
    this.cargarNotas();
  }

  cargarNotas(): void {
    this.cargando = true;
    this.cornellService.getNotas().subscribe({
      next: (data) => {
        this.notas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'No se pudieron cargar las notas.';
      }
    });
  }

  seleccionarNota(nota: CornellOut): void {
    this.notaActiva = nota;
    this.apunte = {
      tema: nota.tema,
      clave: nota.clave ?? '',
      apunte: nota.apunte ?? '',
      resumen: nota.resumen ?? ''
    };
    this.apunteGuardado = false;
  }

  nuevaNota(): void {
    this.notaActiva = null;
    this.apunte = { tema: '', clave: '', apunte: '', resumen: '' };
    this.apunteGuardado = false;
    this.errorMensaje = '';
  }

  guardarApunte(): void {
    if (!this.apunte.tema || !this.apunte.apunte || !this.apunte.resumen) return;
    this.errorMensaje = '';

    if (this.notaActiva) {
      // Actualizar nota existente
      this.cornellService.updateNota(this.notaActiva.id_nota, this.apunte).subscribe({
        next: (updated) => {
          const idx = this.notas.findIndex(n => n.id_nota === updated.id_nota);
          if (idx !== -1) this.notas[idx] = updated;
          this.notaActiva = updated;
          this.apunteGuardado = true;
        },
        error: () => { this.errorMensaje = 'Error al actualizar la nota.'; }
      });
    } else {
      // Crear nueva nota
      this.cornellService.createNota(this.apunte).subscribe({
        next: (nueva) => {
          this.notas.push(nueva);
          this.notaActiva = nueva;
          this.apunteGuardado = true;
        },
        error: () => { this.errorMensaje = 'Error al guardar la nota.'; }
      });
    }
  }

  eliminarNota(id: number, event: Event): void {
    event.stopPropagation();
    this.cornellService.deleteNota(id).subscribe({
      next: () => {
        this.notas = this.notas.filter(n => n.id_nota !== id);
        if (this.notaActiva?.id_nota === id) this.nuevaNota();
      },
      error: () => { this.errorMensaje = 'Error al eliminar la nota.'; }
    });
  }
}
