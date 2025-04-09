import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Sleep } from '../../../types/Intake';
import { Baby } from '../../../types/Baby';
import { router } from 'expo-router';
const gs = require("../../../static/styles/globalStyles"); // Importar estilos globales

const SleepTab = ({ route }: any) => {
    const { token } = useAuth();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();

    const [babies, setBabies] = useState<Baby[]>([]);
    const [loading, setLoading] = useState(true);
    const [intake, setIntake] = useState<Sleep>({
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
        if (!intake.baby || !intake.dateStart || !intake.dateEnd || !intake.dreamType) {
            setErrorMessage('Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            // Convertir las fechas al formato ISO 8601
            const formattedDateStart = format(new Date(intake.dateStart), "yyyy-MM-dd'T'HH:mm");
            const formattedDateEnd = format(new Date(intake.dateEnd), "yyyy-MM-dd'T'HH:mm");

            const response = await fetch(`${apiUrl}/api/v1/dream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...intake,
                    baby: { id: parseInt(intake.baby, 10) }, // Enviar el bebé como un objeto con su ID
                    dateStart: formattedDateStart,
                    dateEnd: formattedDateEnd,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Intentar obtener el mensaje de error del backend
                const errorMessage = errorData.message || 'Error desconocido al guardar los datos del sueño.';
                throw new Error(errorMessage);
            }

            Alert.alert('Éxito', 'Datos del sueño guardados correctamente.');
            router.push("/calendar"); // Redirigir al calendario
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
                    selectedValue={intake.baby}
                    onValueChange={(babyId) =>
                        setIntake((prevIntake) => ({
                            ...prevIntake,
                            baby: babyId, // Guardar solo el ID del bebé
                        }))
                    }
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                >
                    <Picker.Item label="Selecciona un bebé" value={null} />
                    {babies.map((baby: Baby) => (
                        <Picker.Item key={baby.id} label={baby.name} value={baby.id.toString()} />
                    ))}
                </Picker>

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Hora de inicio:</Text>
                <TextInput
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                    placeholder="YYYY-MM-DD HH:mm"
                    value={intake.dateStart}
                    onChangeText={(text) => setIntake((prevIntake) => ({ ...prevIntake, dateStart: text }))}
                />

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Hora de fin:</Text>
                <TextInput
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                    placeholder="YYYY-MM-DD HH:mm"
                    value={intake.dateEnd}
                    onChangeText={(text) => setIntake((prevIntake) => ({ ...prevIntake, dateEnd: text }))}
                />

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Número de despertares:</Text>
                <TextInput
                    style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
                    placeholder="Ej. 3"
                    keyboardType="numeric"
                    value={intake.numWakeups.toString()}
                    onChangeText={(text) =>
                        setIntake((prevIntake) => ({
                            ...prevIntake,
                            numWakeups: parseInt(text, 10) || 0,
                        }))
                    }
                />

                <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Tipo de sueño:</Text>
                <Picker
                    selectedValue={intake.dreamType}
                    onValueChange={(itemValue) =>
                        setIntake((prevIntake) => ({
                            ...prevIntake,
                            dreamType: itemValue,
                        }))
                    }
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