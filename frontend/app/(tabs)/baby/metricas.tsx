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
                    setYear(data.birthDate[0]);
                    setMonth(data.birthDate[1]);
                    if(data.birthDate[2] == 31){
                        setDay(30);
                    } else{
                        setDay(data.birthDate[2]);
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



    return (
        <ScrollView contentContainerStyle={gs.containerMetric} showsVerticalScrollIndicator={false}>

            <Text style={gs.headerText}>Gráficas de crecimiento</Text>
            <view style={gs.separator}/>
            {baby && metrics && (
                <View style={[gs.cardMetric, { flex: 3 }]}>
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
                            <Text style={gs.cardContent}>La medida del bebe están actualizadas, 
                            pero las puede volver actualizar.</Text>
                            <view style={gs.separator}/>
                            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "green" }]} onPress={() => router.push(`/baby/addmetricas?babyId=${babyId}`)}>
                                <Text style={gs.mainButtonText}>Actualizar métricas</Text>
                            </TouchableOpacity>
                        </View>
                    )}  
                    <view style={gs.separator}/>
                </View>
            )}
            {baby?.genre == 'OTHER' && (
                <View style={[gs.cardMetric, { flex: 2 }]}>
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
            {(Math.abs(nowMonth - month) < 3 || Math.abs(nowYear - year) < 1) && (
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>El percentil de la circunferencia del brazo solo abarca datos a partir de los 3 meses de edad</Text>
                </View>
            )}
            {(Math.abs(nowMonth - month) > 3 || Math.abs(nowYear - year) >= 1) && ((baby?.genre == 'MALE' || (baby?.genre == 'OTHER' && !genreBoy)) &&
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
                                    right: imageSize.width * ACBP.cuadrante[Math.abs(nowYear - year)] - (13*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day),  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.844 - (57.8*(((metrics?.armCircumference ?? 11.5) < 11.5 ? 0 : 
                                    (metrics?.armCircumference ?? 11.5) > 20 ? 20 : ((metrics?.armCircumference ?? 11.5) - 11.5)))),
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.armCircumference ?? 11.5) < ACBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                                || (metrics?.armCircumference ?? 11.5) > ACBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month) - 3)].P97) ? 'red': 
                                                (((metrics?.armCircumference ?? 11.5) < ACBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                                && (metrics?.armCircumference ?? 11.5) > ACBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                                || ((metrics?.armCircumference ?? 11.5) < ACBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                                && (metrics?.armCircumference ?? 11.5) > ACBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),
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
            {(Math.abs(nowMonth - month) > 3 || Math.abs(nowYear - year) >= 1) && ((baby?.genre == 'FEMALE' ||  (baby?.genre == 'OTHER' && !genreGirl)) &&
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
                                    right: imageSize.width * ACGP.cuadrante[Math.abs(nowYear - year)] - (12*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day),
                                    top: imageSize.height * 0.843 - (47*(((metrics?.armCircumference ?? 11) < 11 ? 0 : 
                                    (metrics?.armCircumference ?? 11.5) > 21.5 ? 21.5 : ((metrics?.armCircumference ?? 11.5) - 11)))),
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.armCircumference ?? 11.5) < ACGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                    || (metrics?.armCircumference ?? 11.5) > ACGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month) -  3)].P97) ? 'red': 
                                    (((metrics?.armCircumference ?? 11.5) < ACGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                    && (metrics?.armCircumference ?? 11.5) > ACGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                    || ((metrics?.armCircumference ?? 11.5) < ACGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                    && (metrics?.armCircumference ?? 11.5) > ACGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
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
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && HCBP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HCBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HCBP.image[
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
                                    right: imageSize.width * HCBP.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? Math.abs(nowMonth - month) * 4 + Math.floor((nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] -((Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 8 * Math.abs(nowDay - day) : 
                                        (12.6*Math.abs(nowMonth - month)) + 0.43*Math.abs(nowDay - day))
                                        ,  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.843 - HCBP.metrica[
                                        (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                    || (metrics?.headCircumference ?? 30.5) > HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97) ? 'red': 
                                    (((metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                    && (metrics?.headCircumference ?? 30.5) > HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                    || ((metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                    && (metrics?.headCircumference ?? 30.5) >= HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{HCBP.description[(
                        (metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 ? 0:
                        ((metrics?.headCircumference ?? 30.5) > HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                        && (metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15) ? 1: 
                        ((metrics?.headCircumference ?? 30.5) > HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                        && (metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85) ? 2:
                        ((metrics?.headCircumference ?? 30.5) >= HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 
                        && (metrics?.headCircumference ?? 30.5) < HCBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && HCGP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HCGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HCGP.image[
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
                                    right: imageSize.width * (HCGP.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? Math.abs(nowMonth - month) * 4 + Math.floor((nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - 0.0217*(Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? 0.26 * Math.abs(nowDay - day) : 
                                        Math.abs(nowMonth - month) + 0.01*(Math.abs(nowDay - day)))),  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.843 - HCGP.metrica[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                    || (metrics?.headCircumference ?? 30.5) > HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97) ? 'red': 
                                    (((metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                    && (metrics?.headCircumference ?? 30.5) > HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                    || ((metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                    && (metrics?.headCircumference ?? 30.5) > HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{HCGP.description[(
                        (metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 ? 0:
                        ((metrics?.headCircumference ?? 30.5) > HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                        && (metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15) ? 1: 
                        ((metrics?.headCircumference ?? 30.5) > HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                        && (metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85) ? 2:
                        ((metrics?.headCircumference ?? 30.5) > HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 
                        && (metrics?.headCircumference ?? 30.5) < HCGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && HBP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                <Text style={gs.title}>{HBP.title}</Text>
                <View style={gs.imageContainer}>
                    <Image 
                        source={HBP.image[
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
                                right: imageSize.width * (HBP.cuadrante[
                                    (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                    (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                ][
                                    Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? Math.abs(nowMonth - month) * 4 + Math.floor((nowDay - day) / 7)
                                    : (Math.abs(nowYear - year) - 2)])
                                    - (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? 3.5 * Math.abs(nowDay - day) : 
                                    (22*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day)), 
                                top: imageSize.height * 0.84 - HBP.metrica[
                                    (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                    (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                ],  // Ajusta según la posición deseada
                                width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                height: imageSize.width * 0.01, // Mantiene proporción
                                tintColor: ((metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                || (metrics?.height ?? 45) > HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97) ? 'red': 
                                (((metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                && (metrics?.height ?? 45) > HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                || ((metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                && (metrics?.height ?? 45) > HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                        ]}
                    />
                </View>
                <Text style={gs.description}>{HBP.description[(
                        (metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 ? 0:
                        ((metrics?.height ?? 45) > HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                        && (metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15) ? 1: 
                        ((metrics?.height ?? 45) > HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                        && (metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85) ? 2:
                        ((metrics?.height ?? 45) > HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 
                        && (metrics?.height ?? 45) < HBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && HGP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{HGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={HGP.image[
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
                                    right: imageSize.width * (HGP.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? Math.abs(nowMonth - month) * 4 + Math.floor((nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - 0.0217*(Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? 0.12 * Math.abs(nowDay - day) : 
                                        Math.abs(nowMonth - month) + 0.01*(Math.abs(nowDay - day)))),
                                    top: imageSize.height * 0.84 - HGP.metrica[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                            || (metrics?.height ?? 45) > HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97) ? 'red': 
                                            (((metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                            && (metrics?.height ?? 45) > HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                            || ((metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                            && (metrics?.height ?? 45) > HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{HGP.description[(
                        (metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 ? 0:
                        ((metrics?.height ?? 45) > HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                        && (metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15) ? 1: 
                        ((metrics?.height ?? 45) > HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                        && (metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85) ? 2:
                        ((metrics?.height ?? 45) > HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 
                        && (metrics?.height ?? 45) < HGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' || (baby?.genre == 'OTHER' && !genreBoy)) && WBP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WBP.image[
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
                                    right: imageSize.width * (WBP.cuadrante[
                                        (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ][
                                        Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? Math.abs(nowMonth - month) * 4 + Math.floor((nowDay - day) / 7)
                                        : (Math.abs(nowYear - year) - 2)])
                                        - (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6 ? 3.5 * Math.abs(nowDay - day) : 
                                        (22*Math.abs(nowMonth - month)) - 0.43*Math.abs(nowDay - day)),
                                    top: imageSize.height * 0.84 - WBP.metrica[
                                        (Math.abs(nowYear - year) <= 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ],
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                            || (metrics?.weight ?? 1) > WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                            && (metrics?.weight ?? 1) > WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                            || ((metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                            && (metrics?.weight ?? 1) > WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WBP.description[(
                        (metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 ? 0:
                        ((metrics?.weight ?? 1) > WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                        && (metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                        && (metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85) ? 2:
                        ((metrics?.weight ?? 1) > WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 
                        && (metrics?.weight ?? 1) < WBPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && WGP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WGP.image[
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
                                    right: imageSize.width * (WGP.cuadrante[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)][
                                            Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? Math.abs(nowMonth - month) * 4 + Math.floor((nowDay - day) / 7)
                                            : Math.abs(nowYear - year)
                                        ] - 0.0217*(Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 3 ? 0.12 * Math.abs(nowDay - day) : 
                                        Math.abs(nowMonth - month) + 0.01*(Math.abs(nowDay - day)))),
                                    top: imageSize.height * 0.84 - WGP.metrica[
                                        (Math.abs(nowYear - year) == 0 && Math.abs(nowMonth - month) <= 6) ? 0 :
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 1 : 2)
                                    ], 
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                                            || (metrics?.weight ?? 1) > WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                                            && (metrics?.weight ?? 1) > WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3)
                                            || ((metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97 
                                            && (metrics?.weight ?? 1) > WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85 ) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                            },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WGP.description[(
                        (metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 ? 0:
                        ((metrics?.weight ?? 1) > WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P3 
                        && (metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P15 
                        && (metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P85) ? 2:
                        ((metrics?.weight ?? 1) > WGPD[((nowYear - year)*12 + Math.abs(nowMonth - month))].P85 
                        && (metrics?.weight ?? 1) < WGPD[(Math.abs(nowYear - year)*12 + Math.abs(nowMonth - month))].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'MALE' ||  (baby?.genre == 'OTHER' && !genreBoy)) && WFHBP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WFHBP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WFHBP.image[
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
                                    right: imageSize.width * 0.764 - WFHBP.height[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.84 -  WFHBP.weight[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                                            || (metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15  
                                            && (metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 )
                                            || ((metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97  
                                            && (metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WFHBP.description[(
                        (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 ? 0:
                        ((metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                        && (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15 
                        && (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? 2:
                        ((metrics?.weight ?? 1) > WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85 
                        && (metrics?.weight ?? 1) < WFHBPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
            {(baby?.genre == 'FEMALE' || (baby?.genre == 'OTHER' && !genreGirl)) && WFHGP &&
                <View style={[gs.cardMetric, { width: screenWidth * 0.95 }]}>
                    <Text style={gs.title}>{WFHGP.title}</Text>
                    <View style={gs.imageContainer}>
                        <Image 
                            source={WFHGP.image[
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
                                    right: imageSize.width * 0.764 - WFHGP.height[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],  // Ajusta según la posición deseada
                                    top: imageSize.height * 0.84 -  WFHGP.weight[
                                        (Math.abs(nowYear - year) <= 2 || Math.abs(nowMonth - month) <= 0 ? 0 : 1)
                                    ],
                                    width: imageSize.width * 0.01, // Ajusta el tamaño en proporción a la gráfica
                                    height: imageSize.width * 0.01, // Mantiene proporción
                                    tintColor: ((metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                                            || (metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97) ? 'red': 
                                            (((metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15  
                                            && (metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 )
                                            || ((metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97  
                                            && (metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? '#BE6B00' : 'green'),  // Cambia las líneas negras a rojo
                                },
                            ]}
                        />
                    </View>
                    <Text style={gs.description}>{WFHGP.description[(
                        (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 ? 0:
                        ((metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P3 
                        && (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15) ? 1: 
                        ((metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P15 
                        && (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85) ? 2:
                        ((metrics?.weight ?? 1) > WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P85 
                        && (metrics?.weight ?? 1) < WFHGPD[Math.floor(((metrics?.height ?? 45) - 45) * 2)].P97)? 3 : 4
                    )]}</Text>
                </View>
            }
        </ScrollView>
    );
}
