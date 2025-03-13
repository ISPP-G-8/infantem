import { useState, useEffect } from "react";
import { ActivityIndicator, Modal, TextInput, Alert } from "react-native";
import { Text, View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getToken, removeToken } from '../../../utils/jwtStorage';
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";

const avatarOptions = [
  require("../../../assets/avatar/avatar1.png"),
  require("../../../assets/avatar/avatar2.png")
];

export default function Account() {
  const [user, setUser] = useState<any | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const gs = require("../../../static/styles/globalStyles");

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await getToken();
      setToken(authToken);

      if (authToken) {
        setIsLoggedIn(true);
        try {
          const decodedToken: any = jwtDecode(authToken);
          const userId = decodedToken.jti;
          setUserId(userId);
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsLoggedIn(false);
          setUserId(null);
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (token && userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/v1/users/${userId}`, {
            headers: { "Authorization": `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userId, token]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!user || !token || !userId) return;

    const userData = {
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password,
      email: user.email,
      avatar: user.profilePhotoRoute
    };

    fetch(`${apiUrl}/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
      })
      .then(data => {
        setUser((prevUser: any) => ({ ...prevUser, ...data }));
        setIsEditing(false);
        Alert.alert("Perfil actualizado", "Los cambios han sido guardados correctamente");
        router.push("/account");
      })
      .catch(error => {
        Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
      });
  };

  const handleLogout = async () => {
    await removeToken();
    router.push("/");
  };

  const handleAvatarSelection = (avatar: any) => {
    if (user && isEditing) {
      const avatarUri = typeof avatar === "number"
        ? Image.resolveAssetSource(avatar).uri
        : avatar;

      setUser({ ...user, profilePhotoRoute: avatarUri });
      setModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View style={gs.loadingContainer}>
        <ActivityIndicator size="large" color="#00446a" />
        <Text style={gs.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={gs.headerText}>Perfil</Text>
        <Text style={gs.subHeaderText}>Información de usuario</Text>

        <TouchableOpacity style={gs.profileImageContainer} onPress={() => isEditing && setModalVisible(true)} disabled={!isEditing}>
          <Image source={user && user.profilePhotoRoute ? { uri: user.profilePhotoRoute } : avatarOptions[0]} style={gs.profileImage} />
        </TouchableOpacity>

        {user && (
          <>
            {user && (
              <>
                <Text style={gs.inputLabel}>Nombre</Text>
                <TextInput
                  style={gs.card}
                  value={user.name}
                  editable={isEditing}
                  onChangeText={(text) => setUser({ ...user, name: text })}
                />
                <Text style={gs.inputLabel}>Apellido</Text>
                <TextInput
                  style={gs.card}
                  value={user.surname}
                  editable={isEditing}
                  onChangeText={(text) => setUser({ ...user, surname: text })}
                />
                <Text style={gs.inputLabel}>Nombre de Usuario</Text>
                <TextInput
                  style={gs.card}
                  value={user.username}
                  editable={isEditing}
                  onChangeText={(text) => setUser({ ...user, username: text })}
                />
                <Text style={gs.inputLabel}>Correo Electrónico</Text>
                <TextInput
                  style={gs.card}
                  value={user.email}
                  editable={isEditing}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                />
              </>
            )}
          </>
        )}

        {isEditing ? (
          <TouchableOpacity style={[gs.mainButton, { marginBottom: 20 }]} onPress={handleSaveChanges}>
            <Text style={gs.mainButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[gs.mainButton, { marginBottom: 20 }]} onPress={handleEditProfile}>
            <Text style={gs.mainButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[gs.secondaryButton, { marginTop: 20 }]} onPress={handleLogout}>
          <Text style={gs.secondaryButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View style={gs.modalOverlay}>
            <View style={gs.modalContent}>
              <Text style={gs.modalTitle}>Selecciona tu avatar</Text>
              <FlatList
                data={avatarOptions}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleAvatarSelection(item)}>
                    <Image source={item} style={gs.avatarOption} />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={gs.closeModalButton} onPress={() => setModalVisible(false)}>
                <Text style={gs.closeModalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

