import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Navbar from "../../components/NavBar";

export default function Page() {
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");

  const gs = require('../../static/styles/globalStyles');

  return (
    <View style={{ flex: 1 }}>
        
        <Navbar />
        
        <ScrollView contentContainerStyle={[gs.container]}> 
            <Text style={gs.headerText}>Registro de Alimento</Text>

            <Text style={gs.subHeaderText}>Nombre del Alimento</Text>
            <TextInput
                style={gs.input}        
                placeholder="Introduce el nombre del alimento"
                value={foodName}
                onChangeText={setFoodName}
            />

            <Text style={gs.subHeaderText}>Tipo de Alimento</Text>
            <Picker
                selectedValue={foodType}
                style={gs.input}
                onValueChange={(itemValue) => setFoodType(itemValue)}
            >
                <Picker.Item label="Fruta" value="fruta" />
                <Picker.Item label="Verdura" value="verdura" />
                <Picker.Item label="Proteína" value="proteina" />
                <Picker.Item label="Carbohidrato" value="carbohidrato" />
            </Picker>

            <TouchableOpacity style={[gs.mainButton]}>
                <Text style={gs.mainButtonText}>Guardar</Text>
            </TouchableOpacity>

            
        
        </ScrollView>
    </View>
    
  );
}