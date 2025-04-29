import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,Dimensions, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";

export default function PremiumPlan() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
      const [isMobile, setIsMobile] = useState<boolean>(Dimensions.get("window").width < 768);
    
    interface Subscription {
        stripeSubscriptionId: any;
        id: string;
        active: boolean;
        // Add other properties as needed
    }

    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const premiumFeatures = [
        {
          emoji: "🚫",
          title: "1. Sin anuncios",
          desc: "Navega por la app sin interrupciones ni distracciones.",
        },
        {
          emoji: "⏰",
          title: "2. Recordatorios inteligentes",
          desc: "Organiza alertas personalizadas y nunca olvides nada importante.",
        },
        {
          emoji: "🏷️",
          title: "3. Cupones exclusivos",
          desc: "Ahorra en productos del Marketplace con descuentos Premium.",
        },
        {
          emoji: "📊",
          title: "4. Seguimiento avanzado",
          desc: "Métricas detalladas para el desarrollo y alimentación del bebé.",
        },
        {
          emoji: "🍽️",
          title: "5. Filtros personalizados",
          desc: "Recetas ajustadas a tus preferencias y necesidades específicas.",
        },
      ];
      

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
        fetch(`${apiUrl}/api/v1/subscriptions/cancel?subscriptionId=${subscription.stripeSubscriptionId}`, {
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
            router.push('/account')
        }).catch(error => {
            Alert.alert("Error", `No se pudo realizar los cambios: ${error.message}`);
        });
    };
    

    const handleResubscribe = () => {
        if (!subscription) {
            Alert.alert("Error", "No se encontró una suscripción activa.");
            return;
        }
        fetch(`${apiUrl}/api/v1/subscriptions/update-status?subscriptionId=${subscription.stripeSubscriptionId}&active=true`, {
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
            router.push('/account')
        }).catch(error => {
            Alert.alert("Error", `No se pudo realizar la activación: ${error.message}`);
        });
    };

    const handleSubscribe = () => { 
        router.push('/account/checkoutpage') 
    };

    return (
        console.log(subscription),
        <View style={{ flex: 1, justifyContent: "center", padding: 40, backgroundColor: "#E3F2FD" }}>
          {subscription ? (
            <ScrollView
              contentContainerStyle={{
                backgroundColor: "#fff",
                padding: 30,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 5,
                
              }}
               showsVerticalScrollIndicator={false}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  marginBottom: 20,
                  textAlign: "center",
                  color: "#C62828",
                }}
              >
                ¿Estás seguro de que quieres dejar de ser Premium?
              </Text>
      
              <Text style={{ fontSize: 21, marginBottom: 20, color: "#1565C0",fontWeight: "bold"}}>
                Vas a dejar de disfrutar los siguientes beneficios exclusivos:
              </Text>
      
              {/* Lista de beneficios */}
              <View
                          style={{
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 30,
                            flexWrap: isMobile ? "wrap" : "nowrap",
                          }}
                        >
                          {premiumFeatures.map((feature, index) => (
                            <View
                              key={index}
                              style={{
                                width: isMobile ? "100%" : "15%",
                                alignItems: "center",
                              }}
                            >
                              <Text style={{ fontSize: 36, marginBottom: 10 }}>
                                {feature.emoji}
                                </Text>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontFamily: "Loubag-Bold",
                                  textAlign: "center",
                                  marginBottom: 10,
                                  color: "#0D47A1",
                                }}
                              >
                                {feature.title}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Loubag-Regular",
                                  textAlign: "center",
                                  color: "#0D47A1",
                                }}
                              >
                                {feature.desc}
                              </Text>
                            </View>
                          ))}
                        </View>
      
              <TouchableOpacity
                onPress={handleDesubscribe}
                style={{
                  backgroundColor: "#D32F2F",
                  padding: 14,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 30,
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                    Dejar de estar suscrito
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                backgroundColor: "#fff",
                padding: 30,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 5,
              }}
              showsVerticalScrollIndicator={false}

            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 20,
                  textAlign: "center",
                  color: "#1565C0",
                }}
              >
                ¡Hazte Premium!
              </Text>
      
              <Text style={{ fontSize: 21, marginBottom: 20, color: "#1565C0",fontWeight: "bold",
 }}>
                ¡Disfruta de beneficios exclusivos! 
              </Text>
      
              {/* Lista de beneficios */}
              <View
                          style={{
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 20,
                            flexWrap: isMobile ? "wrap" : "nowrap",
                          }}
                        >
                          {premiumFeatures.map((feature, index) => (
                            <View
                              key={index}
                              style={{
                                width: isMobile ? "100%" : "15%",
                                alignItems: "center",
                              }}
                            >
                                <Text style={{ fontSize: 36, marginBottom: 10 }}>
                                {feature.emoji}
                                </Text>
                              
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontFamily: "Loubag-Bold",
                                  textAlign: "center",
                                  marginBottom: 10,
                                  color: "#0D47A1",
                                }}
                              >
                                {feature.title}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Loubag-Regular",
                                  textAlign: "center",
                                  color: "#0D47A1",
                                }}
                              >
                                {feature.desc}
                              </Text>
                            </View>
                          ))}
                        </View>
      
      
                        <Text
                        style={{
                            fontSize: 26,
                            marginTop: 40,
                            marginBottom: 25,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#0D47A1",
                            textShadowColor: "#90CAF9",
                            textShadowOffset: { width: 1, height: 2 },
                            textShadowRadius: 4,
                            letterSpacing: 1,
                        }}
                        >   
                        💎 ¡Solo 4,99 € al mes para ser Premium!
                        </Text>

      
              <TouchableOpacity
                onPress={handleSubscribe}
                style={{
                  backgroundColor: "#0070BA",
                  padding: 14,
                  borderRadius: 10,
                  alignItems: "center",
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                    Suscribirse ahora
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      );
      
      
};
