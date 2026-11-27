export interface CalendarioCreate {
  titulo: string;
  fecha: string; // ISO date YYYY-MM-DD
  tipo?: string;
}

export interface CalendarioUpdate {
  titulo?: string;
  fecha?: string;
  tipo?: string;
}

export interface CalendarioOut {
  id_evento: number;
  id_usuario: number;
  titulo: string;
  fecha: string;
  tipo?: string;
}
