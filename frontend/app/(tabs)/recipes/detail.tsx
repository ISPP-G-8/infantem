import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, useWindowDimensions, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe } from "../../../types";
import UploadImageModal from "../../../components/UploadImageModal";
import * as ImagePicker from "expo-image-picker";
// import validateForm from './add';

export default function RecipeDetails() {

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [nameError, setNameError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const [minAgeError, setMinAgeError] = useState<string | null>(null);
  const [maxAgeError, setMaxAgeError] = useState<string | null>(null);

  const { recipeId } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [isOwned, setIsOwned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const gs = require('../../../static/styles/globalStyles');

  const { token, user } = useAuth();

  useEffect(() => {
    obtainRecipe();
  }, []);

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

    if (recipe.maxRecommendedAge !== null && isNaN(recipe.maxRecommendedAge)) {
      setMaxAgeError("La edad máxima recomendada debe ser un número válido.");
      isValid = false;
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

  const obtainRecipe = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/${recipeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const recipeData = await response.json();
        console.log(recipeData);

        // Convertir la foto si existe
        if (recipeData.recipePhoto) {
          if (typeof recipeData.recipePhoto === 'string') {
            const base64Image = recipeData.recipePhoto.startsWith('data:image')
              ? recipeData.recipePhoto
              : `data:image/jpeg;base64,${recipeData.recipePhoto}`;
            setImageBase64(base64Image); // <-- AQUÍ
          } else if (Array.isArray(recipeData.recipePhoto)) {
            const bytes = new Uint8Array(recipeData.recipePhoto);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            const base64 = btoa(binary);
            setImageBase64(`data:image/jpeg;base64,${base64}`); // <-- AQUÍ
          }
        } else {
          setImageBase64(null); // No hay imagen -> limpiamos
        }
        console.log(recipeData);

        const recipeObject: Recipe = {
          id: recipeData.id,
          userId: recipeData.user,
          isCustom: recipeData.custom,
          name: recipeData.name,
          description: recipeData.description,
          minRecommendedAge: recipeData.minRecommendedAge,
          maxRecommendedAge: recipeData.maxRecommendedAge,
          ingredients: recipeData.ingredients,
          elaboration: recipeData.elaboration,
        };
        setRecipe(recipeObject);
        handleOwnership(recipeObject);
      }
    } catch (error) {
      console.error('Error fetching recipe: ', error);
      setRecipe(null);
    }
  };

  const handleOwnership = async (recipeObject: Recipe) => {
    if (recipeObject) {
      const owned = user.id === recipeObject.userId ? true : false;
      setIsOwned(owned);
      console.log(owned);
    } else {
      setIsOwned(false);
    }
  };


  const handleSaveChanges = async () => {
    if (!recipe || !token) return;
    if (!validateForm()) return;

    const recipeData = {
      name: recipe.name,
      description: recipe.description,
      minRecommendedAge: recipe.minRecommendedAge,
      maxRecommendedAge: recipe.maxRecommendedAge,
      ingredients: recipe.ingredients,
      elaboration: recipe.elaboration
    };

    await fetch(`${apiUrl}/api/v1/recipes/${recipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(recipeData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
      })
      .then(data => {
        setIsEditing(false);
        setRecipe(data);
        Alert.alert("Receta actualizada", "Los cambios han sido guardados correctamente");
        router.push(`/recipes/detail?recipeId=${recipe.id}`);
      })
      .catch(error => {
        Alert.alert("Error", `No se pudo guardar los cambios: ${error.message}`);
      });
  };

  const handleDeleteRecipe = async () => {
    if (!recipe || !token) return;

    try {
      const response = await fetch(`${apiUrl}/api/v1/recipes/${recipe.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log(response)
        throw new Error("Error deleting baby");
      }
      router.push('/recipes');
    } catch (error) {
      console.error('Error while deleting recipe' + error);
    }
  }

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

  if (!recipe) {
    return (
      <View style={gs.container}>
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}
        >

          {/* COLUMNA IZQUIERDA - Imagen */}
          {!isEditing &&
            <>
              <Image
                source={imageBase64
                  ? { uri: imageBase64 }
                  : require("../../../assets/avatar/avatar1.png")}
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />

              {/* COLUMNA DERECHA - Detalles */}
              <View style={{ flex: 1, width: '80%' }}>
                {/* Nombre */}
                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#1565C0" }}>
                  {recipe.name}
                </Text>

                {/* Descripción */}
                <Text style={{ fontSize: 16, marginBottom: 20, color: "#1565C0" }}>
                  {recipe.description}
                </Text>

                {/* Ingredientes */}
                <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#1565C0" }}>
                  Ingredientes:
                </Text>
                {recipe.ingredients.split(",").map((ingredient, index) => (
                  <Text key={index} style={{ marginBottom: 4, color: "#1565C0" }}>
                    • {ingredient.trim()}
                  </Text>
                ))}

                {/* Elaboración */}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 10
                    , color: "#1565C0"
                  }}
                >
                  Elaboración:
                </Text>
                <Text style={{ lineHeight: 22, color: "#1565C0" }}>{recipe.elaboration}</Text>

                {/* Edad recomendada */}
                <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, color: "#1565C0" }}>
                  Edad recomendada:
                </Text>
                <Text style={{ color: "#1565C0" }}>
                  De {recipe.minRecommendedAge} meses
                  {recipe.maxRecommendedAge
                    ? ` a ${recipe.maxRecommendedAge} meses`
                    : ""}
                </Text>
              </View>
            </>
          }

          {isEditing &&
            <View
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}
            >
              <Text
                style={[
                  gs.headerText,
                  { textAlign: "center", marginBottom: 24, color: "#1565C0" },
                ]}
              >
                Editar receta
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
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 16,
                  }}
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

              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold" }]}>Nombre</Text>
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

              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold" }]}>Desccripción</Text>
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

              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold" }]}>Ingredientes</Text>
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

              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold" }]}>Edad mínima en meses</Text>
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

              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold" }]}>Edad máxima en meses</Text>
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

              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold" }]}>Procedimiento</Text>
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
            </View>
          }

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10}}>
            {/* Botones de acción */}
            {(isOwned && !isEditing) && (
              <TouchableOpacity
                style={[gs.mainButton]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={gs.mainButtonText}>Editar Receta</Text>
              </TouchableOpacity>
            )}
            {(isOwned && isEditing) && (
              <TouchableOpacity
                style={[gs.mainButton]}
                onPress={handleSaveChanges}
              >
                <Text style={gs.mainButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            )}
            {(recipe.userId !== null || !recipe.isCustom) &&
              <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red", height: 'auto' }]} onPress={() => handleDeleteRecipe()}>
                <Text style={gs.mainButtonText}>Eliminar</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );

}


