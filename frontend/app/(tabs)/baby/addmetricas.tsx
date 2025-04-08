import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity,ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { Picker } from "@react-native-picker/picker";
import { useSearchParams } from "expo-router/build/hooks";

export default function AddMetricas() {
  const gs = require("../../../static/styles/globalStyles");
  const router = useRouter();
  const [armCircumference, setArmCircumference] = useState<number>(0.0);
  const [headCircumference, setHeadCircumference] = useState<number>(0.0);
  const [height, setHeight] = useState<number>(0.0);
  const [weight, setWeight] = useState<number>(0.0);
  const today = new Date();
  const [date, setDate] = useState<[number, number, number]>([
    today.getFullYear(),
    today.getMonth() + 1, // Los meses son 0-indexados
    today.getDate()
  ]);
  const [token, setToken] = useState<string | null>(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const babyId = searchParams.get("babyId");
  interface Metrics {
    armCircumference: number;
    headCircumference: number;
    height: number;
    weight: number;
    date: [number, number, number];
  }
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
          if (!token) return;
          
          const fetchMetrics = async () => {
              try {
                  const endpoint = `${apiUrl}/api/v1/metrics/baby/${babyId}`;
                  const response = await fetch(endpoint, {
                      method: "GET",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                      }
                  });
      
                  if (response.ok) {
                      const data = await response.json();
                      console.log(data);
                      setMetrics(data.at(-1)); // Guarda solo el último elemento
                  } else {
                      console.error("Error en la suscripción:", response.statusText);
                  }
              } catch (error) {
                  console.error("Error en la suscripción:", error);
              }
          };
      
          fetchMetrics();
      }, [token, babyId]);

  useEffect(() => {
          const fetchToken = async () => {
              try {
                  const storedToken = await getToken();
                      if (!storedToken) {
                          Alert.alert("Error", "No se encontró el token de autenticación.");
                          return;
                      }
                  setToken(storedToken);
              } catch (error) {
                  console.error("Error obteniendo el token:", error);
                  Alert.alert("Error", "No se pudo obtener el token.");
              }
          };
          fetchToken();
      }, []);

      const handleSave = async () => {
        if (token && babyId) {
          try {
            const formattedDate = `${date[0]}-${date[1].toString().padStart(2, '0')}-${date[2].toString().padStart(2, '0')}`;
      
            const response = await fetch(`${apiUrl}/api/v1/metrics?babyId=${babyId}`, {
              method: date == metrics?.date ? "PUT" : "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
              },
              body: JSON.stringify({
                weight: weight,
                height: height,
                headCircumference: headCircumference,
                armCircumference: armCircumference,
                date: formattedDate
              }),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              Alert.alert("Error", errorData.message || "Error al guardar");
              return;
            }
      
            router.push("/baby/metricas?babyId=" + babyId);
          } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "No se pudo guardar");
          }
        } else {
          Alert.alert("Error", "Falta información del bebé");
        }
      };

  return (
  <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 30, paddingBottom: 30 }}>
        <View style={{
          backgroundColor: "rgba(255, 255, 255, 0.79)",
          borderRadius: 16,
          padding: 24,
          marginHorizontal: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {date == metrics?.date ? (
          <Text style={[gs.headerText, { textAlign: "center", marginBottom: 24,color: "#1565C0" }]}>
            Añadir métricas actuales
          </Text>
        ) : (
          <Text style={[gs.headerText, { textAlign: "center", marginBottom: 24,color: "#1565C0" }]}>
            Actualizar métricas actuales
          </Text>
        )}
  
        <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
          Circunferencia del brazo (cm)
        </Text>
        <TextInput
          style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
          placeholder="Circunferencia del brazo"
          value={armCircumference.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const newValue = parseFloat(text) || 0;
            setArmCircumference(newValue);
          }}
        />

        <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
          Circunferencia de la cabeza (cm)
        </Text>
        <TextInput
          style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
          placeholder="Circunferencia de la cabeza"
          value={headCircumference.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const newValue = parseFloat(text) || 0;
            setHeadCircumference(newValue);
          }}
        />

        <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
          Altura (cm)
        </Text>
        <TextInput
          style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
          placeholder="Altura"
          value={height.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const newValue = parseFloat(text) || 0;
            setHeight(newValue);
          }}
        />

        <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
          Peso (kg)
        </Text>
        <TextInput
          style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
          placeholder="Peso"
          value={weight.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const newValue = parseFloat(text) || 0;
            setWeight(newValue);
          }}
        />

        <TouchableOpacity style={[gs.mainButton, { alignSelf: "center", marginTop: 10 }]} onPress={handleSave}>
          <Text style={[gs.mainButtonText, { paddingHorizontal: 24 }]}>Guardar</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
  </View>
  );
  
}


