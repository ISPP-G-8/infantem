import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, useWindowDimensions, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe } from "../../../types";

export default function RecipeDetails() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { recipeId } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [isOwned, setIsOwned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const gs = require('../../../static/styles/globalStyles');
  const { token, user } = useAuth();

  useEffect(() => {
    obtainRecipeAndUserRecipes();
  }, []);

  useEffect(() => {
    if (recipe && userRecipes.length > 0) {
      const owned = userRecipes.some((userRecipe) => Number(userRecipe.id) === Number(recipe.id));
      setIsOwned(owned);
    } else {
      setIsOwned(false);
    }
  }, [recipe, userRecipes]);

  const obtainRecipeAndUserRecipes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/${recipeId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const recipeData = await response.json();
        setRecipe(recipeData);
      }
    } catch (error) {
      console.error('Error fetching recipe: ', error);
      setRecipe(null);
    }
  };

  const handleEditRecipe = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!recipe || !token) return;

    fetch(`${apiUrl}/api/v1/recipes/${recipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(recipe)
    })
      .then(response => response.json())
      .then(data => {
        setIsEditing(false);
        setRecipe(data);
        Alert.alert("Receta actualizada", "Los cambios han sido guardados correctamente");
        router.push(`/recipes/detail?recipeId=${recipe.id}`);
      })
      .catch(error => Alert.alert("Error", "No se pudo guardar los cambios"));
  };

  const handleDeleteRecipe = () => {
    if (!recipe || !token) return;

    fetch(`${apiUrl}/api/v1/recipes/${recipe.id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(JSON.stringify(err));
          });
        }else{
          router.push("/recipes");
        }
        return response.json();
      })
      .catch(error => {
        Alert.alert("Error", `No se pudo eliminar la receta: ${error.message}`);
      });
  };



  if (!recipe) {
    return (
      <View style={gs.container}>
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ backgroundColor: "white", borderRadius: 16, padding: 20, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, flexDirection: isMobile ? "column" : "row", gap: 20, alignItems: isMobile ? "center" : "flex-start" }}>
          <Image source={require("frontend/assets/adaptive-icon.png")} style={{ width: 300, height: 300, borderRadius: 16 }} resizeMode="cover" />
          <View style={{ flex: 1 }}>
            {isEditing ? (
              <TextInput style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }} value={recipe.name} onChangeText={(text) => setRecipe({ ...recipe, name: text })} />
            ) : (
              <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>{recipe.name}</Text>
            )}
            {isEditing ? (
              <TextInput style={{ fontSize: 16, marginBottom: 20 }} value={recipe.description} onChangeText={(text) => setRecipe({ ...recipe, description: text })} />
            ) : (
              <Text style={{ fontSize: 16, marginBottom: 20 }}>{recipe.description}</Text>
            )}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Ingredientes:</Text>
            {isEditing ? (
              <TextInput style={{ fontSize: 16, marginBottom: 10 }} value={recipe.ingredients} onChangeText={(text) => setRecipe({ ...recipe, ingredients: text })} />
            ) : (
              recipe.ingredients.split(",").map((ingredient, index) => <Text key={index}>• {ingredient.trim()}</Text>)
            )}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 10 }}>Elaboración:</Text>
            {isEditing ? (
              <TextInput style={{ lineHeight: 22 }} value={recipe.elaboration} onChangeText={(text) => setRecipe({ ...recipe, elaboration: text })} />
            ) : (
              <Text style={{ lineHeight: 22 }}>{recipe.elaboration}</Text>
            )}

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Edad mínima recomendada:</Text>
            {isEditing ? (
              <TextInput
                style={{ fontSize: 16, marginBottom: 10 }}
                keyboardType="numeric"
                value={recipe.minRecommendedAge?.toString() || ''}
                onChangeText={(text) => setRecipe({ ...recipe, minRecommendedAge: parseInt(text) || 0 })}
              />
            ) : (
              <Text>{recipe.minRecommendedAge} meses</Text>
            )}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Edad máxima recomendada:</Text>
            {isEditing ? (
              <TextInput
                style={{ fontSize: 16, marginBottom: 10 }}
                keyboardType="numeric"
                value={recipe.maxRecommendedAge?.toString() || ''}
                onChangeText={(text) => setRecipe({ ...recipe, maxRecommendedAge: parseInt(text) || 0 })}
              />
            ) : (
              <Text>{recipe.maxRecommendedAge} meses</Text>
            )}
            {!isOwned && !isEditing && (
              <TouchableOpacity style={[gs.mainButton, { marginTop: 30 }]} onPress={handleEditRecipe}>
                <Text style={gs.mainButtonText}>Editar Receta</Text>
              </TouchableOpacity>
            )}
            {isEditing && (
              <TouchableOpacity style={[gs.mainButton, { marginTop: 30 }]} onPress={handleSaveChanges}>
                <Text style={gs.mainButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            )}
            {!isOwned && (
              <TouchableOpacity style={[gs.mainButton, { marginTop: 10, backgroundColor: "red" }]} onPress={handleDeleteRecipe}>
                <Text style={gs.mainButtonText}>Eliminar Receta</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}





