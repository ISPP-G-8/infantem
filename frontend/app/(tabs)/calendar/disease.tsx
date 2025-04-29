import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { Disease } from "../../../types/Disease";

export default function Diseases() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const router = useRouter();

  const [diseases, setDiseases] = useState<Disease[]>([]);

  useEffect(() => {
    const fetchDiseases = async (): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/disease`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching diseases");
        }

        const data = await response.json();
        setDiseases(data);
        return true;

      } catch (error) {
        console.error('Error fetching diseases: ', error);
        return false;
      }
    };

    fetchDiseases();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/disease/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Something went wrong removing the disease");

      setDiseases(diseases.filter((disease) => disease.id !== id));

    } catch (error) {
      console.error('Error deleting the disease: ', error);
    }
  }

  return (
    <View style={gs.container}> 
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Enfermedades</Text>
      <View style={{ gap: 10, marginVertical: 20, alignSelf: "flex-start", alignItems: "center", width: "100%" }}>
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0" }]} href={"/calendar/addDisease"}>
          <Text style={gs.mainButtonText}>Añade una enfermedad</Text>
        </Link>
      </View>
      <ScrollView style={{ maxWidth: 600 }}>
        {diseases.map((disease, index) => {
          return (
            <TouchableOpacity 
              key={disease.id || index}
              style={gs.card}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>{disease.date}</Text>
                  { disease.baby?.name &&
                    <Text style={{ fontWeight: 'bold', color: '#1565C0' }}> Bebé: {disease.baby.name}</Text>
                  }
                </View>
                <Text style={gs.cardContent} numberOfLines={2}>{disease.name}</Text>
                
                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <TouchableOpacity 
                      style={{ backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5 }}
                      onPress={() => handleDelete(disease.id)}
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