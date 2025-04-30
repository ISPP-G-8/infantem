import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { format } from 'date-fns';
import { Baby } from '../../../types/Baby';
import { Sleep } from '../../../types/Sleep';

const gs = require("../../../static/styles/globalStyles");

export default function AddSleep() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { token } = useAuth();
  const { width } = useWindowDimensions();
  const cardWidth = width < 500 ? 350 : 600;

  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [sleepData, setSleepData] = useState<Sleep>({
    dateStart: '',
    dateEnd: '',
    numWakeups: 0,
    dreamType: null,
    baby: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBabies = async () => {
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
        Alert.alert('Error', 'No se pudieron cargar los datos de los bebés.');
      } finally {
        setLoading(false);
      }
    };

    fetchBabies();
  }, [token]);

  const validateDate = (dateString: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return "La fecha debe tener el formato yyyy-MM-dd HH:mm";
    }

    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      return "La fecha ingresada no es válida";
    }

    return null;
  };

  const addSleepData = async () => {
    const startDateError = validateDate(sleepData.dateStart);
    const endDateError = validateDate(sleepData.dateEnd);

    if (startDateError || endDateError) {
      setErrorMessage(startDateError || endDateError);
      return;
    }

    if (!sleepData.baby || !sleepData.dreamType) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const formattedDateStart = format(new Date(sleepData.dateStart), "yyyy-MM-dd'T'HH:mm");
      const formattedDateEnd = format(new Date(sleepData.dateEnd), "yyyy-MM-dd'T'HH:mm");

      const response = await fetch(`${apiUrl}/api/v1/dream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...sleepData,
          baby: { id: sleepData.baby },
          dateStart: formattedDateStart,
          dateEnd: formattedDateEnd,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar los datos del sueño');
      }

      Alert.alert('Éxito', 'Datos del sueño guardados correctamente.');
      router.push('/calendar');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar los datos del sueño.');
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
        Añadir Sueño
      </Text>
      <ScrollView contentContainerStyle={[gs.card, { width: cardWidth, alignItems: "center", justifyContent: "center", marginBottom: 19, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
        <Text style={labelStyle}>Bebé:</Text>
        <Picker
          selectedValue={sleepData.baby}
          onValueChange={(babyId) => setSleepData((prev) => ({ ...prev, baby: babyId }))}
          style={[gs.input, { width: "80%" }]}
        >
          <Picker.Item label="Selecciona un bebé" value={null} />
          {babies.map((baby) => (
            <Picker.Item key={baby.id} label={baby.name} value={baby.id} />
          ))}
        </Picker>

        <Text style={labelStyle}>Hora de inicio:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="AAAA-MM-dd HH:mm"
          value={sleepData.dateStart}
          onChangeText={(text) => setSleepData((prev) => ({ ...prev, dateStart: text }))}
        />

        <Text style={labelStyle}>Hora de fin:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="AAAA-MM-dd HH:mm"
          value={sleepData.dateEnd}
          onChangeText={(text) => setSleepData((prev) => ({ ...prev, dateEnd: text }))}
        />

        <Text style={labelStyle}>Número de despertares:</Text>
        <TextInput
          style={[gs.input, { width: "80%" }]}
          placeholder="Ej. 3"
          keyboardType="numeric"
          value={sleepData.numWakeups.toString()}
          onChangeText={(text) => setSleepData((prev) => ({ ...prev, numWakeups: parseInt(text, 10) || 0 }))}
        />

        <Text style={labelStyle}>Tipo de sueño:</Text>
        <Picker
          selectedValue={sleepData.dreamType}
          onValueChange={(itemValue) => setSleepData((prev) => ({ ...prev, dreamType: itemValue }))}
          style={[gs.input, { width: "80%" }]}
        >
          <Picker.Item label="Selecciona el tipo de sueño" value={null} />
          <Picker.Item label="Sueño profundo" value="DEEP" />
          <Picker.Item label="Sueño ligero" value="LIGHT" />
          <Picker.Item label="REM" value="REM" />
          <Picker.Item label="Agitado" value="AGITATED" />
        </Picker>

        {errorMessage && <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>}

        <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={addSleepData}>
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
  marginBottom: 5,
};