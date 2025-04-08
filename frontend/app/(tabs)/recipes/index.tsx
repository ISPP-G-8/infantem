import { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { Recipe } from "../../../types/Recipe";
import { useAuth } from "../../../context/AuthContext";
import { RecipeFilter } from "../../../types";
import RecipeFilterComponent from "../../../components/RecipeFilter";
import Pagination from "../../../components/Pagination";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;


export default function Page() {
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth < 500 ? 170 : 250;

  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [userPage, setUserPage] = useState<number>(1);
  const [userTotalPages, setUserTotalPages] = useState<number | null>(null);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [recommendedPage, setRecommendedPage] = useState<number>(1);
  const [recommendedTotalPages, setRecommendedTotalPages] = useState<number | null>(null);

  const [filters, setFilters] = useState<RecipeFilter>({});
  const [userRecipesSearchQuery, setUserRecipesSearchQuery] = useState<string | undefined>();


  useEffect(() => {
    fetchRecommendedRecipes(filters);
  }, [recommendedPage]);

  useEffect(() => {
    fetchUserRecipes();
  }, [userPage]);


  const fetchRecommendedRecipes = async (filters: RecipeFilter): Promise<boolean> => {

    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            queryParams.append(key, value.join(','));
          }
        } else if (typeof value === 'number') {
          queryParams.append(key, value.toString());
        } else if (value) {
          queryParams.append(key, value);
        }
      }
    });
    
    const queryString = queryParams.toString();
    const url = `${apiUrl}/api/v1/recipes/recommended?page=${recommendedPage-1}${queryString ? `&${queryString}` : ''}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Error fetching recipes");

      const recipesData = await response.json();
      setRecommendedRecipes(recipesData.content);
      setRecommendedTotalPages(recipesData.totalPages);
      return true;

    } catch (error) {
      console.error('Error fetching recipes: ', error);
      return false;
    }
  };

  const fetchUserRecipes = async (searchQuery?: string): Promise<boolean> => {

    const url = `${apiUrl}/api/v1/recipes?page=${userPage-1}${searchQuery? `&name=${searchQuery}` : ''}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Error fetching recipes");

      const recipesData = await response.json();
      setUserRecipes(recipesData.content);
      setUserTotalPages(recipesData.totalPages);
      return true

    } catch (error) {
      console.error('Error fetching user recipes: ', error);
      return false;
    }
  };

  return (

    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 0, paddingBottom: 0 }}>

        <View style={{
          width: "90%", 
          marginTop: 30, 
          marginLeft: "5%", 
          backgroundColor: "white",
          borderRadius: 8,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2
        }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Text style={{ fontSize: 28, fontWeight: "bold", color: "#1565C0", marginRight: 10 }}>
                Recetas
              </Text>
            </View>
            <Text style={{ fontSize: 16, color: "#1565C0", marginBottom: 16 }}>
              Elige entre nuestra variedad de recetas
            </Text>
            
            <View style={{ borderRadius: 8, padding: 12, alignItems:"center", flexDirection: "row", borderWidth: 1, borderColor: "#E0E0E0" }}>
              <Text style={{ color: "#757575", marginRight: 8 }}>🔍</Text>
              <TextInput 
                placeholder="Buscar por título de receta" 
                style={{ flex: 1, fontSize: 14 }} 
                onChangeText={(text) => setFilters({ ...filters, name: text })} 
                placeholderTextColor="#9E9E9E" 
                selectionColor="#1565C0"
                returnKeyType="search"
                onSubmitEditing={() => fetchRecommendedRecipes(filters)}
              /> 
              <TouchableOpacity
                style={{
                  backgroundColor: "#1565C0",
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                }}
                onPress={() => fetchRecommendedRecipes(filters)}
                >
                <Text style={{ color: "white", fontWeight: "500" }}>Buscar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 8,
                    borderWidth: 1,
                    borderColor: "#E0E0E0"
                  }}
                  onPress={() => {
                    setFilters({});
                    fetchRecommendedRecipes({}); 
                  }}
                >
              <Text style={{ color: "#757575", fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal:"5%",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1565C0", marginRight: 10 }}>
            Recetas recomendadas por nuestros expertos
          </Text>
          <View style={{ flex: 1, height: 2, backgroundColor: "#1565C0", opacity: 0.6 }}/> 
        </View>


        <RecipeFilterComponent filters={filters} setFilters={setFilters} onApplyFilters={fetchRecommendedRecipes} />

        {recommendedRecipes.length === 0 ? (
          <Text>No se encontraron recetas.</Text>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={16}
              style={{ marginHorizontal: "5%"}}
            >
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, paddingTop: 20 }}>

                {recommendedRecipes.map((recipe, index) => (
                  <TouchableOpacity key={index} onPress={() => router.push(`/recipes/detail?recipeId=${recipe.id}`)}>
                    <View
                      key={index}
                      style={{
                        width: cardWidth,
                        minHeight: 230,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        overflow: "hidden",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 3,
                        marginBottom: 30,
                      }}>
                      <Image
                        source={require("frontend/assets/adaptive-icon.png")}
                        style={{ width: "100%", height: 150 }}
                        resizeMode="cover"
                      />
                      {/* Contenido */}
                      <View style={{ padding: 12 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
                          {recipe.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
    
          </View>
        )}

        {recommendedTotalPages && (
          <Pagination 
          totalPages={recommendedTotalPages} 
          page={recommendedPage} 
          setPage={setRecommendedPage} 
          />
        )}

        <View
          style={{
            flexDirection: "row",
            marginHorizontal:"5%",
            marginTop: 60,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1565C0", marginRight: 10 }}>
            Todas tus recetas 
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#1565C0", opacity: 0.6 }}/> 
        </View>

        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
          <View style={{ borderRadius: 8, padding: 12, alignItems:"center", flexDirection: "row", backgroundColor: "white"}}>
            <Text style={{ color: "#757575", marginRight: 8 }}>🔍</Text>
            <TextInput 
              placeholder="Buscar por título de receta" 
              style={{ flex: 1, fontSize: 14 }} 
              onChangeText={(text) => setUserRecipesSearchQuery(text)}
              placeholderTextColor="#9E9E9E" 
              selectionColor="#1565C0"
              returnKeyType="search"
              onSubmitEditing={() => fetchUserRecipes(userRecipesSearchQuery)}
            /> 
            <TouchableOpacity
              style={{
                backgroundColor: "#1565C0",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
                marginLeft: 8
              }}
              onPress={() => fetchUserRecipes(userRecipesSearchQuery)}
              >
              <Text style={{ color: "white", fontWeight: "500" }}>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 8,
                borderWidth: 1,
                borderColor: "#E0E0E0"
              }}
              onPress={() => {
                setUserRecipesSearchQuery(undefined);
                fetchUserRecipes(); 
              }}
            >
              <Text style={{ color: "#757575", fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10, marginVertical: 20, alignSelf: "flex-start", alignItems: "center", width: "100%" }}>
            <Link style={[gs.mainButton, { backgroundColor: "#1565C0" }]} href={"/recipes/add"}>
              <Text style={gs.mainButtonText}>Añade una receta</Text>
            </Link>
          </View>

          {userRecipes.length === 0 ? (
            <Text style={{ color: "#1565C0" }}>No se encontraron recetas 😥 </Text>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, paddingHorizontal: 10, marginTop: 20 }}>
              {
                userRecipes.map((recipe, index) => (
                  <TouchableOpacity key={index} onPress={() => router.push(`/recipes/detail?recipeId=${recipe.id}`)}>
                    <View
                      key={index}
                      style={{
                        width: cardWidth,
                        minHeight: 230,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        overflow: "hidden",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 3,
                        marginBottom: 30,
                      }}>
                      <Image
                        source={require("frontend/assets/adaptive-icon.png")}
                        style={{ width: "100%", height: 150 }}
                        resizeMode="cover"
                      />
                      {/* Contenido */}
                      <View style={{ padding: 12 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
                          {recipe.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {userTotalPages && userTotalPages > 1 && (
            <Pagination 
            totalPages={userTotalPages} 
            page={userPage} 
            setPage={setUserPage} 
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
