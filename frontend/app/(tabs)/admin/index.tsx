import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe, User } from "../../../types";
import { View, Text, Image, TextInput } from "react-native";
import { FlatList, Button, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

/*
    allergen
    baby
    disease?
    recipe
    user
*/

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [babies, setBabies] = useState<Baby[]>([]);
  // const [diseases, setDiseases] = useState<Disease[]>([]);
  // const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { token } = useAuth();

  const gs = require("../../../static/styles/globalStyles");

  useEffect(() => {
    obtainAllUsers();
    obtainAllRecipes();
    console.log("Token: ", token);
    // obtainAllBabies();
    // obtainAllDiseases();
    // obtainAllAllergens();
  }, []);

  const obtainAllUsers = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/users`, {
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
      const response = await fetch(`${apiUrl}/api/v1/recipes`, {
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

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEditUser = (user: User) => {
    setOriginalUser(user);
    setEditedUser({
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password,
      email: user.email,
      profilePhotoRoute: user.profilePhotoRoute || "",
    });
    setIsEditing(true);
  };

  const handleAddUser = () => {
    setOriginalUser(null);
    setEditedUser({
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
    });
    setIsEditing(true);
  };

  const handleCancelUser = () => {
    setEditedUser(null);
    setOriginalUser(null);
    setIsEditing(false);
  };

  const handleSaveUser = async () => {
    if (!token || !editedUser) return;

    const userToSave: User = originalUser
      ? {
          ...originalUser,
          name: editedUser.name,
          surname: editedUser.surname,
          username: editedUser.username,
          password: editedUser.password,
          email: editedUser.email,
          profilePhotoRoute: editedUser.profilePhotoRoute || "",
        }
      : {
          name: editedUser.name,
          surname: editedUser.surname,
          username: editedUser.username,
          password: editedUser.password,
          email: editedUser.email,
          profilePhotoRoute: editedUser.profilePhotoRoute || "",
        };

    const method = userToSave.id ? "PUT" : "POST";
    const url = userToSave.id
      ? `${apiUrl}/api/v1/users/${userToSave.id}`
      : `${apiUrl}/api/v1/users`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToSave),
      });
      if (!response.ok) {
        console.error("Error saving user: ", response.statusText);
        return;
      }
      const updatedUser = await response.json();
      setUsers((prev) =>
        userToSave.id
          ? prev.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          : [...prev, updatedUser]
      );
      setEditedUser(null);
      setOriginalUser(null);
      setIsEditing(false);
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user: ", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!token) return;
    try {
      const response = await fetch(`${apiUrl}/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("Error deleting user: ", response.statusText);
        return;
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
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
        >
          {/* FORMULARIO */}
          {isEditing && editedUser && (
            <View
              style={[
                gs.card,
                {
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  backgroundColor: "rgba(227, 242, 253, 0.8)",
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                  elevation: 5,
                },
              ]}
            >
              <Image
                source={require("../../../static/images/profile.webp")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 20,
                }}
              />
              <Text style={gs.cardTitle}>
                {editedUser.id ? "Editar usuario" : "Añadir usuario"}
              </Text>

              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: "10%",
                  color: "#1565C0",
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Nombre:
              </Text>
              <TextInput
                style={[
                  gs.input,
                  {
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#1565C0",
                    opacity: 0.8,
                    width: "80%",
                  },
                ]}
                value={editedUser.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />

              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: "10%",
                  color: "#1565C0",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Apellido:
              </Text>
              <TextInput
                style={[
                  gs.input,
                  {
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#1565C0",
                    opacity: 0.8,
                    width: "80%",
                  },
                ]}
                value={editedUser.surname}
                onChangeText={(text) => handleInputChange("surname", text)}
              />

              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: "10%",
                  color: "#1565C0",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Nombre de usuario:
              </Text>
              <TextInput
                style={[
                  gs.input,
                  {
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#1565C0",
                    opacity: 0.8,
                    width: "80%",
                  },
                ]}
                value={editedUser.username}
                onChangeText={(text) => handleInputChange("username", text)}
              />

              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: "10%",
                  color: "#1565C0",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Contraseña:
              </Text>
              <TextInput
                style={[
                  gs.input,
                  {
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#1565C0",
                    opacity: 0.8,
                    width: "80%",
                  },
                ]}
                value={editedUser.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: "10%",
                  color: "#1565C0",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Correo electrónico:
              </Text>
              <TextInput
                style={[
                  gs.input,
                  {
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#1565C0",
                    opacity: 0.8,
                    width: "80%",
                  },
                ]}
                value={editedUser.email}
                onChangeText={(text) => handleInputChange("email", text)}
              />
              <TouchableOpacity
                style={[gs.mainButton, { marginTop: 20 }]}
                onPress={handleSaveUser}
              >
                <Text style={gs.mainButtonText}>
                  {editedUser.id ? "Actualizar" : "Guardar"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  gs.mainButton,
                  { backgroundColor: "red", marginTop: 10 },
                ]}
                onPress={handleCancelUser}
              >
                <Text style={gs.mainButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F44336",
                    padding: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    handleDeleteUser(item.id);
                  }}
                >
                  <Text style={{ color: "#fff" }}>Borrar</Text>
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
