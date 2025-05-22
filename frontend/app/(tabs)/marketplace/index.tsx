import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MarketItem } from '../../../types';
import MarketItemComponent from '../../../components/MarketItem';
import { useAuth } from '../../../context/AuthContext';
import Pagination from '../../../components/Pagination';
import { useWindowDimensions } from "react-native";

export default function Marketplace() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const { width } = useWindowDimensions();
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchMarketItems = async (): Promise<boolean> => {
      try {
        // The backend is zero-indexed. Thats the reason behind the -1
        const response = await fetch(`${apiUrl}/api/v1/products?page=${page - 1}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching subscription");
        }

        const data = await response.json();
        setMarketItems(data.content);
        setTotalPages(data.totalPages);
        return true;

      } catch (error) {
        console.error('Error fetching recipes: ', error);
        return false;
      }
    };

    fetchMarketItems();
  }, [page]);

  return (
    <ScrollView contentContainerStyle={{ padding: 0, paddingBottom: 0 }}>

      <View style={[gs.container, { paddingTop: 60, paddingHorizontal: 20, backgroundColor: "#E3F2FD" }]}>

        {/* Título */}
        <Text style={{
          color: "#1565C0",
          fontSize: 36,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}>
          Tienda
        </Text>

        {/* Subtítulo */}
        <Text style={{
          fontSize: 16,
          color: "#1565C0",
          textAlign: "center",
          marginBottom: 24,
        }}>
          Compra todo lo que necesites para tu bebé
        </Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 24,
            borderRadius: 16,
            maxWidth: 1200,
            width: "100%",
            alignSelf: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >


          {/* Lista de productos en grid responsivo */}
          <View
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
            }}
          >
            {marketItems.map((item, index) => (
              
                <MarketItemComponent item={item} />
              
            ))}
          </View>

          {/* Paginación */}
          {totalPages && (
            <View style={{ marginTop: 30 }}>
              <Pagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>

  );
}
