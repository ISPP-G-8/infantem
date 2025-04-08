import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../context/AuthContext';
import { router } from 'expo-router';
import { Baby, Intake } from '../../../types';

export default function intakeDetail() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();

  const [dateError, setDateError] = useState('');
  const [babies, setBabies] = useState<Baby[]>([]);
  const [intake, setIntake] = useState<Intake>({
    id: 0,
    date: '', // THIS TYPE IS GONNA BE CHANGED IN BACKEND
    quantity: 0,
    observations: '',
    baby: undefined, 
  });

  useEffect(() => {
    const fetchBabies = async (): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/baby`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching intake");
        } 

        const data = await response.json();
        setBabies(data);
        return true;

      } catch (error) {
        console.error('Error fetching recipes: ', error);
        return false;
      }
    };
    fetchBabies();
  }, []);


  const handleDateChange = (text: string) => {
    setIntake({...intake, date: text});
    
    // Basic date validation (YYYY-MM-DD HH:MM format)
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(text)) {
      setDateError('Formato debe ser AAAA-MM-DD HH:MM');
    } else {
      setDateError('');
    }
  };

  const handleInputChange = (field, value) => {
    setIntake({...intake, [field]: value});
  };

  const handleSaveIntake = async () => {
    if (dateError) {
      alert('Por favor corrige los errores antes de guardar');
      return;
    }
    
    if (!intake.baby) {
      alert('Por favor selecciona un bebé');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/intakes`, {
        method: intake.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(intake)
      });
      
      if (!response.ok)
        throw new Error('Error al guardar la ingesta');

      router.push("/calendar/intakes");

    } catch (error) {
      console.error('Error saving intake:', error);
      alert('Error al guardar la ingesta');
    }
  };

  const handleCancel = () => {
    router.push("/calendar/intakes");
  };

  return (

    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        Añade una ingesta
      </Text>
          <View style={[gs.card, { alignItems: "center", justifyContent: "center", marginBottom: 20, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
            
            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Bebé:</Text>
            {babies &&
              <View style={{ borderWidth: 1, borderColor: "#1565C0", borderRadius: 8, width: "80%", marginBottom: 16 }}> 
              <Picker
                selectedValue={intake.baby}
                style={{ opacity: 0.8 }}
                onValueChange={(babyId) => {
                  setIntake((prevIntake) => ({...prevIntake, baby: babyId}));
                }}
              >
                <Picker.Item label="Seleccionar un bebé" value={null} />
                {babies.map((baby) => (
                  <Picker.Item 
                    key={baby.id} 
                    label={baby.name} 
                    value={baby.id} 
                  />
                ))}
              </Picker>
            </View>
            }
            
            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Fecha y hora:</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
              placeholder="AAAA-MM-DD HH:MM"
              value={intake.date}
              onChangeText={handleDateChange}
            />
            {dateError && <Text style={{ color: "red", alignSelf: 'flex-start', marginLeft: '10%' }}>{dateError}</Text>}

            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Cantidad (g):</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
              placeholder="Ej. 120"
              keyboardType="numeric"
              value={intake.quantity.toString()}
              onChangeText={(text) => handleInputChange("quantity", text)}
            />

            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Observaciones:</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%", height: 100, textAlignVertical: 'top' }]} 
              placeholder="Ej. Tomó bien la leche"
              multiline={true}
              numberOfLines={4}
              value={intake.observations}
              onChangeText={(text) => handleInputChange("observations", text)}
            />

            <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSaveIntake}>
              <Text style={gs.mainButtonText}>{intake.id ? "Actualizar" : "Guardar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red", marginTop: 10 }]} onPress={handleCancel}>
              <Text style={gs.mainButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
}
