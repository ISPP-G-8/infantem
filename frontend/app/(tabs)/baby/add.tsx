import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { Picker } from "@react-native-picker/picker";

export default function AddBaby() {
  const gs = require("../../../static/styles/globalStyles");
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [genre, setGenre] = useState<string>("MALE");
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [cephalicPerimeter, setCephalicPerimeter] = useState<number | null>(null);
  const [foodPreference, setFoodPreference] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [jwt, setJwt] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>(""); // Para mostrar errores

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Obtener token al montar
  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      setJwt(token);
      setLoading(false);
    };
    getUserToken();
  }, []);

  // Función para traducir errores del backend
  const parseErrorMessage = (errorMessage: string) => {
    try {
      const errorObj = JSON.parse(errorMessage);
      if (errorObj.message && errorObj.message.includes("java.time.LocalDate")) {
        return "La fecha ingresada no es válida. Usa el formato YYYY-MM-DD.";
      }
      return "Error al guardar los datos. Revisa la información ingresada.";
    } catch (e) {
      return "Error inesperado al procesar la respuesta del servidor.";
    }
  };

  // Guardar bebé
  const handleSave = async () => {
    setErrorMessage(""); // Limpiar errores previos
    if (jwt) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/baby`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            name,
            birthDate,
            genre,
            weight,
            height,
            cephalicPerimeter,
            foodPreference,
          }),
        });

        if (response.ok) {
          router.push("/baby"); // Redirigir al listado
        } else {
          const errorText = await response.text();
          console.error("Error creating baby:", errorText);
          const friendlyMessage = parseErrorMessage(errorText);
          setErrorMessage(friendlyMessage); // Mostrar error amigable
        }
      } catch (error) {
        console.error("Error creating baby:", error);
        setErrorMessage("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
      }
    } else {
      setErrorMessage("Error de autenticación. Por favor, inicia sesión nuevamente.");
    }
  };

  if (loading) {
    return (
      <View style={[gs.container, { paddingTop: 100 }]}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
      <Text style={gs.headerText}>Add a baby</Text>

      <TextInput
        style={gs.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={gs.input}
        placeholder="YYYY-MM-DD"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <Picker
        selectedValue={genre}
        style={[gs.input, { height: 50 }]}
        onValueChange={(itemValue) => setGenre(itemValue)}
      >
        <Picker.Item label="Male" value="MALE" />
        <Picker.Item label="Female" value="FEMALE" />
        <Picker.Item label="Other" value="OTHER" />
      </Picker>
      <TextInput
        style={gs.input}
        placeholder="Weight (kg)"
        value={weight?.toString() || ""}
        keyboardType="numeric"
        onChangeText={(text) => setWeight(text ? parseFloat(text) : null)}
      />
      <TextInput
        style={gs.input}
        placeholder="Height (cm)"
        value={height?.toString() || ""}
        keyboardType="numeric"
        onChangeText={(text) => setHeight(text ? parseInt(text) : null)}
      />
      <TextInput
        style={gs.input}
        placeholder="Cephalic Perimeter (cm)"
        value={cephalicPerimeter?.toString() || ""}
        keyboardType="numeric"
        onChangeText={(text) => setCephalicPerimeter(text ? parseInt(text) : null)}
      />
      <TextInput
        style={gs.input}
        placeholder="Food Preference"
        value={foodPreference}
        onChangeText={setFoodPreference}
      />

      {/* Mostrar error si existe */}
      {errorMessage !== "" && (
        <View style={{ backgroundColor: "#ffdddd", padding: 10, borderRadius: 8, marginTop: 15 }}>
          <Text style={{ color: "#cc0000", textAlign: "center" }}>{errorMessage}</Text>
        </View>
      )}

      <TouchableOpacity style={gs.mainButton} onPress={handleSave}>
        <Text style={gs.mainButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
