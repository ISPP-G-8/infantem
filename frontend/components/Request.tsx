import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Request } from "../types";
import { Link } from "expo-router";

export default function RequestComponent({ req, nutritionist }: { req: Request, nutritionist: boolean}) {
  const gs = require("../static/styles/globalStyles");
  const { width } = useWindowDimensions();

  function parseDate([year, month, day, hour, minute]: [number, number, number, number, number]): string {
    const pad = (n: number): string => n.toString().padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}`;
  }

  return (
    <View style={[gs.card, width < 500 ? { maxWidth: 400 } : null]}>
      <Text style={[gs.cardContent, {marginBottom: 10}]} numberOfLines={2}>
        <Text style={{fontWeight: 'bold'}}>Usuario: </Text>
        {req.user.username}
      </Text>
      <Text style={[gs.cardContent, {marginBottom: 10}]} numberOfLines={2}>
        <Text style={{fontWeight: 'bold'}}>Descripción: </Text>
        {req.details}
      </Text>
      <Text style={gs.cardContent} numberOfLines={2}>
        <Text style={{fontWeight: 'bold'}}>Fecha de petición: </Text>
        {parseDate(req.createdAt)} {/*Fuck ts sorry. I'm dumb*/}
      </Text>
      
      {nutritionist && (
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0", marginVertical: 20 }]} href={"/recipes/add"}>
          <Text style={gs.mainButtonText}>Añade esta receta</Text>
        </Link>
      )}
    </View>
  );
}
