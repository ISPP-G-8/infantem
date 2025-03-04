import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, TextInput, Pressable } from "react-native";

type QuestionType = "boolean" | "options" | "text";

type Question = {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
};

export default function Page() {
  
  const gs = require('../static/styles/globalStyles');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // I think using records is a better approach than using maps here.
  const [answers, setAnswers] = useState<Record<number, string>>({}); 

  // TODO: This must be retrieved from the back. The JSON is temporary
  //const [questions, setQuestions] = useState([]);
  const questions: Question[] = [
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

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <ScrollView contentContainerStyle={gs.container}>
      <Text style={gs.headerText}>Alergenos</Text>

      { currentQuestion === questions.length - 1 ? (
        <View style={{ marginTop: 80, padding: 20, borderRadius: 25, borderWidth: 2, borderColor: "#007AFF" }}>
          <Text style={gs.subHeaderText}>¡Gracias por completar el cuestionario!</Text>
          <Link href="/" asChild>
            <TouchableOpacity style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <View>
          <Text style={gs.bodyText}>
            Realizaremos una serie de preguntas para buscar a qué es alérgico su bebé.
          </Text>

          <View style={{ marginTop: 80, padding: 20, borderRadius: 25, borderWidth: 2, borderColor: "#007AFF" }}>
            <Text style={gs.subHeaderText}>{questions[currentQuestion].question}</Text>

            {questions[currentQuestion].type === "boolean" && (
              <View>
                <TouchableOpacity onPress={() => handleAnswer("Sí")} style={[gs.mainButton, { margin: 10 }]}>
                  <Text style={gs.mainButtonText}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAnswer("No")} style={[gs.secondaryButton, { margin: 10 }]}>
                  <Text style={gs.secondaryButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            )}

            {questions[currentQuestion].type === "options" && questions[currentQuestion].options && (
              <View>
                {questions[currentQuestion].options!.map((option, index) => (
                  <TouchableOpacity key={index} onPress={() => handleAnswer(option)} style={[gs.secondaryButton, { margin: 10 }]}>
                    <Text style={gs.secondaryButtonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {questions[currentQuestion].type === "text" && (
              <TextInput
                style={gs.input}
                placeholder="Escribe tu respuesta..."
                onSubmitEditing={(event) => handleAnswer(event.nativeEvent.text)}
              />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}


