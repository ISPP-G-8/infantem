import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
const gs = require("../../../static/styles/globalStyles"); // Importar estilos globales



const SleepTab = ({ route }: any) => {
    const { token } = useAuth();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();

    const [babies, setBabies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [numWakeups, setNumWakeups] = useState<string>('');
    const [dreamType, setDreamType] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

    useEffect(() => {
        const fetchBabies = async () => {
            try {
                if (!token) {
                    console.error('No se encontró el token JWT');
                    return;
                }

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
                console.error('Error al obtener los datos de los bebés:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBabies();
    }, [token]);

    const addSleepData = async () => {
        if (!selectedBaby || !dateStart || !dateEnd || !dreamType) {
            setErrorMessage('Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            // Convertir las fechas al formato ISO 8601
            const formattedDateStart = format(new Date(dateStart), "yyyy-MM-dd'T'HH:mm");
            const formattedDateEnd = format(new Date(dateEnd), "yyyy-MM-dd'T'HH:mm");

            const response = await fetch(`${apiUrl}/api/v1/dream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    baby: selectedBaby,
                    dateStart: formattedDateStart,
                    dateEnd: formattedDateEnd,
                    wakeUps: parseInt(numWakeups, 10) || 0,
                    dreamType: dreamType,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Intentar obtener el mensaje de error del backend
                const errorMessage = errorData.message || 'Error desconocido al guardar los datos del sueño.';
                throw new Error(errorMessage);
            }

            Alert.alert('Éxito', 'Datos del sueño guardados correctamente.');
            navigation.navigate('calendar'); // Redirigir al calendario
        } catch (error: any) {
            console.error('Error al guardar los datos del sueño:', error);
            setErrorMessage(error.message || 'No se pudo guardar los datos del sueño.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
                Añadir Sueño
            </Text>

            <View style={[gs.card, { padding: 20, alignItems: "center", justifyContent: "center", marginBottom: 20, marginLeft: "5%" }]}>
                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Bebé:</Text>
                <Picker
                    selectedValue={selectedBaby}
                    onValueChange={(itemValue) => setSelectedBaby(itemValue)} // itemValue será el objeto completo del bebé
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                >
                    <Picker.Item label="Selecciona un bebé" value={null} />
                    {babies.map((baby: any) => (
                        <Picker.Item key={baby.id} label={baby.name} value={baby.id} /> // Enviar el objeto completo del bebé
                    ))}
                </Picker>

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Hora de inicio:</Text>
                <TextInput
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                    placeholder="YYYY-MM-DD HH:mm"
                    value={dateStart}
                    onChangeText={setDateStart}
                />

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Hora de fin:</Text>
                <TextInput
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                    placeholder="YYYY-MM-DD HH:mm"
                    value={dateEnd}
                    onChangeText={setDateEnd}
                />

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Número de despertares:</Text>
                <TextInput
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                    placeholder="Ej. 3"
                    keyboardType="numeric"
                    value={numWakeups}
                    onChangeText={setNumWakeups}
                />

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Tipo de sueño:</Text>
                <Picker
                    selectedValue={dreamType}
                    onValueChange={(itemValue) => setDreamType(itemValue)}
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                >
                    <Picker.Item label="Selecciona el tipo de sueño" value={null} />
                    <Picker.Item label="Sueño profundo" value="DEEP" />
                    <Picker.Item label="Sueño ligero" value="LIGHT" />
                    <Picker.Item label="REM" value="REM" />
                    <Picker.Item label="Agitado" value="AGITATED" />
                </Picker>

                {/* Mostrar mensaje de error */}
                {errorMessage && (
                    <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
                        {errorMessage}
                    </Text>
                )}

                <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={addSleepData}>
                    <Text style={gs.mainButtonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SleepTab;