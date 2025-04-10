import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe, User } from "../../../types";
import { View, Text, ScrollView } from "react-native";
import { FlatList, Button, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAdmin } from "../../../context/AdminContext";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentRecipePage, setCurrentRecipePage] = useState(1);

  const itemsPerPage = 10;

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { token } = useAuth();
  const { setUserToModify, setRecipeToModify } = useAdmin();

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
    router.push(`/admin/showrecipe`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 0, paddingBottom: 0 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              marginRight: 20,
            }}
          >
            Todos los usuarios:
          </Text>
          <Text
            style={{ color: "#1565C0", fontSize: 14 }}
            onPress={handleAddUser}
          >
            Crear nuevo usuario
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          ></View>
        </View>
        <View style={{ padding: 10 }}>
          <FlatList
            data={paginatedUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>{item.username}</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#4CAF50",
                      padding: 5,
                      marginRight: 5,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      handleEditUser(item);
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Modificar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              title="Anterior"
              onPress={handlePreviousUserPage}
              disabled={currentUserPage === 1}
            />
            <Text>Página {currentUserPage}</Text>
            <Button
              title="Siguiente"
              onPress={handleNextUserPage}
              disabled={currentUserPage * itemsPerPage >= users.length}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              marginRight: 20,
            }}
          >
            Todas las recetas:
          </Text>
          <Text
            style={{ color: "#1565C0", fontSize: 14 }}
            onPress={handleAddRecipe}
          >
            Crear nueva receta
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          ></View>
        </View>
        <View style={{ padding: 10 }}>
          <FlatList
            data={paginatedRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>{item.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#4CAF50",
                      padding: 5,
                      marginRight: 5,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      handleEditRecipe(item);
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Modificar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              title="Anterior"
              onPress={handlePreviousRecipePage}
              disabled={currentRecipePage === 1}
            />
            <Text>Página {currentRecipePage}</Text>
            <Button
              title="Siguiente"
              onPress={handleNextRecipePage}
              disabled={currentRecipePage * itemsPerPage >= recipes.length}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
