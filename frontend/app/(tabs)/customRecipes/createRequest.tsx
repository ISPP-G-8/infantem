import { useEffect, useState } from "react";
import { Request } from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import { Text, View } from "react-native";


export default function CreateRequest() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();

  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Solicitud de recetas</Text>
      <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Crea las recetas para las solicitudes de los usuarios</Text>


    </View>
  );
}
