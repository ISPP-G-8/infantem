import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link, router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const avatarOptions = [
  require("../../../assets/avatar/avatar1.png"),
  require("../../../assets/avatar/avatar2.png"),
];

export default function ShowUser() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [userId, setUserId] = useState<number | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { isLoading, user, token, setUser, signOut } = useAuth();

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!user || !token) return;

    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password,
      email: user.email,
      profilePhotoRoute: user.profilePhotoRoute,
    };

    fetch(`${apiUrl}/api/v1/users/${user.id}`, {
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
        router.push("/account");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          `No se pudo guardar los cambios: ${error.message}`
        );
      });
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
          Perfil de {user?.username}
        </Text>

        {user && (
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
              value={user.name}
              editable={isEditing}
              onChangeText={(text) => setUser({ ...user, name: text })}
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
              value={user.surname}
              editable={isEditing}
              onChangeText={(text) => setUser({ ...user, surname: text })}
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
              value={user.username}
              editable={isEditing}
              onChangeText={(text) => setUser({ ...user, username: text })}
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
              value={user.email}
              editable={isEditing}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          </>
        )}

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
          <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red" }]}>
            <Text style={gs.mainButtonText}>Eliminar Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
