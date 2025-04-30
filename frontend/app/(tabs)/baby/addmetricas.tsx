import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { Picker } from "@react-native-picker/picker";
import { useSearchParams } from "expo-router/build/hooks";

export default function AddMetricas() {
  const gs = require("../../../static/styles/globalStyles");
  const router = useRouter();
  const limits = {
    weight: { min: 0, max: 30 },
    height: { min: 0, max: 130 },
    armCircumference: { min: 0, max: 23 },
    headCircumference: { min: 0, max: 60 },
  };
  
  const [errors, setErrors] = useState({
    armCircumference: "",
    headCircumference: "",
    height: "",
    weight: "",
  });
  
  const [armCircumference, setArmCircumference] = useState<string>("0.0");
  const [headCircumference, setHeadCircumference] = useState<string>("0.0");
  const [height, setHeight] = useState<string>("0.0");
  const [weight, setWeight] = useState<string>("0.0");
  
  const today = new Date();
  const [date, setDate] = useState<[number, number, number]>([
    today.getFullYear(),
    today.getMonth() + 1,
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

  const normalizeDecimalInput = (text: string): string => {
    // Elimina caracteres no numéricos excepto comas y puntos
    let cleanedText = text.replace(/[^0-9.,]/g, '');
    
    // Reemplaza comas por puntos
    cleanedText = cleanedText.replace(/,/g, '.');
    
    // Asegura que solo haya un punto decimal
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      // Si hay más de un punto, une las primeras partes y deja solo un punto
      cleanedText = parts[0] + '.' + parts.slice(1).join('');
    }
    
    return cleanedText;
  };

  const parseDecimalString = (value: string): number => {
    return parseFloat(normalizeDecimalInput(value)) || 0;
  };

  const validateField = (field: keyof typeof errors, value: string) => {
    const numericValue = parseDecimalString(value);
    const { min, max } = limits[field];
    
    if (numericValue < min || numericValue > max) {
      setErrors((prev) => ({
        ...prev,
        [field]: `Debe estar entre ${min} y ${max}`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const isValid = () => {
    let hasError = false;
    const fields = ["armCircumference", "headCircumference", "height", "weight"] as const;

    fields.forEach((field) => {
      const numericValue = parseDecimalString(eval(field));
      const { min, max } = limits[field];
      
      if (numericValue < min || numericValue > max) {
        setErrors((prev) => ({
          ...prev,
          [field]: `Debe estar entre ${min} y ${max}`,
        }));
        hasError = true;
      }
    });

    return !hasError;
  };

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
          setMetrics(data.at(-1));
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
    if (!isValid()) {
      Alert.alert("Error", "Revisa los campos con errores.");
      return;
    }
    
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
            weight: parseDecimalString(weight),
            height: parseDecimalString(height),
            headCircumference: parseDecimalString(headCircumference),
            armCircumference: parseDecimalString(armCircumference),
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
        }}>
          {date == metrics?.date ? (
            <Text style={[gs.headerText, { textAlign: "center", marginBottom: 24, color: "#1565C0" }]}>
              Añadir métricas actuales
            </Text>
          ) : (
            <Text style={[gs.headerText, { textAlign: "center", marginBottom: 24, color: "#1565C0" }]}>
              Actualizar métricas actuales
            </Text>
          )}

          <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
            Circunferencia del brazo (cm)
          </Text>
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.armCircumference ? "red" : "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Ej: 12,5 o 12.5"
            value={armCircumference}
            keyboardType="numeric"
            onChangeText={(text) => {
              const normalizedText = normalizeDecimalInput(text);
              setArmCircumference(normalizedText);
              validateField("armCircumference", normalizedText);
            }}
          />
          {errors.armCircumference !== "" && (
            <Text style={{ color: "red", fontSize: 12, alignSelf: "flex-start", marginLeft: 80 }}>
              {errors.armCircumference}
            </Text>
          )}

          <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
            Circunferencia de la cabeza (cm)
          </Text>
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.headCircumference ? "red" : "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Ej: 35,2 o 35.2"
            value={headCircumference}
            keyboardType="numeric"
            onChangeText={(text) => {
              const normalizedText = normalizeDecimalInput(text);
              setHeadCircumference(normalizedText);
              validateField("headCircumference", normalizedText);
            }}
          />
          {errors.headCircumference !== "" && (
            <Text style={{ color: "red", fontSize: 12, alignSelf: "flex-start", marginLeft: 80 }}>
              {errors.headCircumference}
            </Text>
          )}

          <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
            Altura (cm)
          </Text>
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.height ? "red" : "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Ej: 65,3 o 65.3"
            value={height}
            keyboardType="numeric"
            onChangeText={(text) => {
              const normalizedText = normalizeDecimalInput(text);
              setHeight(normalizedText);
              validateField("height", normalizedText);
            }}
          />
          {errors.height !== "" && (
            <Text style={{ color: "red", fontSize: 12, alignSelf: "flex-start", marginLeft: 80 }}>
              {errors.height}
            </Text>
          )}

          <Text style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 10, color: "#1565C0" }}>
            Peso (kg)
          </Text>
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.weight ? "red" : "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Ej: 5,8 o 5.8"
            value={weight}
            keyboardType="numeric"
            onChangeText={(text) => {
              const normalizedText = normalizeDecimalInput(text);
              setWeight(normalizedText);
              validateField("weight", normalizedText);
            }}
          />
          {errors.weight !== "" && (
            <Text style={{ color: "red", fontSize: 12, alignSelf: "flex-start", marginLeft: 80 }}>
              {errors.weight}
            </Text>
          )}

          <TouchableOpacity style={[gs.mainButton, { alignSelf: "center", marginTop: 10 }]} onPress={handleSave}>
            <Text style={[gs.mainButtonText, { paddingHorizontal: 24 }]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}