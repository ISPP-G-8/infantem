import { useEffect, useState } from "react";
import { Request } from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Pagination from "../../../components/Pagination";


export default function requests() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();

  // const [requests, setRequests] = useState<Request[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchRequests = async (): Promise<boolean> => {
      try {
        // The backend is zero-indexed. Thats the reason behind the -1
        const response = await fetch(`${apiUrl}/api/v1/recipes/custom-requests?page=${page-1}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching requests");
        } 

        const data = await response.json();
        // setRequests(data.content);
        setTotalPages(data.totalPages)
        return true;

      } catch (error) {
        console.error('Error fetching requests: ', error);
        return false;
      }
    };

    fetchRequests();
  }, [page]);

  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Tus solicitudes de recetas</Text>
      <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Pide aquellas recetas personalizadas que quieras</Text>

    </View>
  );
}
