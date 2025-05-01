type AuxType = { 
  id: number; 
  name?: string;
};

export type Disease = {
  id: number;
  name: string; // Nombre de la enfermedad
  startDate: string; // Fecha de inicio de la enfermedad
  endDate: string; // Fecha de fin de la enfermedad
  symptoms: string; // Síntomas de la enfermedad
  extraObservations: string; // Observaciones adicionales
  baby: AuxType | null; // Relación con el bebé
};