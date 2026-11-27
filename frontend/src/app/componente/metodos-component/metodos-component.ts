import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetodoService } from '../../core/services/metodo.service';
import { MetodoOut } from '../../core/models/metodo.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-metodos-component',
  styleUrl: './metodos-component.css',
  templateUrl: './metodos-component.html',
})
export class MetodosComponent implements OnInit {
  private metodoService = inject(MetodoService);

  metodos: MetodoOut[] = [];
  cargando = false;
  errorMensaje = '';

  ngOnInit(): void {
    this.cargando = true;
    this.metodoService.getMetodos().subscribe({
      next: (data) => {
        this.metodos = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'No se pudieron cargar los métodos de estudio.';
      }
    });
  }
}
