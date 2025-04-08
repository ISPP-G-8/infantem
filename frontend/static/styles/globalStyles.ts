'use strict';
import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", 
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
  },
  linkText: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },

  mainButton: {
    backgroundColor: "#1565C0", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mainButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#1565C0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#1565C0",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#AAB7C4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: "90%",
    alignSelf: "center" ,
  },

//////////////

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  scrollView: {
    width: '100%',
    marginBottom: 15
  },
  termsText: {
    fontSize: 14,
    lineHeight: 22
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '48%'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
/////////////

  input: {
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
  },
  inputFocused: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },

  card: {

    width: "90%", 
    //alignSelf: "flex-start", 

    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginVertical: 16,
  },

  navbarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007AFF",
  },

  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  navBar: {
    position: "absolute",
    width: Platform.OS === "ios" ? "100%" : StatusBar.currentHeight, 
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgb(0,122,255)",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15,

    // Sombra en iOS (más intensa y difuminada)
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 10 },  // Mucho más baja
    shadowOpacity: 0.7,  // Más oscura
    shadowRadius: 15,  // Mucho más difusa

    // Sombra en Android (elevation más alto)
    elevation: 25,  // Sombra mucho más intensa en Android
    
    flexWrap: "wrap",
},

  navText: {
    fontSize: width < 400 ? 14 : 16, // Reduce el tamaño en móviles pequeños
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 5, // Evita que las palabras estén demasiado pegadas
  },

  content: {
    flex: 1,
    paddingTop: 80, // Ajuste para que no quede oculto en iPhone
  }, 

  bannerContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    margin: 16,
    alignItems: "center",
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sentenceText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  

  // Prueba alvjimosu
  container2: {
    flex: 1,
    margin: 0, 
    padding: 0,
  },
  banner2: {
    width: '100%',
    height: height * 0.6, // Ajusta la altura del banner según tu necesidad
  },
  bannerImage2: {
    resizeMode: 'cover', // La imagen cubrirá el área sin distorsionarse
    backgroundColor: 'transparent', // Asegura que no haya color de fondo
  },
  // Estilos para el contenedor de reseñas
  reviewsContainer: {
    marginTop: width <789 ?  -250 : -100,  // Espaciado reducido para acercar las reseñas al banner
    paddingHorizontal: 20,
    marginBottom: width <789 ?  80 : 100,
  },
  reviewsTitle: {
    fontSize: 24,
    fontFamily: "Loubag-Bold",
    color: "#1565C0",
    marginBottom: 20,
    textAlign: "center",
  },
  reviewsCardContainer: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  reviewCard: {
    backgroundColor: "#FFF",
    padding: 20,
    width: '80%',
    marginBottom: 30,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewName: {
    fontSize: 22,
    fontFamily: "Loubag-Bold",
    color: "#1565C0",
    marginLeft: 10,
  },
  reviewText: {
    fontSize: 16,
    fontFamily: "Loubag-Regular",
    color: "#666",
    textAlign: "center",
  },
  starIcon: {
    width: 20,
    height: 20,
    marginLeft: 5, // Espacio entre las estrellas
  },
  footerContainer: {
    flex: 1,
    width: '100%', // Asegura que ocupe todo el ancho de la pantalla
    backgroundColor: "#c7e0ff", 
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 0, // Elimina el margen horizonta
    borderTopWidth: 1,
    borderTopColor: "#c7e0ff",
  },
  footerText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    textAlign: 'center', // Centra el texto
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
