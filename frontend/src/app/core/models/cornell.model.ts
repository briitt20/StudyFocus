export interface CornellCreate {
  tema: string;
  clave?: string;
  apunte?: string;
  resumen?: string;
}

export interface CornellUpdate {
  tema?: string;
  clave?: string;
  apunte?: string;
  resumen?: string;
}

export interface CornellOut {
  id_nota: number;
  id_usuario: number;
  tema: string;
  clave?: string;
  apunte?: string;
  resumen?: string;
}
