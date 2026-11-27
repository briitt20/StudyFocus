import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SesionCreate, SesionOut } from '../models/sesion.model';

@Injectable({ providedIn: 'root' })
export class SesionService {
  private http = inject(HttpClient);

  getSesiones(): Observable<SesionOut[]> {
    return this.http.get<SesionOut[]>(`${environment.apiUrl}/api/sesiones`);
  }

  createSesion(data: SesionCreate): Observable<SesionOut> {
    return this.http.post<SesionOut>(`${environment.apiUrl}/api/sesiones`, data);
  }

  deleteSesion(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/sesiones/${id}`);
  }
}
