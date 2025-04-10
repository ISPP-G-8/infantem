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
  interface Subscription {
    active: boolean;
    [key: string]: any; // Add other properties as needed
  }

  const [subscription, setSubscription] = useState<Subscription | null>(null);

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
      setUser(decodedToken.jti);
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
    
    // Si el usuario tiene una foto de perfil, obtenerla y mostrarla
    fetchProfilePhoto();
  }, []);
  
  // Función para obtener la foto de perfil del usuario
  const fetchProfilePhoto = async () => {
    if (!user || !token) return;
    
    try {
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Error al obtener datos del usuario");
      }
      
      const userData = await response.json();
    
      // Si hay foto de perfil, convertirla a base64 para mostrarla
      if (userData.profilePhoto) {
        // Si la respuesta ya viene en formato base64
        if (typeof userData.profilePhoto === 'string') {
          setImageBase64(userData.profilePhoto.startsWith('data:image') 
            ? userData.profilePhoto 
            : `data:image/jpeg;base64,${userData.profilePhoto}`);
        } 
        // Si viene como array de bytes, convertirlo a base64
        else if (Array.isArray(userData.profilePhoto)) {
          const bytes = new Uint8Array(userData.profilePhoto);
          let binary = '';
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64 = btoa(binary);
          setImageBase64(`data:image/jpeg;base64,${base64}`);
        }
      }
    } catch (error) {
      console.error("Error al obtener la foto de perfil:", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (!user) {
      console.log("No hay usuario disponible.");
      return;
    }
  
    if (!token)
      return;
  
    try {
      // Primero enviemos solo los datos del usuario en JSON
      console.log(`Enviando petición a ${apiUrl}/api/v1/users/${user.id}`);
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          surname: user.surname,
          username: user.username,
          email: user.email
        })
      });
      
      // Log para verificar la respuesta
      console.log("Respuesta status:", response.status);
      
      if (!response.ok) {
        const responseText = await response.text();
        console.error("Error del servidor (texto):", responseText);
        
        try {
          const err = JSON.parse(responseText);
          console.error("Error del servidor (JSON):", err);
          throw new Error(JSON.stringify(err));
        } catch (parseError) {
          throw new Error(responseText || "Error desconocido");
        }
      }

      const data = await response.json();
      await updateToken(data.jwt);
      
      // Si se ha seleccionado una imagen, enviarla en una petición separada
      if (image || imageBase64) {
        await uploadProfilePhoto();
      }

      setIsEditing(false);
      Alert.alert("Perfil actualizado", "Los cambios han sido guardados correctamente");
  
    } catch (error: any) {
      console.error("Error completo:", error);
      Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
    }
  };
  
  // Función para subir la foto de perfil
  const uploadProfilePhoto = async () => {
    if (!user || !token) return;
    
    try {
      const formData = new FormData();
      
      if (image) {
        // Si tenemos un blob
        // @ts-ignore
        formData.append('profilePhoto', image);
        console.log("Subiendo imagen como blob");
      } 
      else if (imageBase64) {
        // Preparar la imagen para subirla
        let imageUri = imageBase64;
        let imageName = 'profile.jpg';
        let imageType = 'image/jpeg';
        
        // Verificar formato base64
        if (imageBase64.startsWith('data:image')) {
          imageType = imageBase64.split(';')[0].split(':')[1];
        }
        
        // @ts-ignore - React Native maneja FormData diferente
        formData.append('profilePhoto', {
          uri: imageUri,
          type: imageType,
          name: imageName
        });
        
        console.log("Subiendo imagen desde base64");
      }
      
      // Usar el nuevo endpoint específico para la foto de perfil
      console.log(`Enviando foto al endpoint ${apiUrl}/api/v1/users/${user.id}/profile-photo`);
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}/profile-photo`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al subir la foto:", errorText);
        throw new Error(errorText);
      }
      
      const photoData = await response.json();
      console.log("Foto subida exitosamente:", photoData);
      
      // Actualizar el token con el nuevo
      if (photoData.jwt) {
        await updateToken(photoData.jwt);
      }
      
      return photoData;
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
      // No lanzamos error para que no afecte al flujo principal
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

  const uploadImage = async () => {
    try {
      let result;
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
  
      if (!result.canceled) {
        let imageUri = result.assets[0].uri;
  
        // NUEVO: Validar que sea PNG
        if (!imageUri.toLowerCase().endsWith(".png")) {
          alert("Por favor, selecciona una imagen en formato PNG.");
          return;
        }
  
        if (imageUri.startsWith('data:image')) {
          const base64Data = imageUri.split(',')[1];
  
          const blob = base64toBlob(base64Data);
          console.log("Blob creado:", blob);
  
          saveImage(blob);
        } else {
          console.log("Imagen URI válida:", imageUri);
          saveImage(imageUri);
        }
      } else if (result === undefined) {
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


        {user && (subscription ? ( (subscription && subscription.active ? (
          <Link href={"/account/premiumplan"} style={[gs.mainButton, { marginVertical: 10, textAlign: "center", width: "20%", backgroundColor: "red" }]}>
            <Text style={[gs.mainButtonText, { fontSize: 20 }]}>Cancelar suscripcion</Text>
          </Link>
        ) : (
          <Text style={[gs.text, { fontSize: 20 }]}>Hasta el final de la suscripción no puede volver a suscribirse</Text>))
        ): (
          <Link href={"/account/premiumplan"} style={[gs.mainButton, { marginVertical: 10, textAlign: "center", width: "80%" }]}>
            <Text style={[gs.mainButtonText, { fontSize: 20 }]}>¡HAZTE PREMIUM!</Text>
          </Link>
        ))}


        <TouchableOpacity style={gs.profileImageContainer} onPress={() => isEditing && setAvatarModalVisible(true)} disabled={!isEditing}>
          <Image
            source={imageBase64 
              ? { uri: imageBase64 } 
              : require("../../../assets/avatar/avatar1.png")}
            style={gs.profileImage}
          />
        </TouchableOpacity>

        <UploadImageModal
          visible={avatarModalVisible}
          onClose={() => setAvatarModalVisible(false)}
          onGalleryPress={() => uploadImage()}
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

        <TouchableOpacity style={[gs.secondaryButton, { marginTop: 10 }]} onPress={signOut}>
          <Text style={[gs.secondaryButtonText]}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}
