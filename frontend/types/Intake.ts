import { Baby } from "./Baby";

type IntakeSymptom = {
  id: number;
  description: string;
  date: [number, number, number, number, number]; 
}

export type Intake = {
  id: number;
  date: [number, number, number, number, number];
  quantity: number;
  observations: string;
  intakeSymptom?: IntakeSymptom;
  baby?: Baby;
}
