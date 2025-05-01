import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { Sleep } from "../../../types/Sleep"; // Ajuste en la importación
import { Link, useRouter } from "expo-router";

export default function Sleeps() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token, user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  const [sleeps, setSleep] = useState<Sleep[]>([]);

  const dreamTypeLabels: { [key: string]: string } = {
    DEEP: "Sueño profundo",
    LIGHT: "Sueño ligero",
    REM: "REM",
    AGITATED: "Agitado",
  };

  useEffect(() => {
    const fetchSleep = async (): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/dream`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching sleep entries");
        }

        const data = await response.json();

        // Filtrar sueños por bebés del usuario autenticado
      
        setSleep(data);
        return true;

      } catch (error) {
        console.error('Error fetching sleep entries: ', error);
        return false;
      }
    };

    fetchSleep();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/dream/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Something went wrong removing the sleep entry");

      setSleep(sleeps.filter((sleep) => sleep.id !== id));

    } catch (error) {
      console.error('Error deleting the sleep entry: ', error);
    }
  }

  return (
    <View style={gs.container}> 
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Tramos de Sueño</Text>
      <View style={{ gap: 10, marginVertical: 20, alignSelf: "flex-start", alignItems: "center", width: "100%" }}>
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0" }]} href={"/calendar/addSleep"}>
          <Text style={gs.mainButtonText}>Añade un tramo de sueño</Text>
        </Link>
      </View>
      <ScrollView style={{ maxWidth: 600 }}>
        {sleeps.map((sleep, index) => {
          return (
            <TouchableOpacity 
              key={sleep.id || index}
              style={gs.card}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>
                    Inicio: {sleep.dateStart}
                  </Text>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>
                    Fin: {sleep.dateEnd}
                  </Text>
                  {sleep.baby?.name && (
                  <Text style={{ fontWeight: 'bold', color: '#1565C0'}}>
                    Bebé: {sleep.baby.name}
                  </Text>
                )}
                </View>
                
                <Text style={gs.cardContent}>Despertares: {sleep.numWakeups}</Text>
                <Text style={gs.cardContent}>
                  Tipo de sueño: {dreamTypeLabels[sleep.dreamType] || "Desconocido"}
                </Text>
                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <TouchableOpacity 
                      style={{ backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5 }}
                      onPress={() => handleDelete(sleep.id)}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Eliminar</Text>
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
