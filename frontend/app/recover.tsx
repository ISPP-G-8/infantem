import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useAuth } from "../context/AuthContext";

const Recover: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/recover-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setErrorMessage("Algo salió mal. Por favor, verifica tu correo.");
        return;
      }

      setMessage("Si el correo está registrado, se ha enviado un enlace para restablecer la contraseña.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar la solicitud de recuperación:", error);
      setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View
        style={[
          gs.container,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E3F2FD",
            flex: 1,
            paddingVertical: 40,
          },
        ]}
      >
        <Image
          source={require("../static/images/profile.webp")}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />

        <View
          style={[
            gs.card,
            {
              maxWidth: 400,
              width: "90%",
              padding: 25,
              borderRadius: 15,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 5,
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1565C0",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Recuperar Contraseña
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#1565C0",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Ingresa tu correo electrónico para recibir un enlace de recuperación.
          </Text>

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                marginBottom: 10,
                opacity: 0.6,
              },
            ]}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {message ? (
            <Text style={{ color: "green", marginVertical: 10, textAlign: "center" }}>{message}</Text>
          ) : null}

          {errorMessage ? (
            <Text style={{ color: "red", marginVertical: 10, textAlign: "center" }}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#1565C0",
              padding: 14,
              borderRadius: 8,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 3,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Recover;