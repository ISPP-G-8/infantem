import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe, User } from "../../../types";
import { View, Text, ScrollView } from "react-native";
import { FlatList, Button, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentRecipePage, setCurrentRecipePage] = useState(1);

  const itemsPerPage = 10;

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { token, setUserToModify, setRecipeToModify } = useAuth();

  const gs = require("../../../static/styles/globalStyles");

  useEffect(() => {
    obtainAllUsers();
    obtainAllRecipes();
  }, []);

  const obtainAllUsers = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching recipes: ", error);
      setUsers([]);
      return false;
    }
  };

  const obtainAllRecipes = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/admin/recipes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const recipesData = await response.json();
        setRecipes(recipesData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching recipes: ", error);
      setRecipes([]);
      return false;
    }
  };

  const handleNextUserPage = () => {
    if (currentUserPage * itemsPerPage < users.length) {
      setCurrentUserPage(currentUserPage + 1);
    }
  };

  const handlePreviousUserPage = () => {
    if (currentUserPage > 1) {
      setCurrentUserPage(currentUserPage - 1);
    }
  };

  const handleNextRecipePage = () => {
    if (currentRecipePage * itemsPerPage < recipes.length) {
      setCurrentRecipePage(currentRecipePage + 1);
    }
  };

  const handlePreviousRecipePage = () => {
    if (currentRecipePage > 1) {
      setCurrentRecipePage(currentRecipePage - 1);
    }
  };

  const paginatedUsers = users.slice(
    (currentUserPage - 1) * itemsPerPage,
    currentUserPage * itemsPerPage
  );

  const paginatedRecipes = recipes.slice(
    (currentRecipePage - 1) * itemsPerPage,
    currentRecipePage * itemsPerPage
  );

  const handleAddUser = () => {
    router.push("/admin/adduser");
  };

  const handleEditUser = (user: User) => {
    setUserToModify(user);
    router.push("/admin/showuser");
  };

  const handleAddRecipe = () => {
    router.push("/admin/addrecipe");
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setRecipeToModify(recipe);
    router.push("/admin/showrecipe");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
  <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    {/* Usuarios */}
    <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0D47A1" }}>👥 Todos los usuarios</Text>
        <TouchableOpacity onPress={handleAddUser}>
          <Text style={{ color: "#1565C0", fontSize: 16, fontWeight: "600" }}>+ Crear nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginatedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 15,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.username}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#4CAF50",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}
              onPress={() => handleEditUser(item)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Modificar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Paginación usuarios */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
        <Button title="Anterior" onPress={handlePreviousUserPage} disabled={currentUserPage === 1} />
        <Text style={{ alignSelf: "center" }}>Página {currentUserPage}</Text>
        <Button title="Siguiente" onPress={handleNextUserPage} disabled={currentUserPage * itemsPerPage >= users.length} />
      </View>
    </View>

    {/* Recetas */}
    <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0D47A1" }}>📋 Todas las recetas</Text>
        <TouchableOpacity onPress={handleAddRecipe}>
          <Text style={{ color: "#1565C0", fontSize: 16, fontWeight: "600" }}>+ Crear nueva</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginatedRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 15,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#4CAF50",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}
              onPress={() => handleEditRecipe(item)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Ver receta</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Paginación recetas */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
        <Button title="Anterior" onPress={handlePreviousRecipePage} disabled={currentRecipePage === 1} />
        <Text style={{ alignSelf: "center" }}>Página {currentRecipePage}</Text>
        <Button title="Siguiente" onPress={handleNextRecipePage} disabled={currentRecipePage * itemsPerPage >= recipes.length} />
      </View>
    </View>
  </ScrollView>
</View>

  );
}
