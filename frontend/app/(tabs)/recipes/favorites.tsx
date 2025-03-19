import { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Recipe } from "../../../types/Recipe";
import { Link } from "expo-router";
import { getToken } from '../../../utils/jwtStorage';
import { jwtDecode } from "jwt-decode";

export default function FavouriteRecipes() {
  const gs = require("../../../static/styles/globalStyles");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await getToken();

      if (authToken) {
        setIsLoggedIn(true);
        try {
          const decodedToken: any = jwtDecode(authToken);
          console.log("Decoded token:", decodedToken);
          const userId = decodedToken.userId;
          setUserId(userId);
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsLoggedIn(false);
          setUserId(null);
        }
      } else {
        console.log("User is not logged in.");
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn && userId) {
      setLoading(true);
      fetch(`http://localhost:8081/api/v1/recipes/favorites/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Recipe[]) => {
          setRecipes(data);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn, userId]);

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <Text style={gs.headerText}>Tus recetas favoritas</Text>

        {!isLoggedIn ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={gs.bodyText}>Debes iniciar sesión para ver tus recetas favoritas.</Text>

            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={gs.mainButton}>Iniciar sesión</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : loading ? (

          <Text>Cargando recetas...</Text>
        ) : recipes.length === 0 ? (
          <Text>No se encontraron recetas favoritas.</Text>
        ) : (
          recipes.map((recipe, index) => (
            <Link key={index} href={`/recipes/recipeDetails?recipeTitle=${recipe.title}`}>
              <View style={gs.card}>
                <Text style={gs.cardTitle}>{recipe.title}</Text>
                <Text style={gs.cardContent}>{recipe.description}</Text>
              </View>
            </Link>
          ))
        )}
      </ScrollView>
    </View>
  );
}