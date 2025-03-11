'use strict';
import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
    backgroundColor: "#007AFF", 
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
    borderColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007AFF",
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

  input: {
    width: "90%",
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

    width: "100%", 
    alignSelf: "flex-start", 

    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
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
    width: Platform.OS === "ios" ? "100%" : StatusBar.currentHeight,  // Ajuste para iPhone con notch
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgb(0,122,255)",
    height: 60, // Fija la altura en píxeles para evitar % inconsistentes
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15, // Mejor espaciado en móvil
    elevation: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    flexWrap: "wrap",
  },
  navBarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  

});
