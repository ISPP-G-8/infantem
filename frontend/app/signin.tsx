import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { storeToken } from "../utils/jwtStorage";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("API URL:", apiUrl);

  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        // I asked backend to implement the Bad credential error as a JSON. Waiting for that
        setErrorMessage("Algo no ha ido bien");
        return;
      }

      const data = await response.json();
      await storeToken(data.token);
      router.push("/recipes");

    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };

  return (
    <View style={[gs.container, { justifyContent: "center" }]}>
      <Text style={gs.headerText}>Iniciar Sesión</Text>
      <Image source={require("../static/images/profile.webp")} style={[gs.profileImage, { marginBottom: 20 }]} />

      <View style={[gs.card, { maxWidth: 400 }]}>
        <Text style={{ fontWeight: "bold" }}>Nombre de usuario</Text>
        <TextInput
          style={gs.input}
          placeholder="juanperez1234"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Contraseña</Text>
        <TextInput
          style={gs.input}
          placeholder="contraseña1234"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage && <Text style={{ color: "red", marginVertical: 10 }}>{errorMessage}</Text>}

        <Link href={"/signup"}>
          <Text style={{ color: "#007AFF" }}>¿No tienes cuenta? ¡Regístrate!</Text>
        </Link>

        <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSubmit}>
          <Text style={gs.mainButtonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}
