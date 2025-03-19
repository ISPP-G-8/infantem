import { Link } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { questions } from "../../../hardcoded_data/questionsData";

export default function Allergens() {
  
  const gs = require('../../../static/styles/globalStyles');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // I think using records is a better approach than using maps here.
  const [answers, setAnswers] = useState<Record<number, string>>({}); 

  // TODO: This must be retrieved from the back. The JSON is temporary
  //const [questions, setQuestions] = useState([]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <Text style={gs.headerText}>Alergenos</Text>

        { currentQuestion === questions.length - 1 ? (
          <View style={gs.card}>
            <Text style={gs.cardTitle}>¡Gracias por completar el cuestionario!</Text>
          </View>
        ) : (
          <View>
            <Text style={[gs.subheaderText, {paddingBottom:40}]}>
              Realizaremos una serie de preguntas para buscar a qué es alérgico su bebé.
            </Text>

            <View style={gs.card}>
              <Text style={gs.cardTitle}>{questions[currentQuestion].question}</Text>

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
    </View>
  );
}


