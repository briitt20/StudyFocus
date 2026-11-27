export interface SesionCreate {
  id_metodo: number;
  fecha: string; // ISO date YYYY-MM-DD
  concentracion?: number;
}

export interface SesionOut {
  id_sesion: number;
  id_usuario: number;
  id_metodo: number;
  nombre_metodo?: string;
  fecha: string;
  concentracion?: number;
}
