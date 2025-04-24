import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

export default function CreateRequest() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();

  const [details, setDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    if (!details) {
      setErrorMessage("Es obligatorio rellenar los detalles.");
      return;
    }

    if (errorMessage) 
      return;

    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/custom-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({'details': details})
      });
      
      if (!response.ok) {
        setErrorMessage('Error al guardar la ingesta');
        throw new Error('Error al guardar la ingesta');
      }

      setDetails('');
      router.replace("customRecipes/requests");

    } catch (error) {
      console.error('Error saving intake:', error);
    }
  };

  const handleCancel = () => {
    setDetails('');
    router.replace("customRecipes/requests");
  };
  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Solicitud de recetas</Text>
      <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Crea las recetas para las solicitudes de los usuarios</Text>


          <View style={[gs.card, { alignItems: "center", justifyContent: "center", marginBottom: 19, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
            
            
            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Detalles de la petición</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, textAlignVertical: "top", width:"80%", minHeight:100}]} 
              placeholder="Detalles"
              value={details}
              onChangeText={(text) => (setDetails(text))}
            />

          {errorMessage&& <Text style={{ color: "red", alignSelf: 'flex-start', marginLeft: '10%' }}>{errorMessage}</Text>}

            <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSave}>
              <Text style={gs.mainButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red", marginTop: 10 }]} onPress={handleCancel}>
              <Text style={gs.mainButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
}
