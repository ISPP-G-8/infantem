type IntakeSymptom = {
  id: number;
  description: string;
  date: [number, number, number, number, number]; 
}

type IdRef = { id: number };

export type Intake = {
  id?: number;
  date: string; 
  quantity: number;
  observations: string;
  intakeSymptom?: IntakeSymptom;
  baby?: IdRef;
  recipes?: IdRef[];
}
