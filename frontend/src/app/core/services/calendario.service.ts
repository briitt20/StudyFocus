import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CalendarioCreate, CalendarioUpdate, CalendarioOut } from '../models/calendario.model';

@Injectable({ providedIn: 'root' })
export class CalendarioService {
  private http = inject(HttpClient);

  getEventos(): Observable<CalendarioOut[]> {
    return this.http.get<CalendarioOut[]>(`${environment.apiUrl}/api/calendario`);
  }

  createEvento(data: CalendarioCreate): Observable<CalendarioOut> {
    return this.http.post<CalendarioOut>(`${environment.apiUrl}/api/calendario`, data);
  }

  updateEvento(id: number, data: CalendarioUpdate): Observable<CalendarioOut> {
    return this.http.put<CalendarioOut>(`${environment.apiUrl}/api/calendario/${id}`, data);
  }

  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/calendario/${id}`);
  }
}
