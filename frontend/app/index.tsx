import { Link, Redirect, SplashScreen } from "expo-router";
import { View, Text, Image, Dimensions, ScrollView, ImageBackground,Linking, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import TermsConditionsModal from "../components/TermsConditionsModal";


export default function Index() {
  const { isAuthenticated } = useAuth();
  const gs = require("../static/styles/globalStyles");
  const { height } = Dimensions.get("window");

  const [modalVisible, setModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(Dimensions.get("window").width < 768);

  // Detecta el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const { width } = Dimensions.get("window");
      setIsMobile(width < 768); 
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "Loubag-Regular": require("../assets/fonts/Loubag-Regular.ttf"),
    "Loubag-Medium": require("../assets/fonts/Loubag-Medium.ttf"),
    "Loubag-Bold": require("../assets/fonts/Loubag-Bold.ttf"),
    "Loubag-Light": require("../assets/fonts/Loubag-Light.ttf"),
  });

  const features = [
    {
      title: "1. Recomendaciones",
      desc: "Recetas personalizadas para ti y tu bebé según sus necesidades.",
      icon: require("../static/images/Pot.png"),
    },
    {
      title: "2. Detección de Alergias",
      desc: "Identifica ingredientes peligrosos con alertas inteligentes.",
      icon: require("../static/images/Inhaler.png"),
    },
    {
      title: "3. MarketPlace",
      desc: "Compra productos confiables y aprobados en un solo lugar.",
      icon: require("../static/images/Marketplace.png"),
    },
    {
      title: "4. Calendario Inteligente",
      desc: "Organiza hitos, recordatorios y seguimiento del desarrollo.",
      icon: require("../static/images/Calendar.png"),
    },
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);  // Estado para rotar las reseñas

  const reviews = [
    {
      name: "María Gómez",
      text: "Me ha ayudado mucho a planificar las comidas de mi bebé, ¡es muy fácil de usar y súper útil!",
      stars: 5,
    },
    {
      name: "Carlos Pérez",
      text: "¡Una herramienta increíble! Las recetas personalizadas son perfectas para las necesidades de mi bebé.",
      stars: 5,
    },
    {
      name: "Lucía Martínez",
      text: "Me encanta que puedo controlar la dieta de mi bebé y las alertas por alergias me han sido muy útiles.",
      stars: 5,
    },
  ];

  useEffect(() => {
    // Rotación de las reseñas cada 3 segundos
    const intervalId = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Cambiar la reseña
    }, 5000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, [reviews.length]);

  // Removed duplicate declarations of width and isMobile

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  if (isAuthenticated) return <Redirect href="recipes" />;

  const renderStars = (stars: number) => {
    const starArray = Array(stars).fill(true); // Crear un array de estrellas
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 0
       }}>
        {starArray.map((_, index) => (
          <Image
            key={index}
            source={require("../static/images/star.png")}
            style={gs.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 0, paddingBottom: 0 }}>
        <View style={{ width: "110%", height: height, marginHorizontal: 0, marginTop: 0,marginBottom: 0 }}>
          <ImageBackground
            source={isMobile
              ? require("../static/images/Background3.0.png") // Imagen para móvil
              : require("../static/images/Background2.0.png")} // Imagen para web
            style={[gs.banner2,{height: isMobile ? height * 0.6 : height * 0.8}]}
            imageStyle={gs.bannerImage2}
          >
          </ImageBackground>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: "10%",
              position: "absolute",
              top: isMobile ? 235: 115,
            }}
          >
            <Text
              style={{
                marginTop: 0,
                color: "#1565C0",
                fontFamily: "Loubag-Regular",
                fontSize: isMobile ? 30 : 36,
              }}>El mejor cuidado{" "}

            </Text>
            <Text style={{
              color: "#1565C0",
              fontFamily: "Loubag-Bold",
              fontSize: isMobile ? 45 : 50,
              marginBottom: 15,
            }}>para tu bebé</Text>

            <Link
              style={[
                gs.secondaryButton,
                {
                  width: 180,
                  backgroundColor: "#1565C0",
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#1565C0",
                  alignItems: "center",
                  marginTop: 0,
                },
              ]}
              href={"/signup"}
            >
              <Text
                style={[
                  gs.secondaryButtonText,
                  { color: "white", fontSize: 16, fontWeight: "bold" },
                ]}
              >
                ¡Empieza ahora!
              </Text>
            </Link>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#BBDEFB",
            padding: 30,
            borderRadius: 20,
            marginHorizontal: 20,
            marginTop: 0,

          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Loubag-Bold",
              textAlign: "center",
              color: "#0D47A1",
              marginBottom: 30,
            }}
          >
            ¿Cómo te ayudamos?
          </Text>

          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 30,
              flexWrap: "wrap",
            }}
          >
            {features.map((feature, index) => (
              <View
                key={index}
                style={{
                  width: isMobile ? "100%" : "23%",
                  alignItems: "center",
                }}
              >
                <Image
                  source={feature.icon}
                  style={{ width: 250, height: 250, marginBottom: 0 }}
                  resizeMode="contain"
                />
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
        </View>
        <View style={[gs.reviewsContainer,{marginTop:60,marginBottom:50}] }>
          <Text style={gs.reviewsTitle}>Lo que dicen nuestros usuarios</Text>
          <View style={gs.reviewsCardContainer}>
            <View style={gs.reviewCard}>
              <View style={gs.reviewHeader}>
                <Text style={gs.reviewName}>{reviews[currentReviewIndex].name}</Text>
              </View>
              {renderStars(reviews[currentReviewIndex].stars)}
              <Text style={gs.reviewText}>{reviews[currentReviewIndex].text}</Text>
            </View>
          </View>
        </View>
       
        <View
          style={{
          backgroundColor: "#BBDEFB",
          padding: 20,
          marginTop: 50,
          marginHorizontal: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#90CAF9",
        }}
      >
      <Text
        style={{
        fontFamily: "Loubag-Medium",
        fontSize: 28,
        textAlign: "center",
        marginBottom: 20,
        color: "#0D47A1",
      }}
    >
    Hacemos tu vida <Text style={{ fontFamily: "Loubag-Bold",color: "#0D47A1" }}>más fácil</Text>
    </Text>

      <View
      style={{
        flexDirection: "row",
        backgroundColor: "#BBDEFB",
        borderBottomWidth: 2,
        borderColor: "#BBDEFB",
        paddingVertical: 10,
      }}
    >
    <Text style={{ flex: 2, fontFamily: "Loubag-Bold", fontSize: 16, color: "#0D47A1" }}>Ventajas</Text>
    <Text style={{ flex: 1, fontFamily: "Loubag-Bold", fontSize: 16, textAlign: "center", color: "#0D47A1" }}>Infantem</Text>
    <Text style={{ flex: 1, fontFamily: "Loubag-Bold", fontSize: 16, textAlign: "center", color: "#0D47A1" }}>Tradicional</Text>
  </View>

  {[
    "Recomendaciones personalizadas",
    "Validado por expertos",
    "Contenido actualizado",
    "Acceso rápido y sencillo",
  ].map((item, index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: index < 3 ? 1 : 0,
        borderColor: "white",
        alignItems: "center",
      }}
    >
      <Text style={{ flex: 2, fontFamily: "Loubag-Regular", fontSize: 15, color: "#0D47A1" }}>{item}</Text>
      <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>✅</Text>
      <Text style={{ flex: 1, textAlign: "center", fontSize: 18, color: "#E53935" }}>❌</Text>
    </View>
  ))}
</View>
<View
  style={{
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 100,
    marginLeft:30,
    gap: 30,
  }}
>
  {/* Texto de plataformas */}
  <View
    style={{
      flex: 1,
      backgroundColor: "transparent",
      padding:0,
      justifyContent: "center",
      marginTop:20,
    }}
  >
    <Text
      style={{
        fontFamily: "Loubag-Bold",
        fontSize: 26,
        textAlign: "center",
        marginBottom: 10,
        color: "#0D47A1",
      }}
    >
      Disponible en todas las plataformas
    </Text>
    <Text
      style={{
        fontFamily: "Loubag-Regular",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 0,
        color: "#1565C0",
      }}
    >
      Disfruta de Infantem en cualquier dispositivo. ¡Siempre a tu alcance!
    </Text>

    {/* Plataformas */}
    <View
  style={{
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
    marginHorizontal: 20,
    gap: 30,
  }}
>
  {/* Texto de plataformas a la izquierda */}
  <View
    style={{
      flex: 1,
      padding: 10,
    }}
  >

    {/* Plataformas */}
    <View
      style={{
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "flex-start",
        alignItems: isMobile ? "center" : "flex-start",
        gap: 15,
        flexWrap: "wrap",
      }}
    >
      {[ 
        {
          icon: "🌍",
          title: "Web",
          desc: "Accede desde cualquier navegador sin instalaciones.",
        },
        {
          icon: "📱",
          title: "Android",
          desc: "Descárgala en Google Play y lleva Infantem contigo.",
        },
        {
          icon: "🍏",
          title: "iOS",
          desc: "Disponible en la App Store para iPhone y iPad.",
        },
      ].map((platform, index) => (
        <View
          key={index}
          style={{
            width: isMobile ? "90%" : "30%",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#E0E0E0",
          }}
        >
          <Text style={{ fontSize: 36, marginBottom: 8 }}>{platform.icon}</Text>
          <Text
            style={{
              fontFamily: "Loubag-Bold",
              fontSize: 16,
              color: "#0D47A1",
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            {platform.title}
          </Text>
          <Text
            style={{
              fontFamily: "Loubag-Regular",
              fontSize: 13,
              color: "#1565C0",
              textAlign: "center",
            }}
          >
            {platform.desc}
          </Text>
        </View>
      ))}
    </View>
  </View>
  {/* Imagen Phone a la derecha */}
  {!isMobile && (
    <Image
      source={require("../static/images/Phone.png")}
      style={{
        width: "30%",
        height: height * 0.8,
        resizeMode: "contain",
        alignSelf: "flex-end",
        marginRight: 0,
      }}
    />
  )}
</View>
</View>
</View>
 {/* Footer con el estilo fijo al fondo */}
 <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#BBDEFB', paddingVertical: 10 }}>
          <Text style={gs.footerText}>© 2025 Infantem. Todos los derechos reservados. </Text>
          <View style={gs.footerLinks}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={gs.footerLink}>Términos</Text>
              <TermsConditionsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com/privacy')}>
              <Text style={gs.footerLink}>Privacidad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com/contact')}>
              <Text style={gs.footerLink}>Contacto</Text>
            </TouchableOpacity>
          </View>  
          </View>

      </ScrollView>
    </View>
  );
}
