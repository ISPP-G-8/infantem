import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, TextInput, Alert, ImageBackground } from "react-native";
import { Text, View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
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
  const navigation = useNavigation();
  const [subscription, setSubscription] = useState(null);
  const [userId, setUserId] = useState<number | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { isLoading, user, token, setUser, checkAuth, signOut } = useAuth();
  const [image, setImage] = useState<any>(null);

  const FormData = global.FormData;

  useEffect(() => {
    if (!token) return; // Evita ejecutar el efecto si jwt es null o undefined
    console.log(token);
    try {
      const decodedToken: any = jwtDecode(token);
      setUserId(decodedToken.jti);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }, [token]);

  // Mueve el useEffect al nivel superior del componente
  useEffect(() => {
    if (!user || !token) return;

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
        console.log("Subscription data:", data);
        setSubscription(data);
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setSubscription(null); // Asegúrate de resetear el estado si hay un error
      }
    };

    fetchSubscription();
  }, [user, token]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!user || !token) return;

    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password,
      email: user.email,
      profilePhotoRoute: user.profilePhotoRoute
    };

    fetch(`${apiUrl}/api/v1/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setIsEditing(false);
        Alert.alert("Perfil actualizado", "Los cambios han sido guardados correctamente");
        router.push("/account");
      })
      .catch(error => {
        Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
      });
  };
  const handleLogout = signOut;

  const handleAvatarSelection = (avatar: any) => {
    if (user && isEditing) {
      const avatarUri = typeof avatar === "number"
        ? Image.resolveAssetSource(avatar).uri
        : avatar;

      setUser({ ...user, profilePhotoRoute: avatarUri });
      setAvatarModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <View style={gs.loadingContainer}>
        <ActivityIndicator size="large" color="#00446a" />
        <Text style={gs.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  // IMAGE UPLOAD

  const validImage = (uri) => {
    // if (!uri) return false;

    // const lowerUri = uri.toLowerCase();
    // return lowerUri.endsWith('.jpg') ||
    //   lowerUri.endsWith('.jpeg') ||
    //   lowerUri.endsWith('.png');
    return true;
  };

  // const base64ToBlob = (base64DataWithHeader, contentType = 'image/png') => {
  //   const base64Data = base64DataWithHeader.split(',')[1];  // Limpiar cabecera

  //   const byteCharacters = atob(base64Data);
  //   const byteArrays = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
  //     const slice = byteCharacters.slice(offset, offset + 512);

  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   const blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // };

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
        });
      }
      //  else if (mode === "camera") {
      //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      //   if (!permissionResult.granted) {
      //     alert("Permiso denegado para usar la cámara.");
      //     return;
      //   }
  
      //   result = await ImagePicker.launchCameraAsync({
      //     cameraType: ImagePicker.CameraType.front,
      //     allowsEditing: true,
      //     aspect: [1, 1],
      //     quality: 1,
      //   });
      // }

      if (!result.canceled) {
        if (!validImage(result.assets[0].uri)) {
          alert(
            "Por favor, selecciona una imagen válida (jpg, jpeg o png)."
          );
          setAvatarModalVisible(false);
        } else {
          console.log(result.assets[0].uri);
          saveImage(result.assets[0].uri);
        }
      } else if (result == undefined) {
        console.log("result undefined");
      }
    } catch (err) {
      alert('Error al abrir la cámara: ' + err.message);
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
      // const blobImage = base64ToBlob(image);
      // console.log("AAAAAAAAAAAAAAAAAAA");
      // console.log(blobImage);
      console.log(image)
      setImage(image);
      sendToBackend(image);

      setAvatarModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendToBackend = async (image) => {
    try {
      const formData = new FormData();

      formData.append("image", {
        uri: image,
        name: `${user?.username}_avatar.png`,
        type: "image/png",
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "Authorization": `Bearer ${token}`,
      //   },
      //   transformRequest: () => {
      //     return formData;
      //   }
      // }

      const response = await fetch('https://TU_BACKEND_URL/api/users/123/photo', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Imagen subida correctamente:', result);
      } else {
        console.log('Error subiendo imagen:', response.status);
      }
    } catch (error) {
      console.log("Error al enviar la imagen al backend:", error);
    }
  }

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
          {/* <Image source={user?.profilePhotoRoute ? { uri: user.profilePhotoRoute } : avatarOptions[0]} style={gs.profileImage} /> */}
          <Image
            source={image}
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

        <TouchableOpacity style={[gs.secondaryButton, { marginTop: 10 }]} onPress={handleLogout}>
          <Text style={[gs.secondaryButtonText]}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View style={[gs.modalOverlay, { marginTop: 110, width: "80%", marginHorizontal: "18%" }]}>
            <View style={[gs.modalContent, { alignItems: "center", justifyContent: "center" }]}>
              <Text style={[gs.modalTitle, { color: "#1565C0" }]}>Selecciona tu avatar</Text>
              <FlatList
                data={avatarOptions}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleAvatarSelection(item)}>
                    <Image source={item} style={gs.avatarOption} />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#1565C0",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 20,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontFamily: "Loubag-Medium", // Elimínalo si no usas fuente personalizada
                  }}
                >
                  Cerrar
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal> */}
      </ScrollView>
    </ImageBackground>
  );
}