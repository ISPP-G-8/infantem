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

  let statusLabel = req.status;
  let statusColor = "#9E9E9E"; 

  if (req.status === "OPEN") {
    statusLabel = "ABIERTA";
    statusColor = "#2196F3"; // Azul
  } else if (req.status === "CLOSED") {
    statusLabel = "CERRADA";
    statusColor = "#F44336"; // Rojo
  } else if (req.status === "IN_PROGRESS") {
    statusLabel = "EN PROGRESO";
    statusColor = "#4CAF50"; // Verde
  }


  return (
    <View style={[gs.card, width < 500 ? { maxWidth: 400 } : null]}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={[gs.cardContent, {marginBottom: 10}]} numberOfLines={2}>
          <Text style={{fontWeight: 'bold'}}>Usuario: </Text>
          {req.user.username}
        </Text>
        <View style={{backgroundColor: statusColor, paddingHorizontal: 8,paddingVertical: 4, borderRadius: 4,alignSelf: "flex-start",marginBottom: 10}}>
          <Text style={[{ color: "white"}]} numberOfLines={1}>
          {statusLabel}
          </Text>
        </View>
      </View>

      <Text style={[gs.cardContent, {marginBottom: 10}]} numberOfLines={2}>
        <Text style={{fontWeight: 'bold'}}>Descripción: </Text>
        {req.details}
      </Text>
      <Text style={[gs.cardContent, {marginBottom: 10}]} numberOfLines={2}>
        <Text style={{fontWeight: 'bold'}}>Fecha de petición: </Text>
        {parseDate(req.createdAt)} {/*Fuck ts sorry. I'm dumb*/}
      </Text>


      <Text style={[gs.cardContent, {marginTop: 10, textAlign: "center"}]} numberOfLines={2}>
        <Text style={{fontWeight: 'bold'}}>Bebés</Text>
      </Text>
      <View style={gs.cardContent}> 
        {req.user.babies.map((baby) => {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>{baby.name}</Text>
              <Text style={[gs.cardContent, {marginLeft: 10, marginBottom: 10}]} numberOfLines={2}>
                <Text style={{fontWeight: 'bold'}}>Alergias: </Text>
                {baby.allergies}
              </Text>
              <Text style={[gs.cardContent, {marginLeft: 10, marginBottom: 10}]} numberOfLines={2}>
                <Text style={{fontWeight: 'bold'}}>Alimento preferido: </Text>
                {baby.foodPreference}
              </Text>

            </View>
          )
        })}
      </View>

      {nutritionist && req.status === "OPEN" && (
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0", marginVertical: 10 }]} href={`/recipes/add?requestId=${req.id}&requestUserId=${req.user.id}`}>
          <Text style={gs.mainButtonText}>Añade esta receta</Text>
        </Link>
      )}


    </View>
  );
}
