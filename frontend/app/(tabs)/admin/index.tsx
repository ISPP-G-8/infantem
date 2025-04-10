import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe, User, SignUpRequest } from "../../../types";
import { View, Text, Image, TextInput } from "react-native";
import { FlatList, Button, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { token, setUserToModify } = useAuth();

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

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = () => {
    router.push("/admin/adduser");
  };

  const handleEditUser = (user: User) => {
    setUserToModify(user);
    router.push("/admin/showuser");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
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
            onPress={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <Text>Página {currentPage}</Text>
          <Button
            title="Siguiente"
            onPress={handleNextPage}
            disabled={currentPage * itemsPerPage >= users.length}
          />
        </View>
      </View>
    </View>
  );
}
