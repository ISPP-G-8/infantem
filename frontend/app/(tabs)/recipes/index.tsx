import { useState, useEffect, useRef } from "react";
import { Text, View, TextInput, ScrollView, Image, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { Recipe } from "../../../types/Recipe";
import { useAuth } from "../../../context/AuthContext";


const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Page() {
  const [allRecommendedRecipes, setAllRecommendedRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [allFilteredRecipes, setAllFilteredRecipes] = useState([]);
  const [userFilteredRecipes, setUserFilteredRecipes] = useState([]);
  const [recommendedFilteredRecipes, setRecommendedFilteredRecipes] = useState<Recipe[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [age, setAge] = useState<number | null>(null);

  const gs = require("../../../static/styles/globalStyles");

  const { user, token } = useAuth();

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const scrollRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    obtainAllRecommendedRecipes();
    obtainUserRecipes();
  }, []);

  const obtainAllRecommendedRecipes = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/recommended`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const recipesData = await response.json();
        setAllRecommendedRecipes(recipesData);
        // TODO: This must be changed. The pagination must be managed. This is a hot fix needed to have the application working.
        // FIX THIS.
        setAllFilteredRecipes(recipesData.content); 
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching recipes: ', error);
      setAllRecommendedRecipes([]);
      setAllFilteredRecipes([]);
      return false;
    }
  };

  const obtainUserRecipes = async (): Promise<boolean> => {
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
          setUserFilteredRecipes(recipesData);
          responseReceived = true;
        }
      }
      return responseReceived ? true : false;
    } catch (error) {
      console.error('Error fetching user recipes: ', error);
      setUserRecipes([]);
      setUserFilteredRecipes([]);
      return false;
    }
  };

  const fetchRecommendedRecipes = async () => {
    if (age === null) return;
    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/recommended/${age}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener recetas recomendadas");
      }
      const data = await response.json();
      setRecommendedRecipes(data);
      setRecommendedFilteredRecipes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (query: string) => {

    setSearchQuery(query);

    const filteredAll = allRecommendedRecipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredUser = userRecipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredRecommended = recommendedRecipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    setAllFilteredRecipes(filteredAll);
    setUserFilteredRecipes(filteredUser);
    setRecommendedFilteredRecipes(filteredRecommended);

  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(slideIndex);
  };

  const goToSlide = (index) => {
    scrollRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    setActiveIndex(index);
  };

  return (

    <ImageBackground
      source={require("../../../static/images/Background.png")}
      style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{ backgroundColor: "transparent" }}>
        <Image source={require("../../../static/images/Bottle.png")} style={{ position: 'absolute', top: "0%", right: "65%", width: 150, height: 150, transform: [{ rotate: '15deg' }] }} />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 50,
          }}>
          <Text style={{ color: "#1565C0", fontSize: 36, width: "90%", fontWeight: "bold", textAlign: "center", marginTop: 70 }}>
            Recetas Recomendadas
          </Text>
          <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginTop: -5 }}>
            Por Nuestros Expertos
          </Text>


          <Text style={[gs.bodyText, { color: "#1565C0" }]}>
            ¡Encuentre recetas perfectas para su bebé!
          </Text>
          <Text style={[gs.bodyText, { color: "#1565C0" }]}>
            Adecuadas en función de su edad y preferencias
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
          <View style={{ flexDirection: "row", width: "90%", backgroundColor: "white", alignItems: "center", borderWidth: 1, borderColor: "#1565C0", borderRadius: 8, opacity: 0.8, paddingHorizontal: 10 }}>
            <TextInput
              style={{ flex: 1, padding: 12 }}
              placeholder="Busca recetas..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Image source={require("../../../static/images/MagnifyingGlass.png")} style={{ width: 40, height: 40, opacity: searchQuery.trim() === "" ? 1 : 1 }} />
          </View>
        </View>


        {allFilteredRecipes.length === 0 ? (
          <Text>No se encontraron recetas.</Text>
        ) : (
          <View
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
          >
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={{ paddingVertical: 50, marginLeft: 0, marginTop: 0 }}
            >
              {allFilteredRecipes.map((recipe, index) => (
                <TouchableOpacity key={index} onPress={() => router.push(`/recipes/detail?recipeId=${recipe.id}`)}>
                  <View>
                    <Image
                      source={require('frontend/assets/adaptive-icon.png')}
                      style={{ width: 200, height: 200, borderRadius: 10, marginRight: 40, marginLeft: 40 }}
                    />
                    <View style={{
                      position: 'absolute', top: 160, left: 40, right: 60, bottom: 0, width: 200,
                      justifyContent: 'center', alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 10
                    }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        {recipe.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Flecha Izq */}
            <TouchableOpacity
              onPress={() => goToSlide(activeIndex - 1)}
              style={{ position: 'absolute', right: 0, width: 1200, top: '70%', zIndex: 1 }}
            >
              <Image
                source={require('../../../static/images/left-arrow.png')}
                style={{ width: 90, height: 90 }}
              />
            </TouchableOpacity>

            {/* Flecha derecha */}
            <TouchableOpacity
              onPress={() => goToSlide(activeIndex + 1)}
              style={{ position: 'absolute', right: -1100, width: "100%", top: '70%', zIndex: 1 }}
            >
              <Image
                source={require('../../../static/images/rigth-arrow.png')}
                style={{ width: 90, height: 90 }}
              />
            </TouchableOpacity>


          </View>
        )}

        <Image source={require("../../../static/images/Diaper.png")} style={{ position: 'absolute', top: "50%", right: "10%", width: 150, height: 80, transform: [{ rotate: '15deg' }] }} />

        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
          <Text style={[gs.headerText, { color: "#1565C0", fontSize: 38, marginHorizontal: 15 }]}>Recetas recomendadas según la edad</Text>
          <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "50%" }]}
            placeholder="Introduce la edad de tu bebé"
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


          {recommendedFilteredRecipes.length === 0 ? (
            <Text style={{ color: "#1565C0" }}>No se encontraron recetas 😥 </Text>
          ) : (
            recommendedFilteredRecipes.map((recipe: Recipe) => (
              <Link href={`/recipes/detail?recipeId=${recipe.id}`}>
                <View style={[gs.card, { display: 'flex', flexDirection: 'row', gap: 10, width: "100%", marginBottom: 10 }]}>
                  <View>
                    <Image
                      source={require('frontend/assets/adaptive-icon.png')}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <View>
                    <Text style={gs.cardTitle}>{recipe.name}</Text>
                    <Text style={gs.cardContent}>{recipe.description}</Text>
                  </View>
                </View>
              </Link>
            ))
          )}
        </View>

        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>

          <Text style={[gs.headerText, { color: "#1565C0", fontSize: 38, marginTop: 30 }]}>Todas tus recetas</Text>

          <View style={{ gap: 10, marginVertical: 20, alignSelf: "flex-start", alignItems: "center", width: "100%" }}>
            <Link style={gs.mainButton} href={"/recipes/add"}>
              <Text style={gs.mainButtonText}>Añade una receta</Text>
            </Link>
          </View>

          {userFilteredRecipes.length === 0 ? (
            <Text style={{ color: "#1565C0" }}>No se encontraron recetas 😥 </Text>
          ) : (
            userFilteredRecipes.map((recipe: Recipe) => (
              <Link href={`/recipes/detail?recipeId=${recipe.id}`}>
                <View style={[gs.card, { display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10, width: "100%" }]}>
                  <View>
                    <Image
                      source={require('frontend/assets/adaptive-icon.png')}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <View>
                    <Text style={gs.cardTitle}>{recipe.name}</Text>
                    <Text style={gs.cardContent}>{recipe.description}</Text>
                  </View>
                </View>
              </Link>
            ))
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
