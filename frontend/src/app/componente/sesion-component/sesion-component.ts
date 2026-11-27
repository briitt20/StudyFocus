import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SesionService } from '../../core/services/sesion.service';
import { MetodoService } from '../../core/services/metodo.service';
import { SesionOut, SesionCreate } from '../../core/models/sesion.model';
import { MetodoOut } from '../../core/models/metodo.model';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  selector: 'app-sesion-component',
  styleUrl: './sesion-component.css',
  templateUrl: './sesion-component.html',
})
export class SesionComponent implements OnInit {
  private sesionService = inject(SesionService);
  private metodoService = inject(MetodoService);

  sesiones: SesionOut[] = [];
  metodos: MetodoOut[] = [];
  cargando = false;
  sesionRegistrada = false;
  errorMensaje = '';

  nuevaSesion: SesionCreate = {
    id_metodo: 0,
    fecha: new Date().toISOString().split('T')[0],
    concentracion: undefined
  };

  ngOnInit(): void {
    this.cargando = true;
    // Cargar sesiones y métodos en paralelo
    this.sesionService.getSesiones().subscribe({
      next: (data) => { this.sesiones = data; },
      error: () => { this.errorMensaje = 'No se pudieron cargar las sesiones.'; }
    });
    this.metodoService.getMetodos().subscribe({
      next: (data) => {
        this.metodos = data;
        if (data.length > 0) this.nuevaSesion.id_metodo = data[0].id_metodo;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'No se pudieron cargar los métodos.';
      }
    });
  }

  registrarSesion(): void {
    if (!this.nuevaSesion.id_metodo || !this.nuevaSesion.fecha) return;
    this.errorMensaje = '';

    this.sesionService.createSesion(this.nuevaSesion).subscribe({
      next: (sesion) => {
        // Intentar enriquecer con el nombre del método para mostrar en la lista
        const metodo = this.metodos.find(m => m.id_metodo === sesion.id_metodo);
        sesion.nombre_metodo = metodo?.nombre ?? sesion.nombre_metodo;
        this.sesiones.unshift(sesion);
        this.sesionRegistrada = true;
        this.nuevaSesion = {
          id_metodo: this.metodos[0]?.id_metodo ?? 0,
          fecha: new Date().toISOString().split('T')[0],
          concentracion: undefined
        };
      },
      error: () => { this.errorMensaje = 'Error al registrar la sesión.'; }
    });
  }

  eliminarSesion(id: number): void {
    this.sesionService.deleteSesion(id).subscribe({
      next: () => {
        this.sesiones = this.sesiones.filter(s => s.id_sesion !== id);
      },
      error: () => { this.errorMensaje = 'Error al eliminar la sesión.'; }
    });
  }
}
