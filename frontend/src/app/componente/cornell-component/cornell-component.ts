import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-cornell-component',
  styleUrl: './cornell-component.css',
  templateUrl: './cornell-component.html',
})
export class CornellComponent {
  apunteGuardado = false;

  apunte = {
    titulo: 'Regulación de la Presión Arterial y Sistema RAA',
    preguntasClave: '',
    notas: `1. Cascada Enzimática y Disparadores Renales:
Las células yuxtaglomerulares (YXG) de la arteriola aferente sensan baja presión de perfusión renal (vía barorreceptores locales) o hiponatremia detectada por la mácula densa.

2. Conversión Periférica en Cascada:
Angiotensinógeno de origen hepático se fragmenta en Angiotensina I por acción de la renina. La ECA pulmonar cataliza su paso a Angiotensina II.

3. Efectos Sistémicos:
- Vasoconstricción arteriolar directa (incremento de RVP).
- Estimulación de síntesis de Aldosterona en corteza suprarrenal.
- Activación de sed y secreción de ADH en hipotálamo.`,
    resumen: 'El sistema Renina-Angiotensina-Aldosterona regula la presión arterial a mediano y largo plazo incrementando la resistencia vascular periférica y la retención renal de sodio y agua.'
  };

  guardarApunte() {
    if (this.apunte.titulo && this.apunte.notas && this.apunte.resumen) {
      this.apunteGuardado = true;
    }
  }
}
