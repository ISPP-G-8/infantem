import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { storeToken } from "../utils/jwtStorage";
import { Ionicons } from "@expo/vector-icons"; // Importamos iconos de Expo

export default function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    try {
      const signupResponse = await fetch(`${apiUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!signupResponse.ok) {
        setErrorMessage("Algo no ha ido bien.");
        return;
      }

      // Autologin después del registro
      const signinResponse = await fetch(`${apiUrl}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, 
          password: password,
        }),
      });

      if (!signinResponse.ok) {
        setErrorMessage("Algo no ha ido bien");
        return;
      }

      const data = await signinResponse.json();
      await storeToken(data.token);
      router.push("/recipes");

    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[gs.container, { justifyContent: "center", alignItems: "center", backgroundColor: "#E3F2FD", flex: 1, paddingVertical: 40 }]}>
        
        <Image source={require("../static/images/profile.webp")} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />

        <View style={[gs.card, { maxWidth: 400, width: "90%", padding: 25, borderRadius: 15, backgroundColor: "white", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
          
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1565C0", textAlign: "center", marginBottom: 15 }}>
            Regístrate
          </Text>

          <TextInput 
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.6}]}
            placeholder="Nombre" value={name} onChangeText={setName} />
          <TextInput 
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.6}]}
            placeholder="Apellido" value={surname} onChangeText={setSurname} />
          <TextInput 
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.6}]}
            placeholder="Nombre de usuario" value={username} onChangeText={setUsername} autoCapitalize="none" />
          <TextInput 
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.6}]}
            placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

          <View style={{ position: "relative" }}>
            <TextInput
            style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0" , opacity:0.6}]}
            placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Alternar visibilidad
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 50, top: 20 }} // Icono alineado
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#1565C0" />
            </TouchableOpacity>
          </View>

          {errorMessage ? <Text style={{ color: "red", marginVertical: 10, textAlign: "center" }}>{errorMessage}</Text> : null}

          <Link href={"/signin"} style={{ marginTop: 10, textAlign: "center" }}>
            <Text style={{ color: "#007AFF", fontSize: 14 }}>¿Ya tienes cuenta? ¡Inicia sesión!</Text>
          </Link>

          <TouchableOpacity 
            style={{ marginTop: 20, backgroundColor: "#1565C0", padding: 14, borderRadius: 8, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>Registrarse</Text>
          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
}
