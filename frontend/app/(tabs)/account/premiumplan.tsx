import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";

export default function PremiumPlan() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    interface Subscription {
        id: string;
        active: boolean;
        // Add other properties as needed
    }

    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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

    useEffect(() => {
        if (!token) return; 
        try {
            const decodedToken: any = jwtDecode(token);
            setUserId(decodedToken.jti);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }, [token]);

    useEffect(() => {
        if (!userId || !token) return;
        const fetchSubscription = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/subscriptions/user/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Error fetching subscription");
                }
                const data = await response.json();
                setSubscription(data);
            } catch (error) {
                console.error("Error fetching subscription:", error);
                setSubscription(null);
            }
        };
        fetchSubscription();
    }, [token, userId]);

    const handleDesubscribe = () => {
        if (!subscription) {
            Alert.alert("Error", "No se encontró una suscripción activa.");
            return;
        }
        fetch(`${apiUrl}/api/v1/subscriptions/cancel/${subscription.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error("Error fetching subscription");
            }
            return response.json();
        }).then(data => {
            setSubscription(data);
        }).catch(error => {
            Alert.alert("Error", `No se pudo realizar los cambios: ${error.message}`);
        });
    };
    

    const handleResubscribe = () => {
        fetch(`${apiUrl}/api/v1/subscriptions/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error("Error fetching subscription");
            }
            return response.json();
        }).then(data => {
            setSubscription(data);
        }).catch(error => {
            Alert.alert("Error", `No se pudo realizar los cambios: ${error.message}`);
        });
    };

    const handleSubscribe = () => { 
        router.push('/account/subscriptionweb') 
    };

    return (
        console.log("Subscription:", subscription),
        <View style={{ flex: 1, justifyContent: "center", padding: 40, backgroundColor: "#f4f4f4" }}>
            {subscription ? (
                <ScrollView style={{ backgroundColor: "#fff", padding: 40, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5 }}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}> ¿Estas seguro de que quieres dejar de ser premium?</Text>
                    <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "left" }}>Vas a dejar de disfrutar los sigunetes beneficios exclusivos:</Text>
                    <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Eliminación de anuncios</Text>
                    <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Recordatorios inteligentes</Text>
                    <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Cupones de descuentos en productos del Marketplace.</Text>
                    <Text style={{ fontSize: 15, marginBottom: 8 }}>🔹 Seguimiento del crecimiento del bebe mediante métricas avanzadas</Text>
                    <Text style={{ fontSize: 15, marginBottom: 20 }}>🔹 Recetas personalizadas mediante filtrado por diferentes métricas adicionales</Text>

                    {subscription.active ? (
                        <TouchableOpacity
                            onPress={handleDesubscribe}
                            style={{ backgroundColor: "red", padding: 15, borderRadius: 10, alignItems: "center" }}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Dejar de estar suscrito</Text>
                            )}
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleResubscribe}
                            style={{ backgroundColor: "green", padding: 15, borderRadius: 10, alignItems: "center" }}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>volver a suscribirme</Text>
                            )}
                        </TouchableOpacity>
                    )}
                </ScrollView>
            ) : (
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
            )}
        </View>
    );
};
