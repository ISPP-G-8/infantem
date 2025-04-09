import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MarketItem } from '../../../types';
import MarketItemComponent from '../../../components/MarketItem';
import { useAuth } from '../../../context/AuthContext';
import Pagination from '../../../components/Pagination';

export default function Marketplace() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();

  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchMarketItems = async (): Promise<boolean> => {
      try {
        // The backend is zero-indexed. Thats the reason behind the -1
        const response = await fetch(`${apiUrl}/api/v1/products?page=${page-1}`, {
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
        setTotalPages(data.totalPages)
        return true;

      } catch (error) {
        console.error('Error fetching recipes: ', error);
        return false;
      }
    };

    fetchMarketItems();
  }, [page]);

  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Tienda</Text>
        <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Compra todos lo que necesites para tu bebé</Text>

      <ScrollView style={{maxWidth:600}}>
        {marketItems.map((item, index) => (
          <MarketItemComponent key={index} item={item} />
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
