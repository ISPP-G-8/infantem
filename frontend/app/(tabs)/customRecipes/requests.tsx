import { useEffect, useState } from "react";
import { Request } from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Pagination from "../../../components/Pagination";


export default function requests() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { width } = useWindowDimensions();
  const { token } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);
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
        setRequests(data.content);
        setTotalPages(data.totalPages)
        return true;

      } catch (error) {
        console.error('Error fetching requests: ', error);
        return false;
      }
    };

    fetchRequests();
  }, [page]);

  function parseDate([year, month, day, hour, minute]: [number, number, number, number, number]): string {
    const pad = (n: number): string => n.toString().padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}`;
  }


  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Solicitudes de recetas</Text>
      <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Crea las recetas para las solicitudes de los usuarios</Text>

      <ScrollView style={{maxWidth:600}}>
        {requests.map((req) => (
          <TouchableOpacity style={[gs.card, width < 500 ? { maxWidth: 400 } : null]}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>

      {totalPages && (
        <Pagination
          totalPages={totalPages} 
          page={page} 
          setPage={setPage} 
        />
      )}

    </View>
  );
}
