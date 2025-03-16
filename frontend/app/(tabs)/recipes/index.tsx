import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { Recipe } from "../../../types/Recipe";
import { getToken } from "../../../utils/jwtStorage"
import { jwtDecode } from "jwt-decode";

// const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTc0MTkwODQxNSwiaWF0IjoxNzQxODIyMDE1LCJhdXRob3JpdGllcyI6WyJ1c2VyIl19.bf4c5fTej1qEcu03Bt8lTbPIYjw9aVIySOqbtjRNalTZmeUP4Li1-OjFNOAcwfNExThBPyppJxnkhiTS38aUuA'
// console.log(jwt)

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Page() {
  const gs = require("../../../static/styles/globalStyles");
  const [searchQuery, setSearchQuery] = useState("");
  // const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>(recipes);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  // const [filteredSuggestedRecipes, setFilteredSuggestedRecipes] = useState<Recipe[]>(recipes);
  const [filteredRecommendedRecipes, setFilteredRecommendedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [babyId, setBabyId] = useState<number>(1);
  const [allRecipes, setAllRecipes] = useState([]);
  const [age, setAge] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      console.log(`Token obtenido: ${token}`)
      setJwt(token);
    };
  
    getUserToken();
  }, []);

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
    if (jwt) {
      fetch(`${apiUrl}/api/v1/recipes/recommended?age=${age}`, {
        headers: {
          "Authorization": "Bearer " + jwt
        }
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(`Error: ${response.status} - ${text}`);
            });
          }
          return response.json();
        })
        .then((data: Recipe[]) => {
          setRecommendedRecipes(data);
          // setFilteredRecommendedRecipes(data);
        })
        .catch((error) => {
          console.error("Error fetching recommended recipes:", error);
        })
        .finally(() => setLoading(false));
    } else {
      console.log("No jwt token")
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt) {
      fetch(`${apiUrl}/api/v1/recipes/user/${userId}`, {
        headers: {
          "Authorization": "Bearer " + jwt
        }
      })
        .then((response) => {
          console.log("Response received:", response);

          return response.text().then((text) => {
            console.log("Response body:", text);

            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${text}`);
            }

            try {
              return JSON.parse(text);
            } catch (error) {
              throw new Error(`Invalid JSON: ${text}`);
            }
          });
        })
        .then((data) => {
          console.log("Parsed JSON:", data);
          setAllRecipes(data);
        })
        .catch((error) => {
          console.error("Error fetching all recipes:", error);
        });
    } else {
      console.log("No jwt token")
    }
  }, [jwt]);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/recipes/recommendations/${babyId}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error: ${response.status} - ${text}`);
          });
        }
        return response.json();
      })
      .then((data: Recipe[]) => {
        setRecommendedRecipes(data);
        setFilteredRecommendedRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recommended recipes:", error);
      })
      .finally(() => setLoading(false));
  }, [babyId]);



  useEffect(() => {
    console.log("Updated allRecipes:", allRecipes);
  }, [allRecipes]);

  useEffect(() => {
    console.log("AAAAAAAAAAA")
    console.log("Updated recommendedRecipes:", recommendedRecipes);
  }, [recommendedRecipes]);

  const fetchRecommendedRecipes = async () => {
    if (age === null) return;

    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/recommended?age=${age}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });      
      if (!response.ok) {
        throw new Error("Error al obtener recetas recomendadas");
      }
      const data = await response.json();
      setRecommendedRecipes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filteredSuggested = allRecipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    // setFilteredSuggestedRecipes(filteredSuggested);

    const filteredRecommended = recommendedRecipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecommendedRecipes(filteredRecommended);
  };

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100, flexGrow: 1 }]}>
        <Text style={gs.headerText}>Recetas Recomendadas</Text>
        <Text style={gs.bodyText}>
          Encuentre recetas adecuadas en función de la edad y las preferencias de su bebé
        </Text>

        <View style={{ width: "90%" }}>
          <TextInput
            style={gs.input}
            placeholder="Busca recetas..."
            value={searchQuery}
            onChangeText={handleSearch}
          />

          <View style={{ flexDirection: "row", gap: 10, marginVertical: 10, alignSelf: "flex-start" }}>

            <Link href="/recipes/favorites" style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Recetas favoritas</Text>
            </Link>
            <Link style={gs.mainButton} href={"/recipes/add"}>
              <Text style={gs.mainButtonText}>Añade una receta</Text>
            </Link>

          </View>
        </View>

        {/* <Text style={[gs.subHeaderText, { marginTop: 30 }]}>Suggested recipes</Text>

        {loading ? (
          <Text>Loading recipes...</Text>
        ) : filteredSuggestedRecipes.length === 0 ? (
          <Text>No suggested recipes found.</Text>
        ) : (
          filteredSuggestedRecipes.map((recipe, index) => (
            <Link key={index} href={`/recipes/recipeDetails?recipeTitle=${recipe.name}`}>
              <View style={[gs.card, { marginBottom: 10 }]}>
                <Text style={gs.cardTitle}>{recipe.name}</Text>
                <Text style={gs.cardContent}>{recipe.description}</Text>
              </View>
            </Link>
          ))
        )} */}

        <Text style={[gs.subHeaderText, { marginTop: 50 }]}>Recetas recomendadas</Text>

        <TextInput
          style={[gs.input, { width: "25%", marginHorizontal: "auto" }]}
          placeholder="Introduce la edad"
          keyboardType="numeric"
          value={age !== null ? age.toString() : ""}
          onChangeText={(text) => {
            // Convierte el texto en número entero y lo guarda en el estado
            const numericValue = parseInt(text.replace(/[^0-9]/g, ""), 10);
            setAge(isNaN(numericValue) ? null : numericValue);
          }}
          onSubmitEditing={fetchRecommendedRecipes}
          returnKeyType="done"
        />

        {loading ? (
          <Text>Cargando recetas recomendadas...</Text>
        ) : recommendedRecipes.length === 0 ? (
          <Text>No se encontraron recetas.</Text>
        ) : (
          recommendedRecipes.map((recipe: Recipe) => (

            <View style={[gs.card, { display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }]}>
              <View>
                <Image
                  source={require('frontend/assets/adaptive-icon.png')}
                  style={{width: 50, height: 50}}
                />
              </View>
              <View>
                <Text style={gs.cardTitle}>{recipe.name}</Text>
                <Text style={gs.cardContent}>{recipe.description}</Text>
              </View>
            </View>
            
          ))
        )}

        <Text style={[gs.subHeaderText, { marginTop: 50 }]}>Todas tus recetas</Text>

        {loading ? (
          <Text>Cargando recetas recomendadas...</Text>
        ) : allRecipes.length === 0 ? (
          <Text>No se encontraron recetas.</Text>
        ) : (
          allRecipes.map((recipe: Recipe) => (

            <View style={[gs.card, { display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }]}>
              <View>
                <Image
                  source={require('frontend/assets/adaptive-icon.png')}
                  style={{width: 50, height: 50}}
                />
              </View>
              <View>
                <Text style={gs.cardTitle}>{recipe.name}</Text>
                <Text style={gs.cardContent}>{recipe.description}</Text>
              </View>
            </View>
            
          ))
        )}
      </ScrollView>
    </View>
  );
}
