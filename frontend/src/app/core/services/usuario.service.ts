import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioOut, UsuarioUpdate } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);

  getMe(): Observable<UsuarioOut> {
    return this.http.get<UsuarioOut>(`${environment.apiUrl}/api/usuarios/me`);
  }

  updateMe(data: UsuarioUpdate): Observable<UsuarioOut> {
    return this.http.put<UsuarioOut>(`${environment.apiUrl}/api/usuarios/me`, data);
  }
}
