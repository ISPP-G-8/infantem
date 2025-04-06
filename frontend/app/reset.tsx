import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        setError("Token no válido o ausente.");
        return;
      }

      const response = await fetch(`${apiUrl}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al restablecer la contraseña.");
        return;
      }

      setMessage("Contraseña restablecida correctamente.");
      setError("");
      setTimeout(() => navigation.navigate("Login"), 2000); // Redirige al login después de 3 segundos
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setError("Ocurrió un error. Inténtalo de nuevo más tarde.");
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
            Restablecer Contraseña
          </Text>

          <Text
            style={{
                fontSize: 15,
                color: "#1565C0",
                textAlign: "center",
                marginBottom: 15,
            }}
            >
                Ingrese la nueva contraseña para su cuenta
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
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

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
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error ? (
            <Text style={{ color: "red", marginVertical: 10, textAlign: "center" }}>{error}</Text>
          ) : null}

          {message ? (
            <Text style={{ color: "green", marginVertical: 10, textAlign: "center" }}>{message}</Text>
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
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>Restablecer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;