import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from "react-native";
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
    <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100, backgroundColor: "transparent" }]}>
      <View style={[gs.container, { paddingTop: 0, marginTop: 0 }]}>
        <View style={[gs.content, { marginTop: 0 }]}>
          <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Nombre de la receta:</Text>
          <TextInput
            style={gs.card}
            value={recipe.name}
            editable={isEditing}
            onChangeText={(text) => setRecipe({ ...recipe, name: text })}
          />
          <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Descripción:</Text>
          <TextInput
            style={gs.card}
            value={recipe.description}
            editable={isEditing}
            onChangeText={(text) => setRecipe({ ...recipe, description: text })}
          />
          <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Edad mínima recomendada:</Text>
          <TextInput
            style={gs.card}
            value={recipe.minRecommendedAge.toString()}
            editable={isEditing}
            onChangeText={(text) => {
              const parsedValue = parseInt(text);
              setRecipe({ ...recipe, minRecommendedAge: isNaN(parsedValue) ? 0 : parsedValue });
            }}
          />
          {recipe.maxRecommendedAge && (
            <>
              <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Edad máxima recomendada:</Text>
              <TextInput
                style={gs.card}
                value={recipe.maxRecommendedAge.toString()}
                editable={isEditing}
                onChangeText={(text) => {
                  const parsedValue = parseInt(text);
                  setRecipe({ ...recipe, maxRecommendedAge: isNaN(parsedValue) ? 0 : parsedValue });
                }}
              />
            </>
          )}
          <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Ingredientes:</Text>
          {isEditing && (
            <TextInput
              style={gs.card}
              value={recipe.ingredients}
              editable={isEditing}
              onChangeText={(text) => setRecipe({ ...recipe, ingredients: text })}
            />
          )}
          {!isEditing && (
            <>
              {recipe.ingredients.split(",").map((ingredient, index) => (
                <Text key={index} style={gs.card}>{ingredient}</Text>
              ))}
            </>
          )}
          <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Elaboración:</Text>
          <TextInput
            style={gs.card}
            value={recipe.elaboration}
            editable={isEditing}
            onChangeText={(text) => setRecipe({ ...recipe, elaboration: text })}
          />
          {isEditing && (
            <TouchableOpacity style={[gs.mainButton, { marginBottom: 20 }]} onPress={handleSaveChanges}>
              <Text style={gs.mainButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          )}
          {isOwned && !isEditing && (
            <TouchableOpacity style={[gs.mainButton, { marginBottom: 20 }]} onPress={handleEditRecipe}>
              <Text style={gs.mainButtonText}>Editar Receta</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}


