import React from "react";
import { Text, View, TouchableOpacity, Image, Linking, useWindowDimensions } from "react-native";
import { MarketItem } from "../types";

export default function MarketItemComponent({ item }: { item: MarketItem }) {
  const gs = require("../static/styles/globalStyles");
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity style={[gs.card, width < 500 ? { maxWidth: 400 } : null]}>
      <View style={gs.row}>
      { item.imageUrl && (
        <View style={{ marginRight: 20 }}>
          <Image 
            source={{ uri: item.imageUrl }} 
            resizeMode="cover"
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
      )  }
        
        <View style={{ flex: 1 }}>
          <Text style={gs.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={gs.cardContent} numberOfLines={2}>{item.description}</Text>
          <TouchableOpacity 
            style={[gs.mainButton, {marginTop: 10}]} 
            onPress={() => Linking.openURL(item.shopUrl)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Comprar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
  );
}
