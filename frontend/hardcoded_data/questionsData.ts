import { Question } from '../types/Question';

export const questions: Question[] = [
    {
      "id": 1,
      "question": "¿Ha consumido su hijo/a este alimento por primera vez?",
      "type": "boolean"
    },
    {
      "id": 2,
      "question": "¿Cuánto tiempo ha pasado desde que consumió el alimento?",
      "type": "options",
      "options": [
        "Menos de 1 hora",
        "Entre 1 y 3 horas",
        "Entre 3 y 6 horas",
        "Más de 6 horas"
      ]
    },
    {
      "id": 3,
      "question": "¿Ha presentado alguno de estos síntomas después de consumirlo?",
      "type": "options",
      "options": [
        "Erupción cutánea",
        "Hinchazón en labios o cara",
        "Dificultad para respirar",
        "Vómitos",
        "Diarrea",
        "Dolor abdominal",
        "Otros"
      ]
    },
    {
      "id": 4,
      "question": "Si seleccionó 'Otros', describa los síntomas:",
      "type": "text",
    },
    {
      "id": 5,
      "question": "¿Ha consumido este alimento antes sin presentar síntomas?",
      "type": "boolean"
    },
    {
      "id": 6,
      "question": "¿Tiene algún antecedente familiar de alergias alimentarias?",
      "type": "boolean"
    },
    {
      "id": 7,
      "question": "¿Ha sido diagnosticado previamente con alguna alergia alimentaria?",
      "type": "options",
      "options": [
        "Sí, por un médico",
        "No",
        "No estoy seguro/a"
      ]
    }
  ];
