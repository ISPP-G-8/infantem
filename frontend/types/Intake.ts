type IntakeSymptom = {
  id: number;
  description: string;
  date: string;
}

type AuxType= { 
  id: number; 
  name?: string;
};

export type Intake = {
  id?: number;
  date: string; 
  quantity: number;
  observations: string;
  intakeSymptom?: IntakeSymptom;
  baby: AuxType | null;
  recipes: AuxType[];
}