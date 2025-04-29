type AuxType= { 
    id: number; 
    name?: string;
  };
  
export type Disease = {
    id: number;
    date: string; // Fecha de la enfermedad
    name: string; // Descripción de la enfermedad
    baby: AuxType | null; // Relación con el bebé
};