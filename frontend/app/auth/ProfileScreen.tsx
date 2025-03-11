import { useState, useEffect } from "react";
import { ActivityIndicator, Modal, TextInput, Alert } from "react-native";
import { Text, View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../../components/NavBar";

interface User {
  id: number;
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  email: string;
  rutaFotoPerfil: string;
}

const avatarOptions = [
  require("../../assets/avatar/avatar1.png"),
  require("../../assets/avatar/avatar2.png")
];

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  const gs = require("../../static/styles/globalStyles");

  useEffect(() => {
    fetch("http://localhost:8080/usuarios/1")
      .then(response => response.json())
      .then((data: User) => {
        if (data) {
          setUser(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar el usuario:", error);
        setLoading(false);
      });
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!user) return;
    
    const userData = {
      id: user.id,
      firstName: user.nombre,
      lastName: user.apellidos,
      email: user.email,
      avatar: user.rutaFotoPerfil || "" // Asegurar que no es null
    };
  
    console.log("🟡 Datos enviados al backend:", userData);
  
    fetch(`http://localhost:8080/usuarios/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(response => {
        console.log("🟠 Respuesta del servidor:", response);
        if (!response.ok) {
          return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
      })
      .then(data => {
        console.log("🟢 Datos actualizados en el backend:", data);
        setUser(prevUser => ({ ...prevUser, ...data }));
        setIsEditing(false);
        Alert.alert("Perfil actualizado", "Los cambios han sido guardados correctamente");
      })
      .catch(error => {
        console.error("🔴 Error al guardar los cambios:", error);
        Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
      });
  };
  

  const handleLogout = () => {
    console.log("Cerrando sesión");
  };

  
  const handleAvatarSelection = (avatar: any) => {
    if (user && isEditing) {
      const avatarUri = typeof avatar === "number" 
        ? Image.resolveAssetSource(avatar).uri  // Convierte require() a una URI
        : avatar; // Si ya es una URI, úsala directamente
  
      setUser({ ...user, rutaFotoPerfil: avatarUri });
      setModalVisible(false);
    }
  };
  

  if (!user) {
    return <Text>Cargando perfil...</Text>;
  }
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
      <NavBar />
      <ScrollView contentContainerStyle={[gs.container, {paddingTop: 100, paddingBottom: 100}]}>
        <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={gs.headerText}>Perfil</Text>
        <Text style={gs.subHeaderText}>Información de usuario</Text>

        <TouchableOpacity style={gs.profileImageContainer} onPress={() => isEditing && setModalVisible(true)} disabled={!isEditing}>
          <Image source={user.rutaFotoPerfil ? { uri: user.rutaFotoPerfil } : avatarOptions[0]} style={gs.profileImage} />
        </TouchableOpacity>

        <TextInput style={gs.input} value={user.nombre} editable={isEditing} onChangeText={text => setUser({ ...user, nombre: text })} />
        <TextInput style={gs.input} value={user.apellidos} editable={isEditing} onChangeText={text => setUser({ ...user, apellidos: text })} />
        <TextInput style={gs.input} value={user.nombreUsuario} editable={isEditing} onChangeText={text => setUser({ ...user, nombreUsuario: text })} />
        <TextInput style={gs.input} value={user.email} editable={isEditing} onChangeText={text => setUser({ ...user, email: text })} />

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