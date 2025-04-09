import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, TextInput, Alert, ImageBackground } from "react-native";
import { Text, View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import UploadImageModal from "../../../components/UploadImageModal";
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';


const avatarOptions = [
  require("../../../assets/avatar/avatar1.png"),
  require("../../../assets/avatar/avatar2.png")
];

export default function Account() {
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [userId, setUserId] = useState<number | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { isLoading, user, token, setUser, updateToken, checkAuth, signOut } = useAuth();
  const [image, setImage] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);

  const FormData = global.FormData;

  useEffect(() => {
    if (!token) return;
    console.log(token);
    try {
      const decodedToken: any = jwtDecode(token);
      setUserId(decodedToken.jti);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }, [token]);


  useEffect(() => {
    if (!user || !token) return;

    const fetchSubscription = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/subscriptions/user/${user.id}`, {
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
        console.log("Subscription data:", data);
        setSubscription(data);
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setSubscription(null);
      }
    };

    fetchSubscription();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (!user) {
      console.log("No hay usuario disponible.");
      return;
    }
  
    if (!token) return;
  
    try {
      const formData = new FormData();
  
      if (image) {
        const fileToUpload = new File(
          [image], 
          `${user.username}_avatar.png`, 
          { type: image.type || "image/png" }
        );
  
        formData.append('profilePhoto', fileToUpload);
      }
  
      formData.append('user', JSON.stringify(user));
  
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
        body: formData,
      });
  
      if (!response.ok) {
        const err = await response.json();
        console.error("Error del servidor:", err);
        throw new Error(JSON.stringify(err));
      }
  
      const data = await response.json();
      await updateToken(data.jwt);
  
      setIsEditing(false);
      Alert.alert("Perfil actualizado", "Los cambios han sido guardados correctamente");
  
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
    }
  };
  
  

  // IMAGE UPLOAD

  const validImage = (uri) => {
    // if (!uri) return false;

    // const lowerUri = uri.toLowerCase();
    // return lowerUri.endsWith('.jpg') ||
    //   lowerUri.endsWith('.jpeg') ||
    //   lowerUri.endsWith('.png');
    return true;
  };

  function base64toBlob(base64Data, contentType = 'image/png') {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }

  const uploadImage = async (mode) => {
    try {
      let result;
      if (mode === "gallery") {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          alert("Permiso denegado para acceder a la galería.");
          return;
        }
  
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: false, // da igual, web da base64 como uri
        });
      }

      if (!result.canceled) {
        let imageUri = result.assets[0].uri;
  
        if (imageUri.startsWith('data:image')) {
          const base64Data = imageUri.split(',')[1];
  
          const blob = base64toBlob(base64Data);
          console.log("Blob creado:", blob);
          
          saveImage(blob);
        } else {
          console.log("Imagen URI válida:", imageUri);
          saveImage(imageUri);
        }
      } else if (result == undefined) {
        console.log("result undefined");
      }
    } catch (err) {
      alert('Error al abrir la galería: ' + err.message);
      setAvatarModalVisible(false);
    }
  };
  

  const deleteImage = () => {
    try {
      saveImage(null);
      setAvatarModalVisible(false);
    } catch ({ message }) {
      console.log(message);
      setAvatarModalVisible(false);
    }
  }

  const saveImage = async (image) => {
    try {
      setImage(image);
      const base64Image = await blobToBase64(image);
      setImageBase64(base64Image);
      console.log("Imagen base64:", base64Image);
      // sendToBackend(image);
      setAvatarModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  return (
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center", backgroundColor: "#E3F2FD" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView contentContainerStyle={[gs.container, { paddingTop: 20, paddingBottom: 100, backgroundColor: "transparent" }]}>
        <Text
          style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 30 }}>
          Perfil</Text>


        {user && !subscription && (
          <Link href={"/account/premiumplan"} style={[gs.mainButton, { marginVertical: 10, textAlign: "center", width: "80%" }]}>
            <Text style={[gs.mainButtonText, { fontSize: 20 }]}>¡HAZTE PREMIUM!</Text>
          </Link>
        )}


        <TouchableOpacity style={gs.profileImageContainer} onPress={() => isEditing && setAvatarModalVisible(true)} disabled={!isEditing}>
          <Image
            source={{ uri: imageBase64 }}
            style={gs.profileImage}
          />
        </TouchableOpacity>

        <UploadImageModal
          visible={avatarModalVisible}
          onClose={() => setAvatarModalVisible(false)}
          onCameraPress={uploadImage}
          onGalleryPress={() => uploadImage("gallery")}
          onDeletePress={deleteImage}
        />

        {user && (
          <>
            <Text style={[gs.inputLabel, { width: "80%", paddingLeft: 10, color: "#1565C0", fontWeight: "bold" }]}>Nombre</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
              value={user.name} editable={isEditing} onChangeText={(text) => setUser({ ...user, name: text })} />

            <Text style={[gs.inputLabel, { width: "80%", paddingLeft: 10, color: "#1565C0", fontWeight: "bold" }]}>Apellido</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
              value={user.surname} editable={isEditing} onChangeText={(text) => setUser({ ...user, surname: text })} />

            <Text style={[gs.inputLabel, { width: "80%", paddingLeft: 10, color: "#1565C0", fontWeight: "bold" }]}>Nombre de Usuario</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
              value={user.username} editable={isEditing} onChangeText={(text) => setUser({ ...user, username: text })} />

            <Text style={[gs.inputLabel, { width: "80%", paddingLeft: 10, color: "#1565C0", fontWeight: "bold" }]}>Correo Electrónico</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width: "80%" }]}
              value={user.email} editable={isEditing} onChangeText={(text) => setUser({ ...user, email: text })} />
          </>
        )}

        <TouchableOpacity style={[gs.mainButton, { backgroundColor: "#1565C0" }]} onPress={isEditing ? handleSaveChanges : handleEditProfile}>
          <Text style={gs.mainButtonText}>{isEditing ? "Guardar Cambios" : "Editar Perfil"}</Text>
        </TouchableOpacity>

        {user && subscription && (
          <Text style={[gs.mainButtonText, { fontSize: 20, color: "black" }]}>¡Felicidades, eres premium!</Text>
        )}

        <TouchableOpacity style={[gs.secondaryButton, { marginTop: 10 }]} onPress={signOut}>
          <Text style={[gs.secondaryButtonText]}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}
