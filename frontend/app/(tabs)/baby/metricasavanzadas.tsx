import { ScrollView, View, Text, Image, Alert, Dimensions, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { useSearchParams } from "expo-router/build/hooks";
import {ACBZ, ACGZ, getHCBZ, getHCGZ, getHBZ, getHGZ, getWBZ, getWGZ, getWFHBZ, getWFHGZ} from "./constantes";
import ACBZD from "../../../static/data/boys/arm-circumference-boys-3-5.json";
import ACGZD from "../../../static/data/girls/arm-circumference-girls-3-5.json";
import HCBZD from "../../../static/data/boys/head-circumference-boys-0-5.json";
import HCGZD from "../../../static/data/girls/head-circumference-girls-0-5.json";
import HBZD from "../../../static/data/boys/height-boys-0-5.json";
import HGZD from "../../../static/data/girls/height-girls-0-5.json";
import WBZD from "../../../static/data/boys/weight-boys-0-5.json";
import WGZD from "../../../static/data/girls/weight-girls-0-5.json";
import WFHBZD from "../../../static/data/boys/weight-for-height-boys-0-5.json";
import WFHGZD from "../../../static/data/girls/weight-for-height-girls-0-5.json";
import { jwtDecode } from "jwt-decode";

export default function MetricasAvanzadas() {
    const gs = require("../../../static/styles/globalStyles");
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const babyId = searchParams.get("babyId");
    interface Metrics {
        armCircumference: number;
        headCircumference: number;
        height: number;
        weight: number;
        date: [number, number, number];
    }
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    interface Baby {
        name: string;
        genre: string;
        birthDate: [number, number, number];
    }
    const [baby, setBaby] = useState<Baby | null>(null);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const today = new Date();
    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth() + 1;
    const nowDay = today.getDate(); 
    const { width: screenWidth } = Dimensions.get("window");
    const HCBZ = metrics ? getHCBZ({ headCircumference: metrics.headCircumference }) : null;
    const HCGZ = metrics ? getHCGZ({ headCircumference: metrics.headCircumference }) : null;
    const HBZ = metrics ? getHBZ({ height: metrics.height }) : null;
    const HGZ = metrics ? getHGZ({ height: metrics.height }) : null;
    const WBZ = metrics ? getWBZ({ weight: metrics.weight }) : null;
    const WGZ = metrics ? getWGZ({ weight: metrics.weight }) : null;
    const WFHBZ = metrics ? getWFHBZ({ weight: metrics.weight, height: metrics.height }) : null;
    const WFHGZ = metrics ? getWFHGZ({ weight: metrics.weight, height: metrics.height }) : null;
    const [genreBoy, setGenreBoy] = useState(false);
    const [genreGirl, setGenreGirl] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [subscription, setSubscription] = useState(null);

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
        if (!token) return; // Evita ejecutar el efecto si jwt es null o undefined
            try {
                const decodedToken: any = jwtDecode(token);
                setUserId(decodedToken.jti);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
    }, [token]);

    useEffect(() => {
        if (!token) return;
        
        const fetchMetrics = async () => {
            try {
                const endpoint = `${apiUrl}/api/v1/metrics/baby/${babyId}`;
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setMetrics(data.at(-1)); // Guarda solo el último elemento
                } else {
                    console.error("Error en la suscripción:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la suscripción:", error);
            }
        };
    
        fetchMetrics();
    }, [token, babyId]);

    useEffect(() => {
        if (!token) return;
        
        const fetchBaby = async () => {
            try {
                const endpoint = `${apiUrl}/api/v1/baby/${babyId}`;
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setBaby(data);

                    const [year, month, day] = data.birthDate.split("-").map(Number);
                    setYear(year);
                    setMonth(month);

                    if (day === 31) {
                        setDay(30);
                    } else {
                        setDay(day);
                    }
                    
                } else {
                    console.error("Error en la suscripción:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la suscripción:", error);
            }
        };
    
        fetchBaby();
    }, [token, babyId]);

    useEffect(() => {
        if (!token) return;
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

    function calcularZ(X: number, M: number, L: number, S: number): number {
        if (L === 0) {
            return Math.log(X / M) / S;
        }
        return (Math.pow(X / M, L) - 1) / (L * S);
    }

    return (

       <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>

        <ScrollView contentContainerStyle={[gs.containerMetric,{backgroundColor:"transparent"}]} showsVerticalScrollIndicator={false}>

        <Text style={[gs.headerText, { marginBottom: 20 }]}>📈 Gráficas de crecimiento</Text>

<View style={gs.separator} />

{baby && metrics && (
  <View style={[gs.cardMetric, { flex: 6, padding: 20, backgroundColor: "#ffffff", borderRadius: 16 }]}>
    <Text style={[gs.cardTitle, { fontSize: 20, marginBottom: 10, color: "#1565C0" }]}>
      👶 {baby.name}
    </Text>

    <Text style={gs.cardContent}>💪 Circunferencia del brazo: {metrics.armCircumference} cm</Text>
    <Text style={gs.cardContent}>🧠 Circunferencia de la cabeza: {metrics.headCircumference} cm</Text>
    <Text style={gs.cardContent}>📏 Altura: {metrics.height} cm</Text>
    <Text style={gs.cardContent}>⚖️ Peso: {metrics.weight} kg</Text>
    <Text style={gs.cardContent}>
      📅 Fecha de las métricas:{" "}
      {`${metrics.date[2].toString().padStart(2, '0')}/${metrics.date[1].toString().padStart(2, '0')}/${metrics.date[0]}`}
    </Text>

    <View style={gs.separator} />

    {metrics.date[0] !== nowYear || metrics.date[1] !== nowMonth || metrics.date[2] !== nowDay ? (
      <View style={{ marginTop: 20 }}>
        <Text style={[gs.cardContent, { color: "#E53935", marginBottom: 10 }]}>
          ⚠️ Las métricas del bebé no están actualizadas, por lo tanto las gráficas no reflejan los últimos datos. Por favor, actualízalas.
        </Text>

        <TouchableOpacity
          style={[gs.mainButton, { backgroundColor: "#0D47A1", marginTop: 10 }]}
          onPress={() => router.push(`/baby/addmetricas?babyId=${babyId}`)}
        >
          <Text style={gs.mainButtonText}>Actualizar métricas</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ marginTop: 20 }}>
        <Text style={[gs.cardContent, { color: "#388E3C", marginBottom: 10 }]}>
          ✅ Las métricas están actualizadas, pero puedes volver a actualizarlas si lo deseas.
        </Text>

        <TouchableOpacity
          style={[gs.mainButton, { backgroundColor: "#0D47A1", marginTop: 10 }]}
          onPress={() => router.push(`/baby/addmetricas?babyId=${babyId}`)}
        >
          <Text style={gs.mainButtonText}>Actualizar métricas</Text>
        </TouchableOpacity>
      </View>
    )}

    {subscription && (
      <View style={{ marginTop: 30 }}>
        <Text style={[gs.cardContent, { color: "#0D47A1", marginBottom: 10 }]}>
          🔍 Puedes acceder a métricas avanzadas para un análisis más detallado del crecimiento.
        </Text>

        <TouchableOpacity
          style={[gs.mainButton, { backgroundColor: "#1565C0" }]}
          onPress={() => router.push(`/baby/metricasavanzadas?babyId=${babyId}`)}
        >
          <Text style={gs.mainButtonText}>Métricas avanzadas</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
)}

            {baby?.genre == 'OTHER' && (
                <View style={[gs.cardMetric, { flex: 3 }]}>
                        <Text style={gs.cardContent}>Como en el género del bebe se puso otro, a continuación se le van a motrar las graficas 
                            tanto para niña como para niño, pero si prefiere solo ver una de las dos, pulse el botón correspondiente.
                        </Text>
                        <view style={gs.separator}/>
                        <View style={{ flexDirection: "column", alignItems: "center", gap: 10 }}>
                        <view style={gs.separator}/>
                            {!genreBoy && (<TouchableOpacity style={[gs.mainButton, 
                                (!genreGirl ? { backgroundColor: "blue" }: { backgroundColor: "red" })]
                                } onPress={() => setGenreGirl(!genreGirl)}>
                                {!genreGirl ? (<Text style={gs.mainButtonText}>Prefiero ver las métricas para niño</Text>)
                                : (<Text style={gs.mainButtonText}>Prefiero dejar de ver solo las métricas para niño</Text>)}
                            </TouchableOpacity>)}
                            {!genreGirl &&(<TouchableOpacity style={[gs.mainButton,
                                (!genreBoy ? { backgroundColor: "#ff00ec" }: { backgroundColor: "red" })]
                            } onPress={() => setGenreBoy(!genreBoy)}>
                                {!genreBoy ? (<Text style={gs.mainButtonText}>Prefiero ver las métricas para niña</Text>)
                                : (<Text style={gs.mainButtonText}>Prefiero dejar de ver solo las métricas para niña</Text>)}
                            </TouchableOpacity>)}
                        </View>
                </View>
            )}
            {(Math.abs(nowMonth - month) < 3 && Math.abs(nowYear - year) < 1) && (
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>Las puntuaciones z de la circunferencia del brazo solo abarca datos a partir de los 3 meses de edad</Text>
                </View>
            )}
            {(Math.abs(nowMonth - month) > 3 || Math.abs(nowYear - year) >= 1) && ((baby?.genre == 'MALE' || (baby?.genre == 'OTHER' && !genreBoy)) && ACBZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{ACBZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={ACBZ.image}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * ACBZ.cuadrante[Math.abs(nowYear - year)] - (13*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day),  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.844 - (37.80*(((metrics?.armCircumference ?? 10) < 10 ? 0 : 
                                    (metrics?.armCircumference ?? 10) > 23 ? 23 : ((metrics?.armCircumference ?? 10) - 10)))),
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{ACBZ.description[(
                        calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACBZD[((nowYear - year)*12 + (nowMonth - month))].L,ACBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            )}
            {(Math.abs(nowMonth - month) > 3 || Math.abs(nowYear - year) >= 1) && ((baby?.genre == 'FEMALE' ||  (baby?.genre == 'OTHER' && !genreGirl)) && ACGZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{ACGZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={ACGZ.image}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * ACGZ.cuadrante[Math.abs(nowYear - year)] - (12*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day),
                                    top: imageSize.height * 0.844 - (37.80*(((metrics?.armCircumference ?? 10) < 10 ? 0 : 
                                    (metrics?.armCircumference ?? 10) > 23 ? 23 : ((metrics?.armCircumference ?? 10) - 10)))),
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{ACGZ.description[(
                        calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.armCircumference ?? 11.5), ACGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        ACGZD[((nowYear - year)*12 + (nowMonth - month))].L,ACGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            )}
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && HCBZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HCBZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HCBZ.image[
                                (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * HCBZ.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? Math.abs(nowMonth - month) * 4 + Math.floor(Math.abs(nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - ((Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 8 * (Math.abs(nowDay - day) - (Math.floor(Math.abs(nowDay - day) / 7)*7)) : 
                                        (12.6*Math.abs(nowMonth - month)) + 0.43*Math.abs(nowDay - day))
                                        ,  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.843 - HCBZ.metrica[
                                        (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{HCBZ.description[(
                        calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCBZD[((nowYear - year)*12 + (nowMonth - month))].L,HCBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && HCGZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HCGZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HCGZ.image[
                                (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * (HCGZ.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? Math.abs(nowMonth - month) * 4 + Math.floor(Math.abs(nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - 0.0217*(Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? 0.26* (Math.abs(nowDay - day) - (Math.floor(Math.abs(nowDay - day) / 7)*7)) : 
                                        Math.abs(nowMonth - month) + 0.01*(Math.abs(nowDay - day)))),  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.843 - HCGZ.metrica[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{HCGZ.description[(
                        calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.headCircumference ?? 11.5), HCGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HCGZD[((nowYear - year)*12 + (nowMonth - month))].L,HCGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && HBZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                <Text style={gs.title}>{HBZ.title}</Text>
                <View style={gs.imageContainer}>
                    <Image 
                        source={HBZ.image[
                            (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                            (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)]}
                        style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                        resizeMode="contain"
                        onLayout={(event) => {
                            const { width, height } = event.nativeEvent.layout;
                            setImageSize({ width, height });
                        }}
                    />
                    <Image 
                        source={require("../../../static/images/baby-placeholder.png")} 
                        style={[
                            gs.babyImage,
                            {
                                right: imageSize.width * (HBZ.cuadrante[
                                    (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                    (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                ][
                                    Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? Math.abs(nowMonth - month) * 4 + Math.floor(Math.abs(nowDay - day) / 7)
                                    : (Math.abs(nowYear - year) - 2)])
                                    - (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? 3.5 * (Math.abs(nowDay - day) - (Math.floor(Math.abs(nowDay - day) / 7)*7))  : 
                                    (26*Math.abs(nowMonth - month)) + 0.43*Math.abs(nowDay - day)), 
                                top: imageSize.height * 0.84 - HBZ.metrica[
                                    (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                    (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                ],  // Ajusta según la posición deseada
                                width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                height: imageSize.width * 0.01, // Mantiene proporción
                                tintColor: (
                                    calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                ),
                            },
                        ]}
                    />
                </View>
                <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                <Text style={gs.description}>{HBZ.description[(
                    calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                    (calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                    && calcularZ((metrics?.height ?? 11.5), HBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                    HBZD[((nowYear - year)*12 + (nowMonth - month))].L,HBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && HGZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HGZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HGZ.image[
                                (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * (HGZ.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? Math.abs(nowMonth - month) * 4 + Math.floor(Math.abs(nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - 0.0217*(Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? 0.12 * (Math.abs(nowDay - day) - (Math.floor(Math.abs(nowDay - day) / 7)*7))  : 
                                        Math.abs(nowMonth - month) + 0.01*(Math.abs(nowDay - day)))),
                                    top: imageSize.height * 0.84 - HGZ.metrica[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{HGZ.description[(
                        calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.height ?? 11.5), HGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,HGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' || (baby?.genre == 'OTHER' && !genreBoy)) && WBZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WBZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WBZ.image[
                                (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * (WBZ.cuadrante[
                                        (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ][
                                        Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? Math.abs(nowMonth - month) * 4 + Math.floor(Math.abs(nowDay - day) / 7)
                                        : (Math.abs(nowYear - year) - 2)])
                                        - (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? 3.5 * (Math.abs(nowDay - day) - (Math.floor(Math.abs(nowDay - day) / 7)*7))  : 
                                        (22*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day)),
                                    top: imageSize.height * 0.84 - WBZ.metrica[
                                        (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ],
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{WBZ.description[(
                        calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        HGZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.weight ?? 11.5), WBZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WBZD[((nowYear - year)*12 + (nowMonth - month))].L,WBZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && WGZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WGZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WGZ.image[
                                (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]}
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * (WGZ.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? Math.abs(nowMonth - month) * 4 + Math.floor(Math.abs(nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - 0.0217*(Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? 0.12 * (Math.abs(nowDay - day) - (Math.floor(Math.abs(nowDay - day) / 7)*7))  : 
                                        Math.abs(nowMonth - month) + 0.01*(Math.abs(nowDay - day)))),
                                    top: imageSize.height * 0.84 - WGZ.metrica[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ], 
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? "#BE6B00":
                                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{WGZ.description[(
                        calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -3.0 ? 0:
                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -2.0
                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < -1.0
                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 1.0
                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 2.0
                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) < 3.0
                        && calcularZ((metrics?.weight ?? 11.5), WGZD[((nowYear - year)*12 + (nowMonth - month))].M,
                        WGZD[((nowYear - year)*12 + (nowMonth - month))].L,WGZD[((nowYear - year)*12 + (nowMonth - month))].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && WFHBZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WFHBZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WFHBZ.image[
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                            ]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * 0.764 - WFHBZ.height[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.84 -  WFHBZ.weight[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -2.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -1.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -2.0) ? "#BE6B00" :
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 1.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 2.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 3.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{WFHBZ.description[(
                        calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -3.0 ? 0:
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -2.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -1.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 1.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 2.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 3.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHBZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && WFHGZ != null &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WFHGZ.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WFHGZ.image[
                                (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                            ]}
                            style={[gs.imageMetric, { height: screenWidth * 0.48 }]} 
                            resizeMode="contain"
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                setImageSize({ width, height });
                            }}
                        />
                        <Image 
                            source={require("../../../static/images/baby-placeholder.png")} 
                            style={[
                                gs.babyImage,
                                {
                                    right: imageSize.width * 0.764 - WFHGZ.height[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.84 -  WFHGZ.weight[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: (
                                        calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -3.0 ? "black":
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -2.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -3.0) ? "red": 
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -1.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -2.0) ? "#BE6B00" :
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 1.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -1.0) ? "green" : 
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 2.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 1.0) ? "#BE6B00" : 
                                        (calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 3.0
                                        && calcularZ((metrics?.weight ?? 11.5), 
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 2.0) ? "red" : "black"
                                    ),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>La puntuación z de tu niño es: {calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S).toFixed(2)}, por lo cual llegamos a la siguente conclusión.</Text>
                    <Text style={gs.description}>{WFHGZ.description[(
                        calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -3.0 ? 0:
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -2.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -3.0) ? 1: 
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < -1.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -2.0) ? 2:
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 1.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= -1.0) ? 3 : 
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 2.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 1.0) ? 4 : 
                        (calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) < 3.0
                        && calcularZ((metrics?.weight ?? 11.5), 
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].M,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].L,
                        WFHGZD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].S) >= 2.0) ? 5 : 6
                    )]}</Text>
                </View>
            }
        </ScrollView>
        </View>
    );
}
