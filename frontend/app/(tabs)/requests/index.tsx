import { useEffect, useState } from "react";
import { Request } from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import { ScrollView, Text, View } from "react-native";
import Pagination from "../../../components/Pagination";
import RequestComponent from "../../../components/Request";
import { Link } from "expo-router";


export default function requests() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token, user } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchRequests = async (): Promise<boolean> => {
      try {
        // The backend is zero-indexed. Thats the reason behind the -1
        const url = user?.role === 'nutritionist'  ? `${apiUrl}/api/v1/recipes/custom-requests?page=${page-1}`
          : `${apiUrl}/api/v1/recipes/custom-requests/user?page=${page-1}`

        const response = await fetch(url, {
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

  const handleDelete = async (id: number): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/recipes/custom-requests/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) 
          throw new Error("Error deleting the request");

        setRequests(requests.filter((req) => req.id !== id));
        return true;

      } catch (error) {
        console.error('Error deleting the request', error);
        return false;
      }
    };
    
  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Solicitudes de recetas</Text>
      <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>¡Recetas personalizadas para los usuarios premium!</Text>

      {user?.role === 'premium' && (
        <Link style={[gs.mainButton, { backgroundColor: "#1565C0", marginVertical: 20 }]} href={"/requests/ask"}>
          <Text style={gs.mainButtonText}>Crear solicitud</Text>
        </Link>
      )}

      <ScrollView style={{maxWidth:600}}>
        {requests.map((req) => (
          <RequestComponent key={req.id} req={req} nutritionist={user?.role==='nutritionist'} handleDelete={() => handleDelete(req.id)}/>
        ))}
      </ScrollView>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages} 
          page={page} 
          setPage={setPage} 
        />
      )}

    </View>
  );
}
