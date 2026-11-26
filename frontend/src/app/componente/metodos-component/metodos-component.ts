import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-metodos-component',
  styleUrl: './metodos-component.css',
  templateUrl: './metodos-component.html',
})
export class MetodosComponent {
  vistaActiva: 'catalogo' | 'recuperacion' | 'espaciado' = 'catalogo';

  respuestaUsuario = '';
  mostrarSolucion = false;
  dominadas = 8;
  dudosas = 3;
  repasar = 1;
  nuevaTarjeta = { pregunta: '', respuesta: '' };
  tarjetaGuardada = false;

  mostrarFormRepaso = false;
  nuevoRepaso = { curso: 'FARMACOLOGÍA', tema: '' };
  temasRepaso = [
    { curso: 'FARMACOLOGÍA', tema: 'Betalactámicos y Cefalosporinas', detalle: 'Repaso 1 (Día 1) · Hoy, 24 Nov', repasado: false },
    { curso: 'FISIOLOGÍA', tema: 'Potencial de acción neuronal y transmisión sináptica', detalle: 'Repaso 2 (Día 3) · Hoy, 24 Nov', repasado: false },
    { curso: 'CÁLCULO III', tema: 'Integrales triples y coordenadas esféricas', detalle: 'Repaso 1 (Día 1) · Hoy, 24 Nov', repasado: false }
  ];

  seleccionarVista(vista: 'catalogo' | 'recuperacion' | 'espaciado') {
    this.vistaActiva = vista;
  }

  guardarTarjeta() {
    if (this.nuevaTarjeta.pregunta && this.nuevaTarjeta.respuesta) {
      this.tarjetaGuardada = true;
      this.nuevaTarjeta = { pregunta: '', respuesta: '' };
    }
  }

  agregarTemaRepaso() {
    if (this.nuevoRepaso.tema.trim()) {
      this.temasRepaso.unshift({
        curso: this.nuevoRepaso.curso,
        tema: this.nuevoRepaso.tema.trim(),
        detalle: 'Sesión 0 (Hoy) · Próximo repaso +24h',
        repasado: false
      });
      this.nuevoRepaso.tema = '';
      this.mostrarFormRepaso = false;
    }
  }
}
