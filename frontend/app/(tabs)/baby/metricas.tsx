import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions, Alert, Dimensions, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { useSearchParams } from "expo-router/build/hooks";
import {ACBP, ACGP, getHCBP, getHCGP, getHBP, getHGP, getWBP, getWGP, getWFHBP, getWFHGP} from "./constantes";
import ACBPD from "../../../static/data/boys/arm-circumference-boys-3-5.json";
import ACGPD from "../../../static/data/girls/arm-circumference-girls-3-5.json";
import HCBPD from "../../../static/data/boys/head-circumference-boys-0-5.json";
import HCGPD from "../../../static/data/girls/head-circumference-girls-0-5.json";
import HBPD from "../../../static/data/boys/height-boys-0-5.json";
import HGPD from "../../../static/data/girls/height-girls-0-5.json";
import WBPD from "../../../static/data/boys/weight-boys-0-5.json";
import WGPD from "../../../static/data/girls/weight-girls-0-5.json";
import WFHBPD from "../../../static/data/boys/weight-for-height-boys-0-5.json";
import WFHGPD from "../../../static/data/girls/weight-for-height-girls-0-5.json";
import { jwtDecode } from "jwt-decode";

export default function Metricas() {
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
    const HCBP = metrics ? getHCBP({ headCircumference: metrics.headCircumference }) : null;
    const HCGP = metrics ? getHCGP({ headCircumference: metrics.headCircumference }) : null;
    const HBP = metrics ? getHBP({ height: metrics.height }) : null;
    const HGP = metrics ? getHGP({ height: metrics.height }) : null;
    const WBP = metrics ? getWBP({ weight: metrics.weight }) : null;
    const WGP = metrics ? getWGP({ weight: metrics.weight }) : null;
    const WFHBP = metrics ? getWFHBP({ weight: metrics.weight, height: metrics.height }) : null;
    const WFHGP = metrics ? getWFHGP({ weight: metrics.weight, height: metrics.height }) : null;
    const [genreBoy, setGenreBoy] = useState(false);
    const [genreGirl, setGenreGirl] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [subscription, setSubscription] = useState(null);
    type Edad = {
        years: number;
        months: number;
        days: number;
    };

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
                const decodedToken: any = jwtDecode(token); // Verifica el contenido del token decodificado
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

    function calcularEdad(año: number, mes: number, dia: number): Edad {
        const hoy = new Date();
        const nacimiento = new Date(año, mes - 1, dia); // mes - 1 porque Date usa 0-11
      
        let years = hoy.getFullYear() - nacimiento.getFullYear();
        let months = hoy.getMonth() - nacimiento.getMonth();
        let days = hoy.getDate() - nacimiento.getDate();
      
        // Ajustamos si el día de nacimiento aún no se ha cumplido este mes
        if (days < 0) {
            months -= 1;
          // Obtenemos el último día del mes anterior
          const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
          days += ultimoDiaMesAnterior;
        }
      
        // Ajustamos si el mes de nacimiento aún no se ha cumplido este año
        if (months < 0) {
            years -= 1;
            months += 12;
        }
      
        return { years, months, days };
      }

    return (
        console.log(calcularEdad(year,month,day).years, calcularEdad(year,month,day).months, calcularEdad(year,month,day).days),
        <ScrollView contentContainerStyle={gs.containerMetric} showsVerticalScrollIndicator={false}>

            <Text style={gs.headerText}>Gráficas de crecimiento</Text>
            <view style={gs.separator}/>
            {baby && metrics && (
                <View style={[gs.cardMetric, { flex: 6   }]}>
                    <Text style={[gs.cardTitle, { fontSize: 18 }]}>{baby.name}</Text>
                    <Text style={gs.cardContent}>💪 Circunferencia del brazo: {metrics.armCircumference}</Text>
                    <Text style={gs.cardContent}>👶 Circunferencia de la cabeza: {metrics.headCircumference}</Text>
                    <Text style={gs.cardContent}>📏 Altura: {metrics.height} cm</Text>
                    <Text style={gs.cardContent}>⚖️ Peso: {metrics.weight} kg </Text>
                    <Text style={gs.cardContent}>📆 Fecha de las métricas: 
                        {` ${metrics.date[2].toString().padStart(2, '0')}/${metrics.date[1].toString().padStart(2, '0')}/${metrics.date[0]}`}
                    </Text>
                    <view style={gs.separator}/>
                    {metrics.date[0] !== nowYear || metrics.date[1] !== nowMonth || metrics.date[2] !== nowDay ? (
                        <View>
                            <Text style={gs.cardContent}>La medida del bebe no están actualizadas, 
                            por lo tanto las graficas no estarán actualizadas. Por favor, actulícelas</Text>
                            <view style={gs.separator}/>
                            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "green" }]} onPress={() => router.push(`/baby/addmetricas?babyId=${babyId}`)}>
                                <Text style={gs.mainButtonText}>Actualizar métricas</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <view style={gs.separator}/>
                            <view style={gs.separator}/>
                            <Text style={gs.cardContent}>La medida del bebe están actualizadas, 
                            pero las puede volver actualizar.</Text>
                            <view style={gs.separator}/>
                            <view style={gs.separator}/>
                            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "green" }]} onPress={() => router.push(`/baby/addmetricas?babyId=${babyId}`)}>
                                <Text style={gs.mainButtonText}>Actualizar métricas</Text>
                            </TouchableOpacity>
                        </View>
                    )}  
                    <view style={gs.separator}/>
                    {subscription && (
                        <View>
                            <view style={gs.separator}/>
                            <view style={gs.separator}/>
                            <Text style={gs.cardContent}>La medida del bebe están actualizadas, 
                            pero las puede volver actualizar.</Text>
                            <view style={gs.separator}/>
                            <view style={gs.separator}/>
                            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "blue" }]} onPress={() => router.push(`/baby/metricasavanzadas?babyId=${babyId}`)}>
                                <Text style={gs.mainButtonText}>Métricas avanzadas</Text>
                            </TouchableOpacity>
                        </View>
                        )
                    }
                </View>
            )}
            {baby?.genre == 'OTHER' && (
                <View style={[gs.cardMetric, { flex: 3 }]}>
                        <Text style={gs.cardContent}>Como el género del bebe se puso otro, a continuación se le van a motrar las graficas 
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
            {(calcularEdad(year,month,day).months < 3 && calcularEdad(year,month,day).years < 1) && (
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>El percentil de la circunferencia del brazo solo abarca datos a partir de los 3 meses de edad</Text>
                </View>
            )}
            {(calcularEdad(year,month,day).months > 3 || calcularEdad(year,month,day).years >= 1) && ((baby?.genre == 'MALE' || (baby?.genre == 'OTHER' && !genreBoy)) && ACBP && ACBPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{ACBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={ACBP.image}
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
                                    right: imageSize.width * ACBP.cuadrante[calcularEdad(year,month,day).years] - (13*(calcularEdad(year,month,day).months - 3)) - 0.43*calcularEdad(year,month,day).days,  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.844 - (57.8*(((metrics?.armCircumference ?? 11.5) < 11.5 ? 0 : 
                                    (metrics?.armCircumference ?? 11.5) > 20 ? 20 - 11.5: ((metrics?.armCircumference ?? 11.5) - 11.5)))),
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.armCircumference ?? 11.5) < ACBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                                || (metrics?.armCircumference ?? 11.5) > ACBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months - 3)].P97) ? 'red': 
                                                (((metrics?.armCircumference ?? 11.5) < ACBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                                && (metrics?.armCircumference ?? 11.5) > ACBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                                || ((metrics?.armCircumference ?? 11.5) < ACBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                                && (metrics?.armCircumference ?? 11.5) > ACBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{ACBP.description[(
                        (metrics?.armCircumference ?? 11.5) < ACBPD[((nowYear - year)*12 + (nowMonth - month))].P3 ? 0:
                        ((metrics?.armCircumference ?? 11.5) > ACBPD[((nowYear - year)*12 + (nowMonth - month))].P3 
                        && (metrics?.armCircumference ?? 11.5) < ACBPD[((nowYear - year)*12 + (nowMonth - month))].P15) ? 1: 
                        ((metrics?.armCircumference ?? 11.5) > ACBPD[((nowYear - year)*12 + (nowMonth - month))].P15 
                        && (metrics?.armCircumference ?? 11.5) < ACBPD[((nowYear - year)*12 + (nowMonth - month))].P85) ? 2:
                        ((metrics?.armCircumference ?? 11.5) > ACBPD[((nowYear - year)*12 + (nowMonth - month))].P85 
                        && (metrics?.armCircumference ?? 11.5) < ACBPD[((nowYear - year)*12 + (nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            )}
            {(calcularEdad(year,month,day).months > 3 || calcularEdad(year,month,day).years >= 1) && ((baby?.genre == 'FEMALE' ||  (baby?.genre == 'OTHER' && !genreGirl)) && ACBP && ACBPD  &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{ACGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={ACGP.image}
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
                                    right: imageSize.width *ACBP.cuadrante[calcularEdad(year,month,day).years] - (12*(calcularEdad(year,month,day).months - 3)) - 0.43*calcularEdad(year,month,day).days,
                                    top: imageSize.height * 0.843 - (51.6*(((metrics?.armCircumference ?? 11) < 11 ? 0 : 
                                    (metrics?.armCircumference ?? 11.5) > 20.5 ? 20.5 - 11 : ((metrics?.armCircumference ?? 11.5) - 11)))),
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.armCircumference ?? 11.5) < ACGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                    || (metrics?.armCircumference ?? 11.5) > ACGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months -  3)].P97) ? 'red': 
                                    (((metrics?.armCircumference ?? 11.5) < ACGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                    && (metrics?.armCircumference ?? 11.5) > ACGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                    || ((metrics?.armCircumference ?? 11.5) < ACGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                    && (metrics?.armCircumference ?? 11.5) > ACGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{ACGP.description[(
                        (metrics?.armCircumference ?? 11.5) < ACGPD[((nowYear - year)*12 + (nowMonth - month))].P3 ? 0:
                        ((metrics?.armCircumference ?? 11.5) > ACGPD[((nowYear - year)*12 + (nowMonth - month))].P3 
                        && (metrics?.armCircumference ?? 11.5) < ACGPD[((nowYear - year)*12 + (nowMonth - month))].P15) ? 1: 
                        ((metrics?.armCircumference ?? 11.5) > ACGPD[((nowYear - year)*12 + (nowMonth - month))].P15 
                        && (metrics?.armCircumference ?? 11.5) < ACGPD[((nowYear - year)*12 + (nowMonth - month))].P85) ? 2:
                        ((metrics?.armCircumference ?? 11.5) > ACGPD[((nowYear - year)*12 + (nowMonth - month))].P85 
                        && (metrics?.armCircumference ?? 11.5) < ACGPD[((nowYear - year)*12 + (nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            )}
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && HCBP && HCBPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HCBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HCBP.image[
                                (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3) ? 0 :
                                (calcularEdad(year,month,day).years <= 2 ? 1 : 2)]}
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
                                    right: imageSize.width * (HCBP.cuadrante[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)][
                                            calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? calcularEdad(year,month,day).months * 4 + Math.floor(calcularEdad(year,month,day).days / 7)
                                            : calcularEdad(year,month,day).years
                                        ] - 0.0217*(calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? 0.26* (calcularEdad(year,month,day).days - (Math.floor(calcularEdad(year,month,day).days / 7)*7)) : 
                                        (calcularEdad(year,month,day).months + 0.01*(calcularEdad(year,month,day).days)))),  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.843 - HCBP.metrica[
                                        (calcularEdad(year,month,day).years <= 0 && calcularEdad(year,month,day).months <= 3) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                    || (metrics?.headCircumference ?? 30.5) > HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97) ? 'red': 
                                    (((metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                    && (metrics?.headCircumference ?? 30.5) > HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                    || ((metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                    && (metrics?.headCircumference ?? 30.5) >= HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{HCBP.description[(
                        (metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 ? 0:
                        ((metrics?.headCircumference ?? 30.5) > HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                        && (metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15) ? 1: 
                        ((metrics?.headCircumference ?? 30.5) > HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                        && (metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85) ? 2:
                        ((metrics?.headCircumference ?? 30.5) >= HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 
                        && (metrics?.headCircumference ?? 30.5) < HCBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && HCGP && HCGPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HCGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HCGP.image[
                                (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3) ? 0 :
                                (calcularEdad(year,month,day).years <= 2 ? 1 : 2)]}
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
                                    right: imageSize.width * (HCGP.cuadrante[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)][
                                            calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? calcularEdad(year,month,day).months * 4 + Math.floor(calcularEdad(year,month,day).days / 7)
                                            : calcularEdad(year,month,day).years
                                        ] - 0.0217*(calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? 0.26* (calcularEdad(year,month,day).days - (Math.floor(calcularEdad(year,month,day).days / 7)*7)) : 
                                        (calcularEdad(year,month,day).months + 0.01*(calcularEdad(year,month,day).days)))),  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.843 - HCGP.metrica[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                    || (metrics?.headCircumference ?? 30.5) > HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97) ? 'red': 
                                    (((metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                    && (metrics?.headCircumference ?? 30.5) > HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                    || ((metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                    && (metrics?.headCircumference ?? 30.5) > HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{HCGP.description[(
                        (metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 ? 0:
                        ((metrics?.headCircumference ?? 30.5) > HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                        && (metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15) ? 1: 
                        ((metrics?.headCircumference ?? 30.5) > HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                        && (metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85) ? 2:
                        ((metrics?.headCircumference ?? 30.5) > HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 
                        && (metrics?.headCircumference ?? 30.5) < HCGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && HBP && HBPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                <Text style={gs.title}>{HBP.title}</Text>
                <View style={gs.imageContainer}>
                    <Image 
                        source={HBP.image[
                            (calcularEdad(year,month,day).years <= 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                            (calcularEdad(year,month,day).years <= 2? 1 : 2)]}
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
                                right: imageSize.width * (HBP.cuadrante[
                                    (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                    (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)][
                                        calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? calcularEdad(year,month,day).months * 4 + Math.floor(calcularEdad(year,month,day).days / 7)
                                        : calcularEdad(year,month,day).years
                                    ] - 0.0217*(calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? 0.12 * (calcularEdad(year,month,day).days - (Math.floor(calcularEdad(year,month,day).days / 7)*7))  : 
                                    calcularEdad(year,month,day).months + 0.01*(calcularEdad(year,month,day).days))),
                                top: imageSize.height * 0.84 - HBP.metrica[
                                    (calcularEdad(year,month,day).years <= 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                    (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)
                                ],  // Ajusta según la posición deseada
                                width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                height: imageSize.width * 0.01, // Mantiene proporción
                                tintColor: ((metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                || (metrics?.height ?? 45) > HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97) ? 'red': 
                                (((metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                && (metrics?.height ?? 45) > HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                || ((metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                && (metrics?.height ?? 45) > HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                        ]}
                    />
                </View>
                <Text style={gs.description}>{HBP.description[(
                        (metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 ? 0:
                        ((metrics?.height ?? 45) > HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                        && (metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15) ? 1: 
                        ((metrics?.height ?? 45) > HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                        && (metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85) ? 2:
                        ((metrics?.height ?? 45) > HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 
                        && (metrics?.height ?? 45) < HBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && HGP && HGPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HGP.image[
                                (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                (calcularEdad(year,month,day).years <= 2 ? 1 : 2)]}
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
                                    right: imageSize.width * (HGP.cuadrante[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)][
                                            calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? calcularEdad(year,month,day).months * 4 + Math.floor(calcularEdad(year,month,day).days / 7)
                                            : calcularEdad(year,month,day).years
                                        ] - 0.0217*(calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? 0.12 * (calcularEdad(year,month,day).days - (Math.floor(calcularEdad(year,month,day).days / 7)*7))  : 
                                        calcularEdad(year,month,day).months + 0.01*(calcularEdad(year,month,day).days))),
                                    top: imageSize.height * 0.84 - HGP.metrica[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)
                                    ],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                            || (metrics?.height ?? 45) > HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97) ? 'red': 
                                            (((metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                            && (metrics?.height ?? 45) > HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                            || ((metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                            && (metrics?.height ?? 45) > HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{HGP.description[(
                        (metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 ? 0:
                        ((metrics?.height ?? 45) > HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                        && (metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15) ? 1: 
                        ((metrics?.height ?? 45) > HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                        && (metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85) ? 2:
                        ((metrics?.height ?? 45) > HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 
                        && (metrics?.height ?? 45) < HGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' || (baby?.genre == 'OTHER' && !genreBoy)) && WBP && WBPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WBP.image[
                                (calcularEdad(year,month,day).years <= 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                (calcularEdad(year,month,day).years <= 2 ? 1 : 2)]}
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
                                    right: imageSize.width * (WBP.cuadrante[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)][
                                            calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? calcularEdad(year,month,day).months * 4 + Math.floor(calcularEdad(year,month,day).days / 7)
                                            : calcularEdad(year,month,day).years
                                        ] - 0.0217*(calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? 0.12 * (calcularEdad(year,month,day).days - (Math.floor(calcularEdad(year,month,day).days / 7)*7))  : 
                                        (calcularEdad(year,month,day).months + 0.01*(calcularEdad(year,month,day).days)))),
                                    top: imageSize.height * 0.84 - WBP.metrica[
                                        (calcularEdad(year,month,day).years <= 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)
                                    ],
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                            || (metrics?.weight ?? 1) > WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                            && (metrics?.weight ?? 1) > WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                            || ((metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                            && (metrics?.weight ?? 1) > WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WBP.description[(
                        (metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 ? 0:
                        ((metrics?.weight ?? 1) > WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                        && (metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                        && (metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85) ? 2:
                        ((metrics?.weight ?? 1) > WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 
                        && (metrics?.weight ?? 1) < WBPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && WGP && WBPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WGP.image[
                                (calcularEdad(year,month,day).years <= 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                (calcularEdad(year,month,day).years <= 2 ? 1 : 2)]}
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
                                    right: imageSize.width * (WGP.cuadrante[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)][
                                            calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? calcularEdad(year,month,day).months * 4 + Math.floor(calcularEdad(year,month,day).days / 7)
                                            : calcularEdad(year,month,day).years
                                        ] - 0.0217*(calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 3 ? 0.12 * (calcularEdad(year,month,day).days - (Math.floor(calcularEdad(year,month,day).days / 7)*7))  : 
                                        (calcularEdad(year,month,day).months + 0.01*(calcularEdad(year,month,day).days)))),
                                    top: imageSize.height * 0.84 - WGP.metrica[
                                        (calcularEdad(year,month,day).years == 0 && calcularEdad(year,month,day).months <= 6) ? 0 :
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 1 : 2)
                                    ], 
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                                            || (metrics?.weight ?? 1) > WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                                            && (metrics?.weight ?? 1) > WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3)
                                            || ((metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97 
                                            && (metrics?.weight ?? 1) > WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WGP.description[(
                        (metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 ? 0:
                        ((metrics?.weight ?? 1) > WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P3 
                        && (metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P15 
                        && (metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P85) ? 2:
                        ((metrics?.weight ?? 1) > WGPD[((nowYear - year)*12 + calcularEdad(year,month,day).months)].P85 
                        && (metrics?.weight ?? 1) < WGPD[(calcularEdad(year,month,day).years*12 + calcularEdad(year,month,day).months)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && WFHBP && WFHBPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WFHBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WFHBP.image[
                                (calcularEdad(year,month,day).years <= 2 ? 0 : 1)
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
                                    right: imageSize.width * 0.764 - WFHBP.height[
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.84 -  WFHBP.weight[
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                        Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                                            || (metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15  
                                            && (metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 )
                                            || ((metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97  
                                            && (metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WFHBP.description[(
                        (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 ? 0:
                        ((metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                        && (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15 
                        && (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? 2:
                        ((metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85 
                        && (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && WFHGP && WFHGPD &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WFHGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WFHGP.image[
                                (calcularEdad(year,month,day).years <= 2? 0 : 1)
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
                                    right: imageSize.width * 0.764 - WFHGP.height[
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.84 -  WFHGP.weight[
                                        (calcularEdad(year,month,day).years <= 2 || calcularEdad(year,month,day).months <= 0 ? 0 : 1)
                                    ],
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                        Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                                            || (metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15  
                                            && (metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 )
                                            || ((metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97  
                                            && (metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                                                Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WFHGP.description[(
                        (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 ? 0:
                        ((metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                        && (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15 
                        && (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? 2:
                        ((metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85 
                        && (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2) < 45 ? 45 : 
                            Math.floor(((metrics?.height ?? 45) - 45) * 2) > 120 ? 120 : Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
        </ScrollView>
    );
}
