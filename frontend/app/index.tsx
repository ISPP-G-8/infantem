import { Link, Redirect } from "expo-router";
import { View, Text, ImageBackground, Image } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  const gs = require("../static/styles/globalStyles");

  if (isAuthenticated)
    return <Redirect href="recipes" />

  return (
    <ImageBackground
      source={require("../static/images/Background.png")}
      style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <View style={[gs.container, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: "transparent", width: "100%" }]}>

        <View style={{ flex: 1, padding: 20 }}>

          <Text style={{ color: "#1565C0", fontSize: 60, fontWeight: "bold", textAlign: "left", width: 500 }}>
            <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>INFANTEM</Text>
          </Text>
          <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "left", width: "100%" }}>
            El mejor cuidado <Text style={{ fontStyle: "italic" }}>para tu bebé</Text>
          </Text>

          <Text style={{ color: "#1565C0", fontSize: 20, textAlign: "left", marginTop: 20 }}>
            <Text style={{ fontStyle: "italic" }}>Recomendaciones Personalizadas</Text>
          </Text>
          <Text style={{ color: "#1565C0", fontSize: 20, textAlign: "left", marginTop: 5 }}>
            <Text style={{ fontStyle: "italic" }}>Validado por Expertos</Text>
          </Text>
          <Text style={{ color: "#1565C0", fontSize: 20, textAlign: "left", marginTop: 5 }}>
            <Text style={{ fontStyle: "italic" }}>Contenido actualizado</Text>
          </Text>
          <Text style={{ color: "#1565C0", fontSize: 20, textAlign: "left", marginTop: 5 }}>
            <Text style={{ fontStyle: "italic" }}>Acceso rápido y sencillo</Text>
          </Text>

          <View style={{ marginTop: 20, gap: 10 }}>
            <Link style={[gs.mainButton, { width: 150, backgroundColor: "#1565C0", padding: 12, borderRadius: 8, alignItems: "center" }]} href={"/signin"}>
              <Text style={[gs.mainButtonText, { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }]}>
                Inicia sesión
              </Text>
            </Link>

            <Link style={[gs.secondaryButton, { width: 250, backgroundColor: "#E3F2FD", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", alignItems: "center" }]} href={"/signup"}>
              <Text style={[gs.secondaryButtonText, { color: "#1565C0", fontSize: 16, fontWeight: "bold" }]}>
                ¿No tienes cuenta? Únete
              </Text>
            </Link>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Image
            source={require("../static/images/food.png")}
            style={{ width: "115%", resizeMode: "cover", borderTopLeftRadius: 200, borderBottomLeftRadius: 200 }}
          />
        </View>

      </View>

    </ImageBackground>
  );
}