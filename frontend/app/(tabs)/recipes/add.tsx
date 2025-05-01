import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import UploadImageModal from "../../../components/UploadImageModal";
import { Recipe } from "../../../types";
import { set } from "date-fns";

export default function AddBaby() {
  const gs = require("../../../static/styles/globalStyles");
  const router = useRouter();
  const { user, token, updateToken } = useAuth();
  const { requestId, requestUserId } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: "",
    ingredients: "",
    minRecommendedAge: null,
    maxRecommendedAge: null,
    elaboration: "",
  });

  // As this is an array of Intakes this couldn't be implemented this fast
  // and I can not let the user to specify the intakes without a type validation.
  // Same for allergens and alimentoNutriente
  // TODO: Implement this
  //const [intakes, setIntakes] = useState<Intake[]>(null);
  //const [allergens, setAllergens] = useState<Allergen[]>(null);
  //Idk why this is in spanish
  //const [alimentoNutriente, setAlimentoNutriente] = useState<AlimentoNutriente[]>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const [minAgeError, setMinAgeError] = useState<string | null>(null);
  const [maxAgeError, setMaxAgeError] = useState<string | null>(null);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const validateForm = () => {
    let isValid = true;
  
    setNameError(null);
    setIngredientsError(null);
    setMinAgeError(null);
    setMaxAgeError(null);

    if (!recipe.name.trim()) {
      setNameError("El nombre es obligatorio.");
      isValid = false;
    }

    if (!recipe.ingredients.trim()) {
      setIngredientsError("Los ingredientes son obligatorios.");
      isValid = false;
    }

    if (recipe.minRecommendedAge !== null && isNaN(recipe.minRecommendedAge)) {
      setMinAgeError("La edad mínima recomendada debe ser un número válido.");
      isValid = false;
    }

    if (recipe.maxRecommendedAge !== null) {
      if (isNaN(recipe.maxRecommendedAge)) {
        setMaxAgeError("La edad máxima recomendada debe ser un número válido.");
        isValid = false;
      } else if (recipe.maxRecommendedAge > 72) {
        setMaxAgeError("La edad máxima recomendada no puede ser superior a 72 meses.");
        isValid = false;
      }
    }

    if (
      recipe.minRecommendedAge !== null &&
      recipe.maxRecommendedAge !== null &&
      recipe.minRecommendedAge > recipe.maxRecommendedAge
    ) {
      setMinAgeError("La edad mínima no puede ser mayor que la edad máxima.");
      isValid = false;
    }
  
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const url = requestUserId && requestId && user?.role === 'nutritionist'
      ?`${apiUrl}/api/v1/recipes/custom`
      :`${apiUrl}/api/v1/recipes`

    if (token) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
              name: recipe.name,
              description: recipe.description,
              ingredients: recipe.ingredients,
              minRecommendedAge: recipe.minRecommendedAge,
              maxRecommendedAge: recipe.maxRecommendedAge,
              elaboration: recipe.elaboration,
              ...(requestId && requestUserId ? { requestId: requestId, user: requestUserId } : {}),
            }),
        });
    
        if (response.ok) {
          const data = await response.json();
          if (image) {
            await uploadRecipePhoto(data.id);
          } 

          router.push("/recipes");
        } else {
          console.error("Error creating recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    }
  };

  function base64toBlob(base64Data: string, contentType = "image/png") {
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

  const uploadRecipePhoto = async (createdRecipeId: number) => {
    if (!user || !token) return;

    try {
      const formData = new FormData();

      if (image) {
        // Si tenemos un blob
        // @ts-ignore
        formData.append("recipePhoto", image);
        console.log("Subiendo imagen como blob");
      } else if (imageBase64) {
        // Preparar la imagen para subirla
        let imageUri = imageBase64;
        let imageName = "profile.jpg";
        let imageType = "image/jpeg";

        // Verificar formato base64
        if (imageBase64.startsWith("data:image")) {
          imageType = imageBase64.split(";")[0].split(":")[1];
        }

        // @ts-ignore - React Native maneja FormData diferente
        formData.append("recipePhoto", {
          uri: imageUri,
          type: imageType,
          name: imageName,
        });

        console.log("Subiendo imagen desde base64");
      }

      // Usar el nuevo endpoint específico para la foto de perfil
      console.log(
        `Enviando foto al endpoint ${apiUrl}/api/v1/recipes/${createdRecipeId}/recipe-photo`
      );
      const response = await fetch(
        `${apiUrl}/api/v1/recipes/${createdRecipeId}/recipe-photo`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al subir la foto:", errorText);
        throw new Error(errorText);
      }

      const photoData = await response.json();
      console.log("Foto subida exitosamente:", photoData);

      if (photoData.jwt) {
        await updateToken(photoData.jwt);
      }

      return photoData;
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
    }
  };

  const uploadImage = async (action: string) => {
    if (action === "load") {
      try {
        let result;
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
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
          if (!imageUri.startsWith("data:image/png")) {
            alert("Por favor, selecciona una imagen en formato PNG.");
            return;
          }

          if (imageUri.startsWith("data:image")) {
            const base64Data = imageUri.split(",")[1];

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
        if (err instanceof Error) {
          alert("Error al abrir la galería: " + err.message);
        } else {
          alert("Error al abrir la galería.");
        }
        setImageModalVisible(false);
      }
    } else if (action === "delete") {
      try {
        saveImage(null);
      } catch (err) {
        if (err instanceof Error) {
          alert("Error al eliminar la imagen: " + err.message);
        } else {
          alert("Error al eliminar la imagen.");
        }
        setImageModalVisible(false);
      }
    }
  };

  const saveImage = async (image: any) => {
    if (image != null) {
      setImage(image);
      const base64Image = await blobToBase64(image);
      setImageBase64(base64Image);
      console.log("Imagen base64:", base64Image);
      setImageModalVisible(false);
    } else {
      setImage(null);
      setImageBase64(null);
      setImageModalVisible(false);
    }
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 30, paddingBottom: 30 }}>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.79)",
            borderRadius: 16,
            padding: 24,
            marginHorizontal: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={[
              gs.headerText,
              { textAlign: "center", marginBottom: 24, color: "#1565C0" },
            ]}
          >
            Añadir una receta
          </Text>

          <TouchableOpacity
            style={gs.profileImageContainer}
            onPress={() => setImageModalVisible(true)}
          >
            <Image
              source={
                imageBase64
                  ? { uri: imageBase64 }
                  : require("../../../assets/avatar/avatar1.png")
              }
              style={gs.profileImage}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Text style={gs.changeImageText}>Cambiar imagen</Text>
          </TouchableOpacity>

          <UploadImageModal
            visible={imageModalVisible}
            onClose={() => setImageModalVisible(false)}
            onGalleryPress={() => uploadImage("load")}
            onDeletePress={() => uploadImage("delete")}
          />

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Nombre"
            value={recipe.name}
            onChangeText={(text) => setRecipe({ ...recipe, name: text })}
          />
          {nameError && (
            <Text style={{ color: "red", marginBottom: 5 }}>{nameError}</Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Descripción"
            value={recipe.description}
            onChangeText={(text) => setRecipe({ ...recipe, description: text })}
          />
  
          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Ingredientes"
            value={recipe.ingredients}
            onChangeText={(text) => setRecipe({ ...recipe, ingredients: text })}
          />
          {ingredientsError && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {ingredientsError}
            </Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Edad mínima recomendada"
            value={recipe.minRecommendedAge?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0;
              setRecipe({ ...recipe, minRecommendedAge: newValue });
            }}
          />
          {minAgeError && (
            <Text style={{ color: "red", marginBottom: 5 }}>{minAgeError}</Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Edad máxima recomendada"
            value={recipe.maxRecommendedAge?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0;
              setRecipe({ ...recipe, maxRecommendedAge: newValue });
            }}
          />
          {maxAgeError && (
            <Text style={{ color: "red", marginBottom: 5 }}>{maxAgeError}</Text>
          )}

          <TextInput
            style={[
              gs.input,
              {
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#1565C0",
                opacity: 0.8,
                width: "90%",
              },
            ]}
            placeholder="Elaboración"
            value={recipe.elaboration}
            onChangeText={(text) => setRecipe({ ...recipe, elaboration: text })}
            multiline
          />

          <TouchableOpacity
            style={[gs.mainButton, { alignSelf: "center", marginTop: 10 }]}
            onPress={handleSave}
          >
            <Text style={[gs.mainButtonText, { paddingHorizontal: 24 }]}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
