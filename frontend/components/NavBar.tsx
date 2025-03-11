import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useRouter, Link } from "expo-router";

const NavBar: React.FC = () => {
  const router = useRouter(); 
  const gs = require('../static/styles/globalStyles');

  return (
    <View style={gs.navBar}>
      {}

      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image source={require("../static/images/profile.webp")} style={gs.navBarImage} />
        </TouchableOpacity>

        <Link href="/recipes/recipeRecommendations" asChild>
          <TouchableOpacity>
            <Text style={gs.navText}>Recipes</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/food" asChild>
          <TouchableOpacity>
            <Text style={gs.navText}>Alimentos</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/alergenos/alergenos" asChild>
          <TouchableOpacity>
            <Text style={gs.navText}>Alergenos</Text>
          </TouchableOpacity>
        </Link>

      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <Link href="/auth/ProfileScreen" asChild>
          <TouchableOpacity>
            <Text style={gs.navText}>Perfil</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/auth/LoginScreen" asChild>
          <TouchableOpacity>
            <Text style={gs.navText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>

    
  );
};

export default NavBar;