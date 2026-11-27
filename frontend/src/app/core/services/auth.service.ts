import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Token, UsuarioOut } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'access_token';

  /**
   * Login usando OAuth2PasswordRequestForm (application/x-www-form-urlencoded).
   * El backend espera los campos `username` (correo) y `password`.
   */
  login(correo: string, password: string): Observable<Token> {
    const body = new HttpParams()
      .set('username', correo)
      .set('password', password);

    return this.http
      .post<Token>(`${environment.apiUrl}/api/auth/login`, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .pipe(tap(res => localStorage.setItem(this.TOKEN_KEY, res.access_token)));
  }

  /**
   * Registro de nuevo usuario.
   * Recibe nombres y apellidos por separado (UI) y los concatena en `nombre`.
   */
  register(nombres: string, apellidos: string, correo: string, contrasena: string): Observable<UsuarioOut> {
    const nombre = `${nombres.trim()} ${apellidos.trim()}`.trim();
    return this.http.post<UsuarioOut>(
      `${environment.apiUrl}/api/auth/register`,
      { nombre, correo, contrasena }
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
