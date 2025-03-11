import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import NavBar from "../../components/NavBar";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gs = require("../../static/styles/globalStyles"); // Importando estilos globales

  const handleLogin = () => {
    console.log("Iniciando sesión con:", email, password);
    // Aquí iría la lógica de autenticación con el backend
  };

  return (
    <View style={{ flex: 1 }}>

      <NavBar />

      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <Text style={gs.headerText}>Iniciar Sesión</Text>
        <Text style={gs.subHeaderText}>Accede con tu cuenta</Text>

        {/* Imagen de usuario opcional */}
        <Image source={require("../../static/images/profile.webp")} style={gs.profileImage} />

        {/* Campo de correo */}
        <Text style={gs.subHeaderText}>Correo Electrónico</Text>
        <TextInput
          style={gs.input}
          placeholder="Introduce tu correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo de contraseña */}
        <Text style={gs.subHeaderText}>Contraseña</Text>
        <TextInput
          style={gs.input}
          placeholder="Introduce tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Botón de inicio de sesión */}
        <TouchableOpacity style={gs.mainButton} onPress={handleLogin}>
          <Text style={gs.mainButtonText}>Ingresar</Text>
        </TouchableOpacity>

        {/* Botón para registrarse (opcional) */}
        <TouchableOpacity style={gs.secondaryButton}>
          <Text style={gs.secondaryButtonText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
