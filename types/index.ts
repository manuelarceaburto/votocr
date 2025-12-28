export interface Candidato {
  id: string;
  slug: string;
  nombre: string;
  partido: string;
  partidoAbreviatura: string;
  colorPartido: string;
  foto: string;
  biografia: string;
  propuestas: string[];
}

export interface Voto {
  id: string;
  emailHash: string;
  candidatoId: string;
  provincia: string;
  timestamp: Date;
}

export interface Verificacion {
  email: string;
  code: string;
  timestamp: Date;
  verified: boolean;
  token?: string;
}

export interface Resultados {
  totalVotos: number;
  porProvincia: {
    [provincia: string]: {
      total: number;
      porCandidato: {
        [candidatoId: string]: number;
      };
    };
  };
  porCandidato: {
    [candidatoId: string]: {
      total: number;
      porcentaje: number;
    };
  };
}

export type Provincia = 
  | 'San José'
  | 'Alajuela'
  | 'Cartago'
  | 'Heredia'
  | 'Guanacaste'
  | 'Puntarenas'
  | 'Limón';

export const PROVINCIAS: Provincia[] = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];
