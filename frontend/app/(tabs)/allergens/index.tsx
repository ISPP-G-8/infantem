import { Link } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, TextInput,ImageBackground } from "react-native";
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
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20,width: "100%", height: "100%",alignItems: "center", justifyContent: "center" }}>
        <Text  style={[gs.headerText, { color: "#1565C0",fontSize:38 }]}>Alérgenos</Text>

        { currentQuestion === questions.length - 1 ? (
          <View style={gs.card}>
            <Text style={[gs.cardTitle,{color:"#1565C0"}]}>¡Gracias por completar el cuestionario!</Text>
          </View>
        ) : (
          <View style={{ width: "100%",alignItems: "center", justifyContent: "center" }}>
            <Text style={[gs.subheaderText, {paddingBottom:40, color: "#1565C0"}]}>
              Realizaremos una serie de preguntas para buscar a qué es alérgico su bebé.
            </Text>

            <View style={[gs.card, { padding: 20 }]}>
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
      </ImageBackground>
    </View>
  );
}


