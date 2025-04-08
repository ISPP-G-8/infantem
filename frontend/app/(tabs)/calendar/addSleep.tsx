import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Picker, Alert, TextInput, Modal, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación
import { format } from 'date-fns'; // Importar la función de formateo de date-fns

const SleepTab = ({ route }: any) => {
    const { token } = useAuth();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation(); // Inicializar el hook de navegación

    const [babies, setBabies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const [numWakeups, setNumWakeups] = useState<number | null>(null);
    const [dreamType, setDreamType] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const [showStartModal, setShowStartModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);

    useEffect(() => {
        if (route?.params?.selectedDate) {
            setSelectedDate(route.params.selectedDate);
        }
    }, [route]);

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

    const addSleepData = async () => {
        if (!selectedBaby || !dateStart || !dateEnd || !dreamType || numWakeups === null) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        try {
            // Formatear las fechas usando date-fns
            const formattedDateStart = format(dateStart, "yyyy-MM-dd'T'HH:mm:ss");
            const formattedDateEnd = format(dateEnd, "yyyy-MM-dd'T'HH:mm:ss");


            const response = await fetch(`${apiUrl}/api/v1/dream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    baby: { id: selectedBaby }, // Enviar el objeto baby con el id
                    dateStart: formattedDateStart,
                    dateEnd: formattedDateEnd,
                    numWakeups,
                    dreamType,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al crear el sueño');
            }

            Alert.alert('Éxito', 'Sueño registrado correctamente');
        } catch (error) {
            console.error('Error al registrar el sueño:', error);
            Alert.alert('Error', 'No se pudo registrar el sueño');
        }
    };

    const navigateToCalendar = () => {
        navigation.navigate('calendar');
    }

    useEffect(() => {
        fetchBabies();
    }, []);

    const renderDateModal = (isVisible: boolean, setIsVisible: (visible: boolean) => void, setDate: (date: Date) => void) => (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Selecciona la fecha y hora</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD HH:mm"
                        onChangeText={(text) => {
                            const parsedDate = new Date(text);
                            if (!isNaN(parsedDate.getTime())) {
                                setDate(parsedDate);
                            }
                        }}
                    />
                    <Button title="Confirmar" onPress={() => setIsVisible(false)} />
                </View>
            </View>
        </Modal>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Añadir Información de Sueño</Text>

            <Picker
                selectedValue={selectedBaby}
                onValueChange={(itemValue) => setSelectedBaby(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona un bebé" value={null} />
                {babies.map((baby: any) => (
                    <Picker.Item key={baby.id} label={baby.name} value={baby.id} />
                ))}
            </Picker>

            <View style={styles.inputContainer}>
                <Text>Hora de inicio:</Text>
                <TouchableOpacity onPress={() => setShowStartModal(true)} style={styles.dateButton}>
                    <Text>{dateStart ? dateStart.toLocaleString() : 'Selecciona la hora de inicio'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text>Hora de fin:</Text>
                <TouchableOpacity onPress={() => setShowEndModal(true)} style={styles.dateButton}>
                    <Text>{dateEnd ? dateEnd.toLocaleString() : 'Selecciona la hora de fin'}</Text>
                </TouchableOpacity>
            </View>

            {renderDateModal(showStartModal, setShowStartModal, setDateStart)}
            {renderDateModal(showEndModal, setShowEndModal, setDateEnd)}

            <View style={styles.inputContainer}>
                <Text>Número de despertares:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={numWakeups?.toString() || ''}
                    onChangeText={(text) => setNumWakeups(Number(text))}
                />
            </View>

            <Picker
                selectedValue={dreamType}
                onValueChange={(itemValue) => setDreamType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona el tipo de sueño" value={null} />
                <Picker.Item label="Sueño profundo" value="DEEP" />
                <Picker.Item label="Sueño ligero" value="LIGHT" />
                <Picker.Item label="REM" value="REM" />
                <Picker.Item label="Agitado" value="AGITATED" />
            </Picker>

            <Button title="Añadir Sueño" onPress={() => { addSleepData(); navigateToCalendar(); }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginTop: 8,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 8,
        backgroundColor: '#f9f9f9',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default SleepTab;