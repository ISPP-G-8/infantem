import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../context/AuthContext';
import { router } from 'expo-router';

export default function AddVaccine() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const { width } = useWindowDimensions();
  const cardWidth = width < 500 ? 350 : 600;

  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
  const [vaccineName, setVaccineName] = useState<string>('');
  const [vaccineDate, setVaccineDate] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ vaccineDate?: string }>({});

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

  const validateDate = (dateString: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return "La fecha debe tener el formato yyyy-MM-dd";
    }

    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      return "La fecha ingresada no es válida";
    }

    if (parsedDate > new Date()) {
      return "La fecha no puede ser futura";
    }

    return null;
  };

  const addVaccineData = async () => {
    const dateError = validateDate(vaccineDate);
    if (dateError) {
      setFormErrors({ vaccineDate: dateError });
      return;
    } else {
      setFormErrors({});
    }

    if (!selectedBaby || !vaccineName || !vaccineDate) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    setLoading(true);

    try {
      const vaccineToSave = {
        type: vaccineName,
        vaccinationDate: vaccineDate,
        baby: { id: selectedBaby },
      };

      const response = await fetch(`${apiUrl}/api/v1/vaccines`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaccineToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la vacuna');
      }

      Alert.alert('Éxito', 'Vacuna registrada correctamente.');
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
        Añadir Vacuna
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
        

        <Text style={labelStyle}>Nombre de la vacuna:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="Ej. Varicela"
          value={vaccineName}
          onChangeText={setVaccineName}
        />

        <Text style={labelStyle}>Fecha de la vacuna:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="AAAA-MM-dd"
          value={vaccineDate}
          onChangeText={setVaccineDate}
        />
        {formErrors.vaccineDate && (
          <Text style={{ color: 'red', marginTop: 5 }}>{formErrors.vaccineDate}</Text>
        )}

        <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={addVaccineData}>
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



