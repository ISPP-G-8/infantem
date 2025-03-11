import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Link } from "expo-router"; 
import NavBar from "../../components/NavBar";

export default function Page() {
  const gs = require("../../static/styles/globalStyles");
  const [searchQuery, setSearchQuery] = useState("");

  const recipes = [
    {
      title: "Sweet Potato Purée",
      description: "Smooth and sweet, ideal for babies 6 months and older.",
    },
    {
      title: "Zucchini Purée",
      description: "Light and easy to digest, perfect for introducing vegetables.",
    },
    {
      title: "Banana and Oatmeal Porridge",
      description: "Energetic and nutritious, excellent for breakfast.",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <NavBar />

      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <Text style={gs.headerText}>Recipe Suggestions</Text>
        <Text style={gs.bodyText}>
          Find suitable recipes based on your baby's age and preferences
        </Text>

        <View style={{ width: "90%" }}>
          <TextInput
            style={gs.input}
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={{ flexDirection: "row", gap: 10, marginVertical: 10, alignSelf: "flex-start" }}>
            <TouchableOpacity style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Age Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Alergies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={gs.mainButton}>
              <Text style={gs.mainButtonText}>Add recipes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[gs.subHeaderText, { marginTop: 30 }]}>Suggested recipes</Text>

        {recipes.map((recipe, index) => (
          <Link
            key={index}
            href={`/recipes/recipeDetails?recipeTitle=${recipe.title}`} 
          >
            <View style={gs.card}>
              <Text style={gs.cardTitle}>{recipe.title}</Text>
              <Text style={gs.cardContent}>{recipe.description}</Text>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
