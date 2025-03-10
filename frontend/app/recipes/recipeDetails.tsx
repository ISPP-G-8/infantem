import { useLocalSearchParams } from "expo-router"; 
import { View, Text, TouchableOpacity } from "react-native";
import NavBar from "../../components/NavBar";
import { recipes } from "../../hardcoded_data/recipesData";

export default function RecipeDetails() {

  const { recipeTitle } = useLocalSearchParams();
  const gs = require("../../static/styles/globalStyles");

  const recipe = recipes.find((r) => r.title === recipeTitle);

  if (!recipe) {
    return (
      <View style={gs.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <View style={gs.container}>
      <NavBar />
      <View style={[gs.content, { marginTop: 30 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={gs.headerText}>{recipe.title}</Text>
          <TouchableOpacity style={[gs.mainButton, { marginLeft: 30 }]}>
            <Text style={gs.mainButtonText}>Add to Favourites</Text>
          </TouchableOpacity>
        </View>
        <Text style={gs.card}>{recipe.description}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={[gs.cardTitle, { marginBottom: 10 }]}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={gs.cardContent}>- {ingredient}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
