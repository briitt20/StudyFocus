import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CornellCreate, CornellUpdate, CornellOut } from '../models/cornell.model';

@Injectable({ providedIn: 'root' })
export class CornellService {
  private http = inject(HttpClient);

  getNotas(): Observable<CornellOut[]> {
    return this.http.get<CornellOut[]>(`${environment.apiUrl}/api/cornell`);
  }

  createNota(data: CornellCreate): Observable<CornellOut> {
    return this.http.post<CornellOut>(`${environment.apiUrl}/api/cornell`, data);
  }

  updateNota(id: number, data: CornellUpdate): Observable<CornellOut> {
    return this.http.put<CornellOut>(`${environment.apiUrl}/api/cornell/${id}`, data);
  }

  deleteNota(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/cornell/${id}`);
  }
}
