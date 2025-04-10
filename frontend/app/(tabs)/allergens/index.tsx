import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { questions } from "../../../hardcoded_data/questionsData";
import AdvertisementFetcher from "../../../components/AdvertisementFetcher";
import { useAuth } from "../../../context/AuthContext";

export default function Allergens() {
  const gs = require("../../../static/styles/globalStyles");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<number>>([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { user, token } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState({});
  const [allergensResult, setAllergenResult] = useState({});

  useEffect(() => {
    const fetchBabies = async () => {
      const response = await fetch(`${apiUrl}/api/v1/baby`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setBabies(data);
        })
        .catch((error) => {
          console.error("Error fetching baby data:", error);
        });
    };
    fetchBabies();
  }, []);

  const handleAnswer = (number: number) => {
    const array = [...answers, number];
    setAnswers(array);

    setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion === questions.length - 1) {
      handleSubmit(array);
    }
  };

  const handleSubmit = async (array) => {
    if (token) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/allergens/answers`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: array,
            babyId: selectedBaby.id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setAllergenResult(data);
        }
      } catch (error) {
        console.error("Error while sending data:", error);
      }
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%" }}
        imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[gs.headerText, { color: "#1565C0", fontSize: 38 }]}>
            Alérgenos
          </Text>

          {currentStep === 0 && (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={[
                  gs.subheaderText,
                  { paddingBottom: 40, color: "#1565C0" },
                ]}
              >
                Seleccione a qué bebé desea detectar alérgenos.
              </Text>

              {babies.map((baby) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBaby(baby);
                      setCurrentStep(1);
                    }}
                    style={[gs.secondaryButton, { margin: 10 }]}
                  >
                    <Text style={gs.secondaryButtonText}>{baby.name}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {currentStep === 1 && (
            <>
              {currentQuestion === questions.length ? (
                <>
                  <View style={gs.card}>
                    <Text style={[gs.cardTitle, { color: "#1565C0" }]}>
                      Estos son los resultados de la evaluación de alérgenos
                      para {selectedBaby.name}:{"\n"}
                    </Text>
                    {allergensResult.allergy ? (
                      <View>
                        <Text style={gs.cardContent}>
                          Es bastante posible que tu bebé {selectedBaby.name}{" "}
                          sea alérgico a:
                        </Text>
                        {allergensResult.detectedAllergies.map(
                          (allergen, index) => (
                            <>
                              <Text key={index} style={gs.cardContent}>
                                &nbsp;&nbsp;&nbsp;-&nbsp;
                                <Text
                                  style={{ textDecorationLine: "underline" }}
                                >
                                  {allergen.name}
                                </Text>
                                :&nbsp;
                                <Text
                                  key={index}
                                  style={[
                                    gs.cardContent,
                                    { textDecorationLine: "none" },
                                  ]}
                                >
                                  {allergen.description}
                                </Text>
                              </Text>
                            </>
                          )
                        )}
                        <Text style={[gs.cardContent, { marginTop: 10 }]}>
                          {allergensResult.message}
                        </Text>
                      </View>
                    ) : (
                      <Text style={gs.cardContent}>
                        {allergensResult.message}
                      </Text>
                    )}
                  </View>
                </>
              ) : (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={[
                      gs.subheaderText,
                      { paddingBottom: 40, color: "#1565C0" },
                    ]}
                  >
                    Realizaremos una serie de preguntas para buscar a qué es
                    alérgico su bebé.
                  </Text>

                  <View style={[gs.card, { padding: 20 }]}>
                    <Text style={gs.cardTitle}>
                      {questions[currentQuestion].question}
                    </Text>

                    {questions[currentQuestion].options && (
                      <View>
                        {questions[currentQuestion].options!.map(
                          (option, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleAnswer(index)}
                              style={[gs.secondaryButton, { margin: 10 }]}
                            >
                              <Text style={gs.secondaryButtonText}>
                                {option}
                              </Text>
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
        <AdvertisementFetcher />
      </ImageBackground>
    </View>
  );
}
