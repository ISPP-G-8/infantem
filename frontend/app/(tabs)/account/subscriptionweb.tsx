import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity,ScrollView} from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";


export default function SubscriptionWeb() {
    const gs = require("../../../static/styles/globalStyles");
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [last4, setLast4] = useState("");
    const [customerData, setCustomerData] = useState(null);
    const [isStripeUser, setIsStripeUser] = useState<boolean | null>(null);
    const [jwt, setJwt] = useState<string | "">("");
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [accepted, setAccepted] = useState(false);
    const [priceId, setPriceId] = useState("price_1R7NfNImCCGaknJ7116zw3Vb");
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const getUserToken = async () => {
            const token = await getToken();
            setJwt(token? token : "");
        };
        getUserToken();
    }, []);

    useEffect(() => {
        if (!jwt) return; // Evita ejecutar el efecto si jwt es null o undefined
        try {
            const decodedToken: any = jwtDecode(jwt);
            setUserId(decodedToken.jti);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }, [jwt]);

    const handleResponse = async () => {
        if (jwt && accepted) {
        try {
            const endpoint = `${apiUrl}/api/v1/subscriptions/customers?email=${email}&lasts4=${last4}`;
            const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            }
            });
            if (response.ok) {
                const data = await response.json();
                setCustomerData(data);
            } else {
            console.error("Error en la suscripción:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la suscripción:", error);
        }
        }
    };

    const handleResponseSubscription = async () => {
        if (jwt && accepted) {
            try {
                const endpoint = `${apiUrl}/api/v1/subscriptions/create?userId=${userId}&customerId=${customerData.id}&priceId=${priceId}&paymentMethodId=${customerData.paymentMethod.id}`;
                const response = await fetch(endpoint, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                    },
                });
                if (response.ok) {
                    router.push("/account");
                } else {
                    console.error("Error en la suscripción:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la suscripción:", error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100, backgroundColor: "#E3F2FD", flexGrow: 1 }}>
          <View style={[gs.container, { paddingTop: 100, alignItems: "center",backgroundColor: "#E3F2FD" }]}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 30,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
                width: "90%",
                maxWidth: 500,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#1565C0",
                  marginBottom: 30,
                  textAlign: "center",
                }}
              >
                ¿Eres usuario de Stripe?
              </Text>
      
              <TouchableOpacity
                onPress={() => setIsStripeUser(true)}
                style={[
                  gs.mainButton,
                  {
                    marginVertical: 10,
                    width: "100%",
                    backgroundColor: "#1565C0",
                    paddingVertical: 14,
                    borderRadius: 12,
                  },
                ]}
              >
                <Text style={[gs.mainButtonText, { fontSize: 18 }]}>Sí, lo soy 🙌</Text>
              </TouchableOpacity>
      
              <TouchableOpacity
                onPress={() => setIsStripeUser(false)}
                style={[
                  gs.secondaryButton,
                  {
                    marginVertical: 10,
                    width: "100%",
                    borderColor: "#1565C0",
                    borderWidth: 2,
                    paddingVertical: 14,
                    borderRadius: 12,
                  },
                ]}
              >
                <Text style={[gs.secondaryButtonText, { fontSize: 18, color: "#1565C0" }]}>
                  No, aún no
                </Text>
              </TouchableOpacity>
            </View>
      
            <View style={{ width: "90%", maxWidth: 500, marginTop: 50 }}>
              {isStripeUser !== null && customerData == null && (
                <>
                  {isStripeUser ? (
                    <>
                      <TextInput
                        style={[gs.input, { marginBottom: 16 }]}
                        placeholder="📧 Correo asociado a Stripe"
                        value={email}
                        onChangeText={setEmail}
                      />
                      <TextInput
                        style={[gs.input, { marginBottom: 16 }]}
                        placeholder="💳 Últimos 4 dígitos de la tarjeta"
                        value={last4}
                        keyboardType="numeric"
                        onChangeText={setLast4}
                      />
      
                      <TouchableOpacity
                        onPress={() => setAccepted(!accepted)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 20,
                          paddingVertical: 8,
                        }}
                      >
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderWidth: 2,
                            borderColor: "#1565C0",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                            backgroundColor: accepted ? "#1565C0" : "#fff",
                            borderRadius: 4,
                          }}
                        >
                          {accepted && <Text style={{ color: "white", fontWeight: "bold" }}>✔</Text>}
                        </View>
                        <Text style={{ color: "#1565C0", fontSize: 15 }}>Acepto el uso de mis datos</Text>
                      </TouchableOpacity>
      
                      <TouchableOpacity
                        style={[gs.mainButton, { opacity: accepted ? 1 : 0.5 }]}
                        onPress={handleResponse}
                        disabled={!accepted}
                      >
                        <Text style={gs.mainButtonText}>✅ Confirmar</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <View style={{ marginBottom: 20 }}>
                        <Text style={[gs.text, { textAlign: "center", marginBottom: 16 }]}>
                          Para registrar tu pago en Stripe primero necesitamos asociar tu método de pago a tu usuario en nuestra app.
                        </Text>
                      </View>
      
                      <TouchableOpacity
                        onPress={() => setAccepted(!accepted)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 20,
                          paddingVertical: 8,
                        }}
                      >
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderWidth: 2,
                            borderColor: "#1565C0",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                            backgroundColor: accepted ? "#1565C0" : "#fff",
                            borderRadius: 4,
                          }}
                        >
                          {accepted && <Text style={{ color: "white", fontWeight: "bold" }}>✔</Text>}
                        </View>
                        <Text style={{ color: "#1565C0", fontSize: 15 }}>Acepto el uso de mis datos</Text>
                      </TouchableOpacity>
      
                      <TouchableOpacity
                        style={[gs.mainButton, { opacity: accepted ? 1 : 0.5 }]}
                        onPress={() => router.push("/account/stripe-checkout")}
                        disabled={!accepted}
                      >
                        <Text style={gs.mainButtonText}>💳 Ir al método de pago</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
      
              {customerData !== null && (
                <>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={[gs.text, { fontWeight: "bold", fontSize: 16, marginBottom: 8 }]}>
                      Datos a usar para la suscripción:
                    </Text>
                    <Text style={gs.text}>📧 Correo: {customerData?.email ?? "Nada"}</Text>
                    <Text style={gs.text}>
                      💳 Tarjeta: {customerData?.paymentMethod.card.brand ?? "Nada"} ****{" "}
                      {customerData?.paymentMethod.card.last4 ?? "nada"}
                    </Text>
                  </View>
      
                  <TouchableOpacity
                    onPress={() => setAccepted(!accepted)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 20,
                      paddingVertical: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderWidth: 2,
                        borderColor: "#1565C0",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                        backgroundColor: accepted ? "#1565C0" : "#fff",
                        borderRadius: 4,
                      }}
                    >
                      {accepted && <Text style={{ color: "white", fontWeight: "bold" }}>✔</Text>}
                    </View>
                    <Text style={{ color: "#1565C0", fontSize: 15 }}>
                      Acepto el uso de mis datos para la suscripción
                    </Text>
                  </TouchableOpacity>
      
                  <TouchableOpacity
                    style={[gs.mainButton, { opacity: accepted ? 1 : 0.5 }]}
                    onPress={handleResponseSubscription}
                    disabled={!accepted}
                  >
                    <Text style={gs.mainButtonText}>🎉 Confirmar suscripción</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      );
      

}