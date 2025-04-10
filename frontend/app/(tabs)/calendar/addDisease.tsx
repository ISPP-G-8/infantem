import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { format, isValid, parseISO, isAfter } from 'date-fns';
import { router } from 'expo-router';

const gs = require("../../../static/styles/globalStyles");

const AddDisease = () => {
    const { token } = useAuth();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();

    const [babies, setBabies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
    const [diseaseName, setDiseaseName] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [symptoms, setSymptoms] = useState<string>('');
    const [extraObservations, setExtraObservations] = useState<string>('');
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchBabies = async () => {
            if (!apiUrl) {
                console.error("API URL no está definido");
                Alert.alert("Error", "API URL no configurado.");
                setLoading(false);
                return;
            }

            if (!token) {
                console.error('No se encontró el token JWT');
                Alert.alert("Error", "Token no encontrado.");
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
                console.error('Error al obtener los datos de los bebés:', error);
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

        const parsedDate = parseISO(dateString);
        if (!isValid(parsedDate)) {
            return "La fecha ingresada no es válida";
        }

        if (isAfter(parsedDate, new Date())) {
            return "La fecha no puede ser futura";
        }

        return null;
    };

    const addDiseaseData = async () => {
        const startDateError = validateDate(startDate);
        const endDateError = validateDate(endDate);

        if (startDateError || endDateError) {
            setFormErrors({ startDate: startDateError, endDate: endDateError });
            return;
        } else {
            setFormErrors({});
        }

        if (!apiUrl) {
            Alert.alert('Error', 'API URL no configurado.');
            return;
        }

        if (!token || !selectedBaby) {
            Alert.alert('Error', 'Token inválido o bebé no seleccionado.');
            return;
        }

        if (!diseaseName || !startDate || !endDate || !symptoms) {
            Alert.alert('Error', 'Por favor ingresa todos los campos obligatorios.');
            return;
        }

        setLoading(true);

        try {
            const diseaseToSave = {
                name: diseaseName,
                startDate: startDate,
                endDate: endDate,
                symptoms: symptoms,
                extraObservations: extraObservations,
                baby: { id: selectedBaby },
            };

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

            await response.json();

            Alert.alert('Éxito', 'Enfermedad registrada correctamente.');

            // Aquí navegas a la pantalla 'CalendarTab' y le pasas un parámetro para refrescar
            router.push("/calendar");

        } catch (error) {
            console.error('Error al registrar la enfermedad:', error);
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
                Añadir Enfermedad
            </Text>

            <View style={[gs.card, { padding: 20, alignItems: "center", justifyContent: "center", marginBottom: 20 }]}>
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
                    placeholder="Ej. Varicela"
                    value={diseaseName}
                    onChangeText={setDiseaseName}
                />

                <Text style={labelStyle}>Fecha de inicio:</Text>
                <TextInput
                    style={[gs.input, { width: "80%" }]}
                    placeholder="yyyy-MM-dd"
                    value={startDate}
                    onChangeText={setStartDate}
                />
                {formErrors.startDate && (
                    <Text style={{ color: 'red', marginTop: 5 }}>{formErrors.startDate}</Text>
                )}

                <Text style={labelStyle}>Fecha de fin:</Text>
                <TextInput
                    style={[gs.input, { width: "80%" }]}
                    placeholder="yyyy-MM-dd"
                    value={endDate}
                    onChangeText={setEndDate}
                />
                {formErrors.endDate && (
                    <Text style={{ color: 'red', marginTop: 5 }}>{formErrors.endDate}</Text>
                )}

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

                <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={addDiseaseData}>
                    <Text style={gs.mainButtonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const labelStyle = {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    color: '#1565C0',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
};

export default AddDisease;
