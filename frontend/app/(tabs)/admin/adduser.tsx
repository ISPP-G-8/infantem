import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAuth } from "../../../context/AuthContext";
import { router } from "expo-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [code] = useState(111);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");

  const { token } = useAuth();

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    surname: false,
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [fontsLoaded] = useFonts({
    "Loubag-Regular": require("../../../assets/fonts/Loubag-Regular.ttf"),
    "Loubag-Medium": require("../../../assets/fonts/Loubag-Medium.ttf"),
    "Loubag-Bold": require("../../../assets/fonts/Loubag-Bold.ttf"),
    "Loubag-Light": require("../../../assets/fonts/Loubag-Light.ttf"),
  });

  const validEmail = (email: string) => {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return true;
    }
    return false;
  };

  const validPassword = (password: string) => {
    if (password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    const newFieldErrors = {
      name: !name,
      surname: !surname,
      username: !username,
      email: !email,
      password: !password,
      repeatPassword: !repeatPassword,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some(Boolean)) {
      setErrorMessage("Debes rellenar todos los campos.");
      return;
    }

    if (!validEmail(email)) {
      setFieldErrors((prev) => ({ ...prev, email: true }));
      setErrorMessage("El email no es válido.");
      return;
    }

    if (name.length < 3) {
      setFieldErrors((prev) => ({ ...prev, name: true }));
      setErrorMessage("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (surname.length < 3) {
      setFieldErrors((prev) => ({ ...prev, surname: true }));
      setErrorMessage("El apellido debe tener al menos 3 caracteres.");
      return;
    }

    if (username.length < 3) {
      setFieldErrors((prev) => ({ ...prev, username: true }));
      setErrorMessage("Tu nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (!validPassword(password)) {
      setFieldErrors((prev) => ({ ...prev, password: true }));
      setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
      );
      return;
    }

    if (password !== repeatPassword) {
      setFieldErrors((prev) => ({ ...prev, repeatPassword: true }));
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/admin/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          surname,
          username,
          email,
          password,
          code,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar el usuario.");
        return;
      }
      router.push("/admin");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error al registrar el usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
          source={require("../../../static/images/profile.webp")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 20,
          }}
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
            Añadir nuevo usuario
          </Text>

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: fieldErrors.name ? "red" : "#1565C0",
                opacity: 0.6,
                width: "90%",
                alignSelf: "center",
              },
            ]}
            placeholder="Nombre"
            placeholderTextColor={fieldErrors.name ? "red" : "#999"}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setFieldErrors((prev) => ({ ...prev, name: false }));
            }}
          />
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: fieldErrors.surname ? "red" : "#1565C0",
                opacity: 0.6,
                width: "90%",
                alignSelf: "center",
              },
            ]}
            placeholder="Apellido"
            placeholderTextColor={fieldErrors.surname ? "red" : "#999"}
            value={surname}
            onChangeText={(text) => {
              setSurname(text);
              setFieldErrors((prev) => ({ ...prev, surname: false }));
            }}
          />
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: fieldErrors.username ? "red" : "#1565C0",
                opacity: 0.6,
                width: "90%",
                alignSelf: "center",
              },
            ]}
            placeholder="Nombre de usuario"
            placeholderTextColor={fieldErrors.username ? "red" : "#999"}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setFieldErrors((prev) => ({ ...prev, username: false }));
            }}
            autoCapitalize="none"
          />

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: fieldErrors.email ? "red" : "#1565C0",
                opacity: 0.6,
                width: "90%",
                alignSelf: "center",
              },
            ]}
            placeholder="Email"
            placeholderTextColor={fieldErrors.email ? "red" : "#999"}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setFieldErrors((prev) => ({ ...prev, email: false }));
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                gs.input,
                {
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: fieldErrors.password ? "red" : "#1565C0",
                  opacity: 0.6,
                  width: "90%",
                  alignSelf: "center",
                },
              ]}
              placeholder="Contraseña"
              placeholderTextColor={fieldErrors.password ? "red" : "#999"}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setFieldErrors((prev) => ({ ...prev, password: false }));
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 30, top: 22 }}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#1565C0"
              />
            </TouchableOpacity>
          </View>

          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                gs.input,
                {
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: fieldErrors.repeatPassword ? "red" : "#1565C0",
                  opacity: 0.6,
                  width: "90%",
                  alignSelf: "center",
                },
              ]}
              placeholder="Repite la contraseña"
              placeholderTextColor={fieldErrors.repeatPassword ? "red" : "#999"}
              value={repeatPassword}
              onChangeText={(text) => {
                setRepeatPassword(text);
                setFieldErrors((prev) => ({
                  ...prev,
                  repeatPassword: false,
                }));
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 30, top: 22 }}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#1565C0"
              />
            </TouchableOpacity>
          </View>

          {errorMessage ? (
            <Text
              style={{
                color: "red",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              {errorMessage}
            </Text>
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
            <Text
              style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
            >
              Registrar nuevo usuario
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
