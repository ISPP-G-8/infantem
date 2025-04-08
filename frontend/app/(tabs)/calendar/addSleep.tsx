import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
const gs = require("../../../static/styles/globalStyles"); // Importar estilos globales
import { router } from "expo-router";


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
        if (!token || !selectedBaby) {
            Alert.alert('Error', 'No se encontró el token o no se seleccionó un bebé.');
            return;
        }

        // Validar campos requeridos
        if (!dateStart || !dateEnd) {
            Alert.alert('Error', 'Por favor ingresa las fechas de inicio y fin.');
            return;
        }

        if (!dreamType) {
            Alert.alert('Error', 'Por favor selecciona un tipo de sueño.');
            return;
        }

        if (numWakeups === '') {
            Alert.alert('Error', 'Por favor ingresa el número de despertares.');
            return;
        }

        // Validar que la fecha de inicio sea anterior a la fecha de fin
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        if (startDate >= endDate) {
            Alert.alert('Error', 'La fecha de inicio debe ser anterior a la fecha de fin.');
            return;
        }

        setLoading(true);

        try {
            // Formatear las fechas al formato ISO 8601
            const formattedDateStart = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
            const formattedDateEnd = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

            // Crear el objeto sueño
            const dreamToSave = {
                baby: { id: selectedBaby },
                dateStart: formattedDateStart,
                dateEnd: formattedDateEnd,
                numWakeups: parseInt(numWakeups, 10),
                dreamType,
            };

            // Realizar la solicitud al backend
            const response = await fetch(`${apiUrl}/api/v1/dream`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dreamToSave),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el sueño');
            }

            const createdDream = await response.json();

            // Mostrar mensaje de éxito y redirigir al calendario
            Alert.alert('Éxito', 'Sueño registrado correctamente.');
            navigation.navigate('CalendarTab'); // Asegúrate de que este sea el nombre correcto
        } catch (error) {
            console.error('Error al registrar el sueño:', error);

            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'Ocurrió un error inesperado.');
            }
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
                Añadir Sueño
            </Text>

            <View style={[gs.card, { padding: 20, alignItems: "center", justifyContent: "center", marginBottom: 20 }]}>
                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Bebé:</Text>
                <Picker
                    selectedValue={selectedBaby}
                    onValueChange={(itemValue) => setSelectedBaby(itemValue)}
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                >
                    <Picker.Item label="Selecciona un bebé" value={null} />
                    {babies.map((baby: any) => (
                        <Picker.Item key={baby.id} label={baby.name} value={baby.id} />
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

                <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={addSleepData}>
                    <Text style={gs.mainButtonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SleepTab;