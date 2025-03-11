import { useState } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput, Modal } from "react-native";
import NavBar from "../components/NavBar";

export default function Page() {
  const [isModalVisible, setModalVisible] = useState(false);
  const gs = require("../static/styles/globalStyles");

  return (

    <View style={{ flex: 1 }}>

      {}
      <NavBar />

      {}
      <ScrollView contentContainerStyle={[gs.container, { marginTop: 70 }]}>
        <Text style={gs.headerText}>Style Showcase</Text>
        <Text style={gs.subHeaderText}>This page demonstrates the global styles.</Text>
        <Text style={gs.bodyText}>It will be removed soon.</Text>

        <Image source={require("../static/images/sample-image.webp")} style={gs.image} />

        <TouchableOpacity style={gs.mainButton}>
          <Text style={gs.mainButtonText}>Main Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={gs.secondaryButton}>
          <Text style={gs.secondaryButtonText}>Secondary Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={gs.disabledButton} disabled>
          <Text style={gs.mainButtonText}>Disabled Button</Text>
        </TouchableOpacity>

        <Text style={gs.subHeaderText}>Input Field</Text>
        <TextInput style={gs.input} placeholder="Enter text..." />
        <TextInput style={[gs.input, gs.inputFocused]} placeholder="Focused input..." />
        <Text style={gs.errorText}>This is an error message.</Text>

        <View style={gs.card}>
          <Text style={gs.cardTitle}>Card Title</Text>
          <Text style={gs.cardContent}>This is an example of a styled card.</Text>
        </View>

        <Image source={require("../static/images/profile.webp")} style={gs.profileImage} />

        <TouchableOpacity style={gs.mainButton} onPress={() => setModalVisible(true)}>
          <Text style={gs.mainButtonText}>Open Modal</Text>
        </TouchableOpacity>

        <Modal transparent={true} visible={isModalVisible} animationType="fade">
          <View style={gs.modal}>
            <View style={gs.modalContent}>
              <Text style={gs.cardTitle}>Modal Example</Text>
              <Text style={gs.bodyText}>This is how modals will look.</Text>

              <TouchableOpacity style={gs.mainButton} onPress={() => setModalVisible(false)}>
                <Text style={gs.mainButtonText}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

    </View>

  );
}



