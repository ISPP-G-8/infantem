import { useEffect, useState } from "react";
import { TextInput, Alert, ImageBackground } from "react-native";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

export default function ShowUser() {
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { userToModify, token, setUser, setUserToModify } = useAuth();

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!userToModify || !token) return;

    const userData = {
      name: userToModify.name,
      surname: userToModify.surname,
      username: userToModify.username,
      email: userToModify.email,
      profilePhotoRoute: userToModify.profilePhotoRoute,
    };

    fetch(`${apiUrl}/api/v1/admin/users/${userToModify.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(JSON.stringify(err));
          });
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsEditing(false);
        Alert.alert(
          "Perfil actualizado",
          "Los cambios han sido guardados correctamente"
        );
        router.push("/admin");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          `No se pudo guardar los cambios: ${error.message}`
        );
      });
  };

  const handleDeleteProfile = async (id: number) => {
    if (!token || !userToModify) return;

    try {
      const response = await fetch(`${apiUrl}/api/v1/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(JSON.stringify(err));
        });
      }
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgroundColor: "#E3F2FD",
      }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView
        contentContainerStyle={[
          gs.container,
          {
            paddingTop: 20,
            paddingBottom: 100,
            backgroundColor: "transparent",
          },
        ]}
      >
        <Text
          style={{
            color: "#1565C0",
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Perfil de {userToModify?.username}
        </Text>

        {userToModify && (
          <>
            <Text
              style={[
                gs.inputLabel,
                {
                  width: "80%",
                  paddingLeft: 10,
                  color: "#1565C0",
                  fontWeight: "bold",
                },
              ]}
            >
              Nombre
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
              value={userToModify.name}
              editable={isEditing}
              onChangeText={(text) =>
                setUserToModify({ ...userToModify, name: text })
              }
            />

            <Text
              style={[
                gs.inputLabel,
                {
                  width: "80%",
                  paddingLeft: 10,
                  color: "#1565C0",
                  fontWeight: "bold",
                },
              ]}
            >
              Apellido
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
              value={userToModify.surname}
              editable={isEditing}
              onChangeText={(text) =>
                setUserToModify({ ...userToModify, surname: text })
              }
            />

            <Text
              style={[
                gs.inputLabel,
                {
                  width: "80%",
                  paddingLeft: 10,
                  color: "#1565C0",
                  fontWeight: "bold",
                },
              ]}
            >
              Nombre de Usuario
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
              value={userToModify.username}
              editable={isEditing}
              onChangeText={(text) =>
                setUserToModify({ ...userToModify, username: text })
              }
            />

            <Text
              style={[
                gs.inputLabel,
                {
                  width: "80%",
                  paddingLeft: 10,
                  color: "#1565C0",
                  fontWeight: "bold",
                },
              ]}
            >
              Correo Electrónico
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
              value={userToModify.email}
              editable={isEditing}
              onChangeText={(text) =>
                setUserToModify({ ...userToModify, email: text })
              }
            />
          </>
        )}
        {userToModify && (
          <View
            style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <TouchableOpacity
              style={[gs.mainButton, { backgroundColor: "#1565C0" }]}
              onPress={isEditing ? handleSaveChanges : handleEditProfile}
            >
              <Text style={gs.mainButtonText}>
                {isEditing ? "Guardar Cambios" : "Editar Perfil"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[gs.mainButton, { backgroundColor: "red" }]}
              onPress={() => handleDeleteProfile(userToModify.id)}
            >
              <Text style={gs.mainButtonText}>Eliminar Cuenta</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
