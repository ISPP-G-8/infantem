import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { Intake } from "../../../types";
import { Link, useRouter } from "expo-router";

export default function Intakes() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const router = useRouter();

  const [intakes, setIntakes] = useState<Intake[]>([]);

  useEffect(() => {
    const fetchIntakes = async (): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/intake`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching intake");
        } 

        const data = await response.json();
        setIntakes(data);
        return true;

      } catch (error) {
        console.error('Error fetching recipes: ', error);
        return false;
      }
    };

    fetchIntakes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/intake/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Something went wrong removing the intake");

      setIntakes(intakes.filter((intake) => intake.id !== id));

    } catch (error) {
      console.error('Error fetching the delete of intake: ', error);
    }
  }

  return (
    <View style={gs.container}> 
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Ingestas</Text>
      <View style={{ gap: 10, marginVertical: 20, alignSelf: "flex-start", alignItems: "center", width: "100%" }}>
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0" }]} href={"/calendar/intakeDetail"}>
          <Text style={gs.mainButtonText}>Añade una ingesta</Text>
        </Link>
      </View>
      <ScrollView style={{maxWidth: 600}}>
        {intakes.map((intake, index) => {

          // Waiting backend to add the name of the baby
          
          return (
            <TouchableOpacity 
              key={intake.id || index}
              style={gs.card}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>{intake.date}</Text>
                  { intake.baby?.name &&
                    <Text style={{ fontWeight: 'bold', color: '#1565C0' }}> Bebé: {intake.baby.name}</Text>
                  }
                </View>
                <Text style={gs.cardContent} numberOfLines={2}>{intake.observations}</Text>
                <Text style={gs.cardContent}>Cantidad: {intake.quantity}g</Text>
                
                {intake.intakeSymptom && (
                  <View style={{ backgroundColor: '#f5f5f5', padding: 8, borderRadius: 5, marginTop: 8 }}>
                    <Text style={{ fontSize: 14, color: '#555' }}>
                      <Text style={{ fontWeight: 'bold' }}>Síntomas: </Text>
                      {intake.intakeSymptom.description}
                    </Text>
                  </View>
                )}
                
                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                  <View style={{flexDirection: 'row', gap: 6}}>
                    <TouchableOpacity 
                      style={{ backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5 }}
                      onPress={() => handleDelete(intake.id)}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Eliminar</Text>
                    </TouchableOpacity>
                  <TouchableOpacity 
                      key={index} 
                      onPress={() => router.push(`/calendar/intakeDetail?intakeId=${intake.id}`)}
                      style={{ backgroundColor: '#1565C0', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5 }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Detalles</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
