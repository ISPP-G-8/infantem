import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { questions } from "../../hardcoded_data/questionsData";

export default function Page() {
  
  const gs = require('../../static/styles/globalStyles');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // I think using records is a better approach than using maps here.
  const [answers, setAnswers] = useState<Record<number, string>>({}); 

  // TODO: This must be retrieved from the back. The JSON is temporary
  //const [questions, setQuestions] = useState([]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
    setCurrentQuestion((prev) => prev + 1);
  };
  console.log(questions);

  return (
    <ScrollView contentContainerStyle={gs.container}>
      <Text style={gs.headerText}>Alergenos</Text>

      { currentQuestion === questions.length - 1 ? (
        <View style={gs.card}>
          <Text style={[gs.cardTitle, {paddingBottom:20}]}>¡Gracias por completar el cuestionario!</Text>
          <Link href="/" asChild>
            <TouchableOpacity style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
          </Link>
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
  );
}


