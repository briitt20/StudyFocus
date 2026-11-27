export interface UsuarioOut {
  id_usuario: number;
  nombre: string;
  correo: string;
  carrera?: string;
  ciclo?: number;
}

export interface UsuarioUpdate {
  nombre?: string;
  carrera?: string;
  ciclo?: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}
