import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { Vaccine } from "../../../types/Vaccine";
import { Link, useRouter } from "expo-router";

export default function Vaccines() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const router = useRouter();

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  useEffect(() => {
    const fetchVaccines = async (): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/vaccines`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching vaccines");
        }

        const data = await response.json();
        setVaccines(data);
        return true;

      } catch (error) {
        console.error('Error fetching vaccines: ', error);
        return false;
      }
    };

    fetchVaccines();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/vaccine/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Something went wrong removing the vaccine");

      setVaccines(vaccines.filter((vaccine) => vaccine.id !== id));

    } catch (error) {
      console.error('Error deleting the vaccine: ', error);
    }
  }

  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Vacunas</Text>
      <View style={{ gap: 10, marginVertical: 20, alignSelf: "flex-start", alignItems: "center", width: "100%" }}>
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0" }]} href={"/calendar/addVaccine"}>
          <Text style={gs.mainButtonText}>Añade una vacuna</Text>
        </Link>
      </View>
      <ScrollView style={{ maxWidth: 600 }}>
        {vaccines.map((vaccine, index) => {
          return (
            <TouchableOpacity
              key={vaccine.id || index}
              style={gs.card}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>{vaccine.vaccinationDate}</Text>
                  {vaccine.baby?.name &&
                    <Text style={{ fontWeight: 'bold', color: '#1565C0' }}> Bebé: {vaccine.baby.name}</Text>
                  }
                </View>
                
                <Text style={gs.cardContent}>Vacuna: {vaccine.type}</Text>

                

                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <TouchableOpacity
                      style={{ backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5 }}
                      onPress={() => handleDelete(vaccine.id)}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Eliminar</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity 
                      key={index} 
                      onPress={() => router.push(`/calendar/vaccineDetail?vaccineId=${vaccine.id}`)}
                      style={{ backgroundColor: '#1565C0', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5 }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Detalles</Text>
                    </TouchableOpacity>*/}
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