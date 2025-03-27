import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity} from "react-native";
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
    const [priceId, setPriceId] = useState("price_1R4hyZRD1fD8EiuBaXzXdw9p");
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
    <View style={[gs.container, { paddingTop: 100, paddingBottom: 100 }]}>
        <Text style={gs.headerText}>¿Eres usuario de Stripe?</Text>
        <TouchableOpacity onPress={() => setIsStripeUser(true)} style={[gs.mainButton, { margin: 10 }]}>
            <Text style={gs.mainButtonText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsStripeUser(false)} style={[gs.secondaryButton, { margin: 10 }]}>
            <Text style={gs.secondaryButtonText}>No</Text>
        </TouchableOpacity>

        {isStripeUser !== null && customerData == null &&(
        <>
            {isStripeUser ? (
            <>
                <TextInput
                    style={gs.input}
                    placeholder="Correo asociado a Stripe"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={gs.input}
                    placeholder="Últimos 4 dígitos de la tarjeta"
                    value={last4}
                    keyboardType="numeric"
                    onChangeText={setLast4}
                />
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => setAccepted(!accepted)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderWidth: 2,
                            borderColor: "black",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                            backgroundColor: accepted ? "black" : "white",
                        }}>
                            {accepted && <Text style={{ color: "white" }}>✔</Text>}
                        </View>
                        <Text>Acepto el uso de mis datos</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[gs.mainButton, { opacity: accepted ? 1 : 0.5 }]}
                    onPress={handleResponse}
                    disabled={!accepted}
                >
                    <Text style={gs.mainButtonText}>Confirmar</Text>
                </TouchableOpacity>
            </>

            ) : (
            <>
                <View>
                    <Text>Para registrar tu pago en Stripe antes tendremos qeu asociar tu método de pago a un usuario, para ello, vamos a usar los datos de tu usuario en nuetsra aplicación</Text>
                    <TouchableOpacity onPress={() => setAccepted(!accepted)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderWidth: 2,
                            borderColor: "black",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                            backgroundColor: accepted ? "black" : "white",
                        }}>
                            {accepted && <Text style={{ color: "white" }}>✔</Text>}
                        </View>
                        <Text>Acepto el uso de mis datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[gs.mainButton, { opacity: accepted ? 1 : 0.5 }]}
                        onPress={() => router.push("/account/stripe-checkout")}
                        disabled={!accepted}
                    >
                        <Text style={gs.mainButtonText}>Ir al método de pago</Text>
                    </TouchableOpacity>
                </View>
            </>
            )}
        </>
        )}

        {customerData !== null && (
            <>
            <View>
                <Text style={gs.text}>Datos a usar para la suscripción:</Text>
                <Text style={gs.text}>Correo: {customerData? customerData.email : "Nada"}</Text>
                <Text style={gs.text}>Tarjeta: {customerData? customerData.paymentMethod.card.brand : "Nada"} **** {customerData ? customerData.paymentMethod.card.last4 : "nada"}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                <TouchableOpacity onPress={() => setAccepted(!accepted)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                    <View style={{
                        width: 20,
                        height: 20,
                        borderWidth: 2,
                        borderColor: "black",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                        backgroundColor: accepted ? "black" : "white",
                    }}>
                        {accepted && <Text style={{ color: "white" }}>✔</Text>}
                    </View>
                    <Text style={gs.text}>Acepto el uso de mis datos para la suscripción</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[gs.mainButton, { opacity: accepted ? 1 : 0.5 }]}
                onPress={handleResponseSubscription}
                disabled={!accepted}
            >
                <Text style={gs.mainButtonText}>Confirmar suscripción</Text>
            </TouchableOpacity>
            </>
        )}
    </View>
    );

}