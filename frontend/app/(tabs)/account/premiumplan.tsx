import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";

export default function PremiumPlan() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await getToken();
                if (!storedToken) {
                    Alert.alert("Error", "No se encontró el token de autenticación.");
                    return;
                }
                setToken(storedToken);
            } catch (error) {
                console.error("Error obteniendo el token:", error);
                Alert.alert("Error", "No se pudo obtener el token.");
            }
        };
        fetchToken();
    }, []);

    const handleSubscribe = () => { 
        router.push('/account/subscriptionweb') 
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 40, backgroundColor: "#f4f4f4" }}>
            <ScrollView style={{ backgroundColor: "#fff", padding: 40, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>Hazte Premium</Text>
                <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "left" }}>Disfruta de beneficios exclusivos:</Text>
                <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Eliminación de anuncios</Text>
                <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Recordatorios inteligentes</Text>
                <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Cupones de descuentos en productos del Marketplace.</Text>
                <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Seguimiento del crecimiento del bebe mediante métricas avanzadas</Text>
                <Text style={{ fontSize: 15, marginBottom: 20 }}>🔹 Recetas personalizadas mediante filtrado por diferentes métricas adicionales</Text>
                
                <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: "bold" }}>4,99 € al mes</Text>

                <TouchableOpacity
                    onPress={handleSubscribe}
                    style={{ backgroundColor: "#0070BA", padding: 15, borderRadius: 10, alignItems: "center" }}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Suscribirse ahora</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
