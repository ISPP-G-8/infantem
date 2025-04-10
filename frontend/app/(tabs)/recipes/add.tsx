import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity,ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { Picker } from "@react-native-picker/picker";

export default function AddBaby() {
  const gs = require("../../../static/styles/globalStyles");
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // The photo state is commented because I have no time to learn how to implment
  // this on react native. This must be done in S2
  // TODO: Let the user add a photo from files
  //const [photoRoute, setPhotoRoute] = useState<string>("male");
  const [ingredients, setIngredients] = useState<string>("");
  const [minRecommendedAge, setMinRecommendedAge] = useState<number | null>(null);  
  const [maxRecommendedAge, setMaxRecommendedAge] = useState<number | null>(null);  
  const [elaboration, setElaboration] = useState<string>("");
  // As this is an array of Intakes this couldn't be implemented this fast 
  // and I can not let the user to specify the intakes without a type validation.
  // Same for allergens and alimentoNutriente
  // TODO: Implement this
  //const [intakes, setIntakes] = useState<Intake[]>(null);
  //const [allergens, setAllergens] = useState<Allergen[]>(null);
  //Idk why this is in spanish
  //const [alimentoNutriente, setAlimentoNutriente] = useState<AlimentoNutriente[]>(null);

  const [jwt, setJwt] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const [minAgeError, setMinAgeError] = useState<string | null>(null);
  const [maxAgeError, setMaxAgeError] = useState<string | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      setJwt(token);
    };
    getUserToken();
  },[]);

  const validateForm = () => {
    let isValid = true;

    setNameError(null);
    setIngredientsError(null);
    setMinAgeError(null);
    setMaxAgeError(null);

    if (!name.trim()) {
      setNameError("El nombre es obligatorio.");
      isValid = false;
    }

    if (!ingredients.trim()) {
      setIngredientsError("Los ingredientes son obligatorios.");
      isValid = false;
    }

    if (minRecommendedAge !== null && isNaN(minRecommendedAge)) {
      setMinAgeError("La edad mínima recomendada debe ser un número válido.");
      isValid = false;
    }

    if (maxRecommendedAge !== null && isNaN(maxRecommendedAge)) {
      setMaxAgeError("La edad máxima recomendada debe ser un número válido.");
      isValid = false;
    }

    if (minRecommendedAge !== null && maxRecommendedAge !== null && minRecommendedAge > maxRecommendedAge) {
      setMinAgeError("La edad mínima no puede ser mayor que la edad máxima.");
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    if (jwt) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/recipes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`, 
          },
          body: JSON.stringify({
            name: name,
            description: description,
            photo_route: "", //TODO: Change this
            ingredients: ingredients,
            minRecommendedAge: minRecommendedAge,
            maxRecommendedAge: maxRecommendedAge,
            elaboration: elaboration,
            //TODO: Change this
            intakes: [],
            allergens: [],
            alimentoNutriente: [],
          }),
        });
    
        if (response.ok) {
          router.push("/recipes"); 
        } else {
          console.error("Error creating recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 30, paddingBottom: 30 }}>
        <View
          style={{
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
          <Text style={[gs.headerText, { textAlign: "center", marginBottom: 24, color: "#1565C0" }]}>
            Añadir una receta
          </Text>

          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          {nameError && <Text style={{ color: "red", marginBottom: 5 }}>{nameError}</Text>}

          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
            placeholder="Ingredientes"
            value={ingredients}
            onChangeText={setIngredients}
          />
          {ingredientsError && <Text style={{ color: "red", marginBottom: 5 }}>{ingredientsError}</Text>}

          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
            placeholder="Edad mínima recomendada"
            value={minRecommendedAge?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0;
              setMinRecommendedAge(newValue);
            }}
          />
          {minAgeError && <Text style={{ color: "red", marginBottom: 5 }}>{minAgeError}</Text>}

          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
            placeholder="Edad máxima recomendada"
            value={maxRecommendedAge?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0;
              setMaxRecommendedAge(newValue);
            }}
          />
          {maxAgeError && <Text style={{ color: "red", marginBottom: 5 }}>{maxAgeError}</Text>}

          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "90%" }]}
            placeholder="Elaboración"
            value={elaboration}
            onChangeText={setElaboration}
            multiline
          />

          <TouchableOpacity style={[gs.mainButton, { alignSelf: "center", marginTop: 10 }]} onPress={handleSave}>
            <Text style={[gs.mainButtonText, { paddingHorizontal: 24 }]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}