import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe } from "../../../types";
import { useAdmin } from "../../../context/AdminContext";

export default function RecipeDetails() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const gs = require("../../../static/styles/globalStyles");

  const { token, recipeToModify, setRecipeToModify } = useAuth();

  useEffect(() => {
    console.log("recipeToModify", recipeToModify);
  }, []);

  const handleEditRecipe = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!recipeToModify || !token) return;

    const recipeData = {
      name: recipeToModify.name,
      description: recipeToModify.description,
      minRecommendedAge: recipeToModify.minRecommendedAge,
      maxRecommendedAge: recipeToModify.maxRecommendedAge,
      ingredients: recipeToModify.ingredients,
      elaboration: recipeToModify.elaboration,
    };

    fetch(`${apiUrl}/api/v1/admin/recipes/${recipeToModify.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(JSON.stringify(err));
          });
        }
        return response.json();
      })
      .then((data) => {
        setIsEditing(false);
        setRecipeToModify(data);
        Alert.alert(
          "Receta actualizada",
          "Los cambios han sido guardados correctamente"
        );
        router.push(`/admin`);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          `No se pudo guardar los cambios: ${error.message}`
        );
      });
  };

  if (!recipeToModify) {
    return (
      <View style={gs.container}>
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            flexDirection: isMobile ? "column" : "row",
            gap: 20,
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {/* COLUMNA IZQUIERDA - Imagen */}
          <Image
            source={require("frontend/assets/adaptive-icon.png")}
            style={{
              width: 300,
              height: 300,
              borderRadius: 16,
            }}
            resizeMode="cover"
          />

          {/* COLUMNA DERECHA - Detalles */}
          <View style={{ flex: 1 }}>
            {/* Nombre */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 12,
                color: "#1565C0",
              }}
            >
              {recipeToModify.name}
            </Text>

            {/* Descripción */}
            <Text style={{ fontSize: 16, marginBottom: 20, color: "#1565C0" }}>
              {recipeToModify.description}
            </Text>

            {/* Ingredientes */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
                color: "#1565C0",
              }}
            >
              Ingredientes:
            </Text>
            {recipeToModify.ingredients.split(",").map((ingredient, index) => (
              <Text key={index} style={{ marginBottom: 4, color: "#1565C0" }}>
                • {ingredient.trim()}
              </Text>
            ))}

            {/* Elaboración */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 10,
                color: "#1565C0",
              }}
            >
              Elaboración:
            </Text>
            <Text style={{ lineHeight: 22, color: "#1565C0" }}>
              {recipeToModify.elaboration}
            </Text>

            {/* Edad recomendada */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 20,
                color: "#1565C0",
              }}
            >
              Edad recomendada:
            </Text>
            <Text style={{ color: "#1565C0" }}>
              De {recipeToModify.minRecommendedAge} meses
              {recipeToModify.maxRecommendedAge
                ? ` a ${recipeToModify.maxRecommendedAge} meses`
                : ""}
            </Text>

            {/* Botones de acción */}
            {!isEditing && (
              <TouchableOpacity
                style={[gs.mainButton, { marginTop: 30 }]}
                onPress={handleEditRecipe}
              >
                <Text style={gs.mainButtonText}>Editar Receta</Text>
              </TouchableOpacity>
            )}
            {isEditing && (
              <TouchableOpacity
                style={[gs.mainButton, { marginTop: 30 }]}
                onPress={handleSaveChanges}
              >
                <Text style={gs.mainButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
