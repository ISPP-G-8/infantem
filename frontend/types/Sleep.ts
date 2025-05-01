type AuxType = { 
  id: number; 
  name?: string;
};

export type Sleep = {
  id?: number;
  dateStart: string;
  dateEnd: string;
  numWakeups: number;
  dreamType: string;
  baby: AuxType | null; // Relación con el bebé
};