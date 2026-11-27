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
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: PortadaComponent },
  { path: 'portada', component: PortadaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio',         component: InicioComponent,         canActivate: [authGuard] },
  { path: 'calendario',     component: CalendarioComponent,     canActivate: [authGuard] },
  { path: 'concentracion',  component: ConcentracionComponent,  canActivate: [authGuard] },
  { path: 'cornell',        component: CornellComponent,        canActivate: [authGuard] },
  { path: 'metodos',        component: MetodosComponent,        canActivate: [authGuard] },
  { path: 'perfil',         component: PerfilComponent,         canActivate: [authGuard] },
  { path: 'pomodoro',       component: PomodoroComponent,       canActivate: [authGuard] },
  { path: 'sesion',         component: SesionComponent,         canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
