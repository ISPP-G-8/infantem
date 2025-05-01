type AuxType = { 
  id: number; 
  name?: string;
};

export type Vaccine = {
  id?: number;
  vaccinationDate: string; // Fecha de vacunación
  type: string; // Tipo de vacuna
  baby: AuxType | null; // Relación con el bebé
};