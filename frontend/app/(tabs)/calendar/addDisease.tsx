import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../context/AuthContext';
import { router } from 'expo-router';

export default function AddDisease() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const { width } = useWindowDimensions();
  const cardWidth = width < 500 ? 350 : 600;

  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [extraObservations, setExtraObservations] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBabies = async () => {
      if (!apiUrl) {
        Alert.alert("Error", "API URL no configurado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/v1/baby`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de los bebés');
        }

        const data = await response.json();
        setBabies(data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos de los bebés.");
      } finally {
        setLoading(false);
      }
    };

    fetchBabies();
  }, [token]);

  const handleSaveDisease = async () => {
    if (!selectedBaby || !diseaseName || !startDate || !endDate || !symptoms) {
      setErrorMessage("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setErrorMessage('');
    setLoading(true);

    const diseaseToSave = {
      name: diseaseName,
      startDate,
      endDate,
      symptoms,
      extraObservations,
      baby: { id: selectedBaby },
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/disease`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diseaseToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la enfermedad');
      }

      Alert.alert('Éxito', 'Enfermedad registrada correctamente.');
      router.push("/calendar");
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[gs.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00adf5" />
      </View>
    );
  }

  return (
    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        Añadir Enfermedad
      </Text>
      <ScrollView contentContainerStyle={[gs.card, { width: cardWidth, alignItems: "center", justifyContent: "center", marginBottom: 19, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
        <Text style={labelStyle}>Bebé:</Text>
          <Picker
            selectedValue={selectedBaby}
            onValueChange={(itemValue) => setSelectedBaby(itemValue)}
            style={[gs.input, { width: "80%" }]}
          >
            <Picker.Item label="Selecciona un bebé" value={null} />
            {babies.map((baby: any) => (
              <Picker.Item key={baby.id} label={baby.name} value={baby.id} />
            ))}
          </Picker>
        

        <Text style={labelStyle}>Nombre de la enfermedad:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="Ej. Gripe"
          value={diseaseName}
          onChangeText={setDiseaseName}
        />

        <Text style={labelStyle}>Fecha de inicio:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="AAAA-MM-dd"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Text style={labelStyle}>Fecha de fin:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="AAAA-MM-dd"
          value={endDate}
          onChangeText={setEndDate}
        />

        <Text style={labelStyle}>Síntomas:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="Ej. Fiebre, erupción..."
          value={symptoms}
          onChangeText={setSymptoms}
        />

        <Text style={labelStyle}>Observaciones adicionales:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="Opcional"
          value={extraObservations}
          onChangeText={setExtraObservations}
        />

        {errorMessage && <Text style={{ color: "red", alignSelf: 'flex-start', marginLeft: '10%' }}>{errorMessage}</Text>}

        <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSaveDisease}>
          <Text style={gs.mainButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const labelStyle = {
  alignSelf: 'flex-start',
  marginLeft: '10%',
  color: '#1565C0',
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 5
};
