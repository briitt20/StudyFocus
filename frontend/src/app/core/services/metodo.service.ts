import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MetodoOut } from '../models/metodo.model';

@Injectable({ providedIn: 'root' })
export class MetodoService {
  private http = inject(HttpClient);

  getMetodos(): Observable<MetodoOut[]> {
    return this.http.get<MetodoOut[]>(`${environment.apiUrl}/api/metodos`);
  }
}
