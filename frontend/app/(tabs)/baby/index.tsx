import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";

const jwt = getToken();

export default function BabyInfo() {
  const gs = require("../../../static/styles/globalStyles");
  const [babies, setBabies] = useState([]);
  const router = useRouter();
  const [jwt, setJwt] = useState<string | null>(null);(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      setJwt(token);
    };
    getUserToken();
  },[]) 

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${apiUrl}/api/v1/baby`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        console.log("Response received:", response);
        const text = await response.text();
        console.log("Response body:", text);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${text}`);
        }

        const data = JSON.parse(text);
        console.log("Parsed JSON:", data);
        setBabies(data);
      } catch (error) {
        console.error("Error fetching all recipes:", error);
      }
    };

    fetchBabies();
  }, []);


  const handleEditBaby = (id: number) => {
    router.push(`/baby/edit?id=${id}`);
  };
  
  const handleDeleteBaby = async (id: number) => {
    if (jwt) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/baby/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${jwt}`, 
          },
        });

        if (response.ok) {
          setBabies(babies.filter((baby) => baby.id !== id));
        } else {
          console.error("Error deleting baby:", response.statusText);
        }

      } catch (error) {
        console.error("Error deleting baby:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <Text style={gs.headerText}>Baby Information</Text>
        <Text style={gs.bodyText}>
          View and manage your baby's information
        </Text>

        <View style={{ width: "90%" }}>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 10, alignSelf: "center" }}>
            <Link style={gs.mainButton} href={"/baby/add/"}>
              <Text style={gs.mainButtonText}>Add Baby</Text>
            </Link>
          </View>
        </View>

        <Text style={[gs.subHeaderText, { marginTop: 30 }]}>Your Babies</Text>

        {babies.map((baby) => (
              <View key={baby.id} style={[gs.card, { maxWidth: 500, alignSelf: "center" }]}>
              <Text style={gs.cardTitle}>{baby.name}</Text>
              <Text style={gs.cardContent}>Birth Date: {baby.birthDate}</Text>
              <Text style={gs.cardContent}>Gender: {baby.genre}</Text>
              <Text style={gs.cardContent}>Weight: {baby.weight} kg</Text>
              <Text style={gs.cardContent}>Height: {baby.height} cm</Text>
              <Text style={gs.cardContent}>Cephalic Perimeter: {baby.cephalicPerimeter} cm</Text>
              <Text style={gs.cardContent}>Food Preference: {baby.foodPreference}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity style={gs.mainButton} onPress={() => handleEditBaby(baby.id)}>
                <Text style={gs.mainButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={gs.mainButton} onPress={() => handleDeleteBaby(baby.id)}>
                <Text style={gs.mainButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
