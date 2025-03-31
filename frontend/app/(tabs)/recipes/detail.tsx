import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert, ScrollView,Image,useWindowDimensions , TextInput } from "react-native";
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

  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Puedes ajustar este umbral según tu diseño



  const gs = require('../../../static/styles/globalStyles');

  const { token, user } = useAuth();

  useEffect(() => {
    obtainRecipeAndUserRecipes();
  }, []);

  useEffect(() => {
    handleOwnership();
  }, [isLoading]);

  const obtainRecipeAndUserRecipes = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/${recipeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const recipeData = await response.json();
        setRecipe({
          id: recipeData.id,
          name: recipeData.name,
          description: recipeData.description,
          minRecommendedAge: recipeData.minRecommendedAge,
          maxRecommendedAge: recipeData.maxRecommendedAge,
          ingredients: recipeData.ingredients,
          elaboration: recipeData.elaboration
        });
      }
    } catch (error) {
      console.error('Error fetching recipe: ', error);
      setRecipe(null);
    }
    try {
      let responseReceived = false;
      if (token && user) {
        const response = await fetch(`${apiUrl}/api/v1/recipes/user/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const recipesData = await response.json();
          setUserRecipes(recipesData);
          setIsLoading(false);
          responseReceived = true;
        }
      }
      return responseReceived ? true : false;
    } catch (error) {
      console.error('Error fetching user recipes: ', error);
      setUserRecipes([]);
      return false;
    }

  };

  const handleOwnership = async () => {
    console.log(recipe, userRecipes)
    if (recipe && userRecipes && userRecipes.length > 0) {
      const owned = userRecipes.some((userRecipe: Recipe) => userRecipe.id === recipe.id);
      setIsOwned(owned);
      console.log(owned);
    } else {
      setIsOwned(false);
    }
  };


  const handleEditRecipe = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!recipe || !token) return;

    const recipeData = {
      name: recipe.name,
      description: recipe.description,
      minRecommendedAge: recipe.minRecommendedAge,
      maxRecommendedAge: recipe.maxRecommendedAge,
      ingredients: recipe.ingredients,
      elaboration: recipe.elaboration
    };

    fetch(`${apiUrl}/api/v1/recipes/${recipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(recipeData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
      })
      .then(data => {
        setIsEditing(false);
        setRecipe(data);
        Alert.alert("Receta actualizada", "Los cambios han sido guardados correctamente");
        router.push(`/recipes/detail?recipeId=${recipe.id}`);
      })
      .catch(error => {
        Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
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
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12,color: "#1565C0" }}>
              {recipe.name}
            </Text>
  
            {/* Descripción */}
            <Text style={{ fontSize: 16, marginBottom: 20,color: "#1565C0" }}>
              {recipe.description}
            </Text>
  
            {/* Ingredientes */}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10,color: "#1565C0" }}>
              Ingredientes:
            </Text>
            {recipe.ingredients.split(",").map((ingredient, index) => (
              <Text key={index} style={{ marginBottom: 4,color: "#1565C0" }}>
                • {ingredient.trim()}
              </Text>
            ))}
  
            {/* Elaboración */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 10
                ,color: "#1565C0"
              }}
            >
              Elaboración:
            </Text>
            <Text style={{ lineHeight: 22,color: "#1565C0" }}>{recipe.elaboration}</Text>
  
            {/* Edad recomendada */}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20,color: "#1565C0" }}>
              Edad recomendada:
            </Text>
            <Text style={{ color: "#1565C0" }}>
              De {recipe.minRecommendedAge} meses
              {recipe.maxRecommendedAge
                ? ` a ${recipe.maxRecommendedAge} meses`
                : ""}
            </Text>
  
            {/* Botones de acción */}
            {isOwned && !isEditing && (
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


