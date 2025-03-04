import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";

interface User {
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  email: string;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const gs = require("../../static/styles/globalStyles"); // Importando estilos globales

  useEffect(() => {
    fetch("http://localhost:8080/usuarios/1") // Se usa el ID del usuario en la URL
      .then(response => response.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar el usuario:", error);
        setLoading(false);
      });
  }, []);

  const handleEditProfile = () => {
    console.log("Editar perfil");
    // Aquí se podría abrir una pantalla de edición de perfil
  };

  const handleLogout = () => {
    console.log("Cerrando sesión");
    // Aquí iría la lógica para cerrar sesión
  };

  if (!user) {
    return <Text>Cargando perfil...</Text>; // Mensaje mientras se carga el usuario
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
    <ScrollView contentContainerStyle={gs.container}>
      <Text style={gs.headerText}>Perfil</Text>
      <Text style={gs.subHeaderText}>Información de usuario</Text>

      {/* Imagen de perfil (Si decides agregarla en la BD en el futuro) */}
      <View style={gs.profileImageContainer}>
        <Image source={{ uri: "https://via.placeholder.com/100" }} style={gs.profileImage} />
      </View>

      {/* Nombre de usuario */}
      <Text style={gs.subHeaderText}>{user.nombre} {user.apellidos}</Text>

      {/* Nombre de usuario */}
      <Text style={gs.profileText}>Nombre de Usuario</Text>
      <Text style={gs.subHeaderText}>{user.nombreUsuario}</Text>

      {/* Correo electrónico */}
      <Text style={gs.profileText}>Correo Electrónico</Text>
      <Text style={[gs.subHeaderText, { marginBottom: 30 }]}>{user.email}</Text>

      {/* Botón para editar perfil */}
      <TouchableOpacity style={[gs.mainButton, { marginBottom: 20 }]} onPress={handleEditProfile}>
        <Text style={gs.mainButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity style={[gs.secondaryButton, { marginTop: 20 }]} onPress={handleLogout}>
        <Text style={gs.secondaryButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
