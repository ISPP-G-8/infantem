import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { storeToken } from "../utils/jwtStorage";

export default function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    try {
      const signupResponse= await fetch(`${apiUrl}/api/v1/auth/signup`, {
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

      // If we reach here the signup was successful. Then we can signin. 
      // I'm not sure if there is a cleaner way. Gotta think about it.
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
    <View style={[gs.container, { justifyContent: "center" }]}>
      <Text style={gs.headerText}>Registrarse</Text>
      <Image
        source={require("../static/images/profile.webp")}
        style={[gs.profileImage, { marginBottom: 20 }]}
      />

      <View style={[gs.card, { maxWidth: 400 }]}>
        <Text style={{ fontWeight: "bold" }}>Nombre</Text>
        <TextInput
          style={gs.input}
          placeholder="Juan"
          value={name}
          onChangeText={setName}
        />

        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Apellido</Text>
        <TextInput
          style={gs.input}
          placeholder="Pérez"
          value={surname}
          onChangeText={setSurname}
        />

        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>
          Nombre de usuario
        </Text>
        <TextInput
          style={gs.input}
          placeholder="juanperez1234"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Email</Text>
        <TextInput
          style={gs.input}
          placeholder="correo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>
          Contraseña
        </Text>
        <TextInput
          style={gs.input}
          placeholder="contraseña1234"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage && (
          <Text style={{ color: "red", marginVertical: 10 }}>
            {errorMessage}
          </Text>
        )} <Link href={"/signin"}>
          <Text style={{ color: "#007AFF", marginTop: 10 }}>
            ¿Ya tienes cuenta? ¡Inicia sesión!
          </Text>
        </Link>

        <TouchableOpacity
          style={[gs.mainButton, { marginTop: 20 }]}
          onPress={handleSubmit}
        >
          <Text style={gs.mainButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
