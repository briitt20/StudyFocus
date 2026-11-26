import { Routes } from '@angular/router';
import { LoginComponent } from './componente/login-component/login-component';
import { InicioComponent } from './componente/inicio-component/inicio-component';
import { CalendarioComponent } from './componente/calendario-component/calendario-component';
import { ConcentracionComponent } from './componente/concentracion-component/concentracion-component';
import { CornellComponent } from './componente/cornell-component/cornell-component';
import { MetodosComponent } from './componente/metodos-component/metodos-component';
import { PerfilComponent } from './componente/perfil-component/perfil-component';
import { PomodoroComponent } from './componente/pomodoro-component/pomodoro-component';
import { PortadaComponent } from './componente/portada-component/portada-component';
import { SesionComponent } from './componente/sesion-component/sesion-component';

export const routes: Routes = [
    { path: '', component: PortadaComponent }, // <-- Cambiado a PortadaComponent
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'concentracion', component: ConcentracionComponent },
  { path: 'cornell', component: CornellComponent },
  { path: 'metodos', component: MetodosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'pomodoro', component: PomodoroComponent },
  { path: 'portada', component: PortadaComponent },
  { path: 'sesion', component: SesionComponent },
  { path: '**', redirectTo: '' }
];
