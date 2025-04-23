import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { Recipe } from "../../../types";

export default function AddBaby() {
  const gs = require("../../../static/styles/globalStyles");
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: "",
    ingredients: "",
    minRecommendedAge: 1,
    maxRecommendedAge: null,
    elaboration: "",
  });

  const { token } = useAuth();

  const [nameError, setNameError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const [minAgeError, setMinAgeError] = useState<string | null>(null);
  const [maxAgeError, setMaxAgeError] = useState<string | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const validateForm = () => {
    let isValid = true;

    setNameError(null);
    setIngredientsError(null);
    setMinAgeError(null);
    setMaxAgeError(null);

    if (recipe && !recipe.name.trim()) {
      setNameError("El nombre es obligatorio.");
      isValid = false;
    }

    if (recipe && !recipe.ingredients.trim()) {
      setIngredientsError("Los ingredientes son obligatorios.");
      isValid = false;
    }

    if (
      recipe &&
      recipe.maxRecommendedAge !== null &&
      recipe.maxRecommendedAge <= 1
    ) {
      setMaxAgeError("La edad máxima recomendada debe ser un número válido.");
      isValid = false;
    }

    if (
      recipe &&
      recipe.minRecommendedAge &&
      recipe.maxRecommendedAge &&
      recipe.minRecommendedAge > recipe.maxRecommendedAge
    ) {
      setMinAgeError("La edad mínima no puede ser mayor que la edad máxima.");
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    if (token) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/admin/recipes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: recipe.name,
            description: recipe.description,
            photo_route: "", //TODO: Change this
            ingredients: recipe.ingredients,
            minRecommendedAge: recipe.minRecommendedAge,
            maxRecommendedAge: recipe.maxRecommendedAge,
            elaboration: recipe.elaboration,
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
          <Text
            style={[
              gs.headerText,
              { textAlign: "center", marginBottom: 24, color: "#1565C0" },
            ]}
          >
            Añadir una receta
          </Text>

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Nombre"
            value={recipe.name}
            onChangeText={(text) => setRecipe({ ...recipe, name: text })}
          />
          {nameError && (
            <Text style={{ color: "red", marginBottom: 5 }}>{nameError}</Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Descripción"
            value={recipe.description}
            onChangeText={(text) => setRecipe({ ...recipe, description: text })}
          />

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Ingredientes"
            value={recipe.ingredients}
            onChangeText={(text) => setRecipe({ ...recipe, ingredients: text })}
          />
          {ingredientsError && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {ingredientsError}
            </Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Edad mínima recomendada"
            value={recipe.minRecommendedAge.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0;
              setRecipe({ ...recipe, minRecommendedAge: newValue });
            }}
          />
          {minAgeError && (
            <Text style={{ color: "red", marginBottom: 5 }}>{minAgeError}</Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Edad máxima recomendada"
            value={recipe.maxRecommendedAge?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0;
              setRecipe({ ...recipe, maxRecommendedAge: newValue });
            }}
          />
          {maxAgeError && (
            <Text style={{ color: "red", marginBottom: 5 }}>{maxAgeError}</Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Elaboración"
            value={recipe.elaboration}
            onChangeText={(text) => setRecipe({ ...recipe, elaboration: text })}
            multiline
          />

          <TouchableOpacity
            style={[gs.mainButton, { alignSelf: "center", marginTop: 10 }]}
            onPress={handleSave}
          >
            <Text style={[gs.mainButtonText, { paddingHorizontal: 24 }]}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
