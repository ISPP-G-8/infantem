import { useState } from "react";
import { ActivityIndicator, Modal, TextInput, Alert,ImageBackground } from "react-native";
import { Text, View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

const avatarOptions = [
  // There are no avatar images in backend yet.
  require("../../../assets/avatar/avatar1.png"),
  require("../../../assets/avatar/avatar2.png")
];

export default function Account() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const gs = require("../../../static/styles/globalStyles");

  const { isLoading, user, token, setUser, checkAuth, signOut } = useAuth();


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
      profilePhotoRoute: user.profilePhotoRoute
    };

    fetch(`${apiUrl}/api/v1/users/${user.id}`, {
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
        setUser(data);
        setIsEditing(false);
        Alert.alert("Perfil actualizado", "Los cambios han sido guardados correctamente");
        router.push("/account");
      })
      .catch(error => {
        Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
      });
  };

  const handleLogout = signOut;

  const handleAvatarSelection = (avatar: any) => {
    if (user && isEditing) {
      const avatarUri = typeof avatar === "number"
        ? Image.resolveAssetSource(avatar).uri
        : avatar;

      setUser({ ...user, profilePhotoRoute: avatarUri });
      setModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <View style={gs.loadingContainer}>
        <ActivityIndicator size="large" color="#00446a" />
        <Text style={gs.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../static/images/Background.png")}
      style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >      
    <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100, backgroundColor:"transparent" }]}>
    <Image source={require("../../../static/images/Bib.png")} style={{ position: 'absolute', top: "20%", right: "72%", width: 120, height: 120,transform: [{ rotate: '-15deg' }] }} />


        <Text style={[gs.headerText, { color: "#1565C0" }]}>Perfil</Text>

        <TouchableOpacity style={gs.profileImageContainer} onPress={() => isEditing && setModalVisible(true)} disabled={!isEditing}>
          <Image source={user?.profilePhotoRoute ? { uri: user.profilePhotoRoute } : avatarOptions[0]} style={gs.profileImage} />
        </TouchableOpacity>

        {user && (
          <>
            <Text style={[gs.inputLabel,{width:"80%",paddingLeft:10,color: "#1565C0", fontWeight: "bold"}]}>Nombre</Text>
            <TextInput 
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.8, width:"80%"}]} 
            value={user.name} editable={isEditing} onChangeText={(text) => setUser({ ...user, name: text })} />

            <Text style={[gs.inputLabel,{width:"80%",paddingLeft:10,color: "#1565C0", fontWeight: "bold"}]}>Apellido</Text>
            <TextInput 
             style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.8, width:"80%"}]} 
            value={user.surname} editable={isEditing} onChangeText={(text) => setUser({ ...user, surname: text })} />

            <Text style={[gs.inputLabel,{width:"80%",paddingLeft:10,color: "#1565C0", fontWeight: "bold"}]}>Nombre de Usuario</Text>
            <TextInput 
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.8, width:"80%"}]} 
              value={user.username} editable={isEditing} onChangeText={(text) => setUser({ ...user, username: text })} />

            <Text style={[gs.inputLabel,{width:"80%",paddingLeft:10,color: "#1565C0", fontWeight: "bold"}]}>Correo Electrónico</Text>
            <TextInput 
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.8, width:"80%"}]} 
              value={user.email} editable={isEditing} onChangeText={(text) => setUser({ ...user, email: text })} />
          </>
        )}

        <TouchableOpacity style={[gs.mainButton, { backgroundColor: "#1565C0" }]} onPress={isEditing ? handleSaveChanges : handleEditProfile}>
          <Text style={gs.mainButtonText}>{isEditing ? "Guardar Cambios" : "Editar Perfil"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[gs.secondaryButton, { marginTop: 10}]} onPress={handleLogout}>
          <Text style={[gs.secondaryButtonText]}>Cerrar Sesión</Text>
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
    </ImageBackground>
  );
}
