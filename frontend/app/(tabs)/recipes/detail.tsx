import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, useWindowDimensions, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Recipe } from "../../../types";
import UploadImageModal from "../../../components/UploadImageModal";
import * as ImagePicker from "expo-image-picker";
import CheckBox from "react-native-check-box";
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
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const [allAllergens, setAllAllergens] = useState<{ id: number, name: string }[]>([]);

  const gs = require('../../../static/styles/globalStyles');

  const { token, user } = useAuth();

  useEffect(() => {
    obtainRecipe();
    fetchAllAllergens();
  }, []);

  const fetchAllAllergens = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/allergens`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAllAllergens(data);
      }
    } catch (error) {
      console.error('Error fetching allergens:', error);
    }
  };

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
          recipePhoto: recipeData.recipePhoto,
          allergens: recipeData.allergens || [],
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

    console.log("Estado recipe antes de handleSaveChanges:", recipe);

    await fetch(`${apiUrl}/api/v1/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(recipe)
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
        // Si el backend devuelve la imagen actualizada, podrías querer actualizar imageBase64 aquí también
        if (data.recipePhoto) {
          processRecipePhoto(data.recipePhoto);
        }
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
        // Pedir permisos (sin cambios)
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          alert("Permiso denegado para acceder a la galería.");
          return;
        }

        // Lanzar librería (sin cambios en opciones base)
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1, // Calidad 1 puede generar base64 muy grandes, considera 0.7 o similar
          base64: true, // Necesario para obtener base64
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const asset = result.assets[0];

          // ImagePicker con base64: true a menudo ya devuelve un data URI en asset.uri
          // Si no, lo construimos nosotros usando el base64 que pedimos.
          let displayUri: string | null = null;

          if (asset.uri) {
            // Si ya es un data URI, úsalo directamente
            if (asset.uri.startsWith('data:')) {
              displayUri = asset.uri;
            }
            // Si no es data URI pero TENEMOS base64, constrúyelo
            else if (asset.base64) {
              const mimeType = asset.mimeType || 'image/jpeg'; // Intenta obtener MimeType o usa default
              displayUri = `data:<span class="math-inline">\{mimeType\};base64,</span>{asset.base64}`;
            }
          }
          // Fallback: Si no hay URI pero sí base64, constrúyelo
          else if (asset.base64) {
            const mimeType = asset.mimeType || 'image/jpeg';
            displayUri = `data:<span class="math-inline">\{mimeType\};base64,</span>{asset.base64}`;
          }


          if (displayUri) {
            // Llama a saveImage SOLO con el URI (que contiene el base64)
            saveImage(displayUri);
          } else {
            console.error("Image picker no devolvió datos utilizables (URI o Base64).");
            alert("No se pudo obtener la imagen seleccionada.");
            setImageModalVisible(false);
          }

        } else {
          // Usuario canceló o no hubo assets
          console.log("Selección de imagen cancelada o sin assets.");
          // No cierres el modal aquí si el usuario solo canceló,
          // déjalo abierto por si quiere intentar de nuevo o eliminar.
          // setImageModalVisible(false); <-- quitar si quieres que modal siga abierto
        }
      } catch (err) {
        // Manejo de errores (sin cambios)
        if (err instanceof Error) {
          alert("Error al abrir la galería: " + err.message);
        } else {
          alert("Error desconocido al abrir la galería.");
        }
        setImageModalVisible(false); // Cierra el modal en caso de error
      }
    } else if (action === "delete") {
      try {
        // Llama a saveImage con null para borrar
        saveImage(null);
      } catch (err) {
        // Manejo de errores (sin cambios)
        if (err instanceof Error) {
          alert("Error al eliminar la imagen: " + err.message);
        } else {
          alert("Error desconocido al eliminar la imagen.");
        }
        setImageModalVisible(false); // Cierra el modal en caso de error
      }
    }
  };


  // Simplificado: solo necesita el URI para mostrar (que contiene el base64)
  const saveImage = (displayUri: string | null) => {
    setImageBase64(displayUri); // Actualiza el estado para la vista
    setRecipe(prevRecipe => {
      if (!prevRecipe) return null; // Handle the case where prevRecipe is null
      return {
        ...prevRecipe,
        recipePhoto: displayUri ? displayUri.split(",")[1] : null, // Guarda el base64 sin el encabezado en el objeto recipe
      };
    });
    console.log("Estado recipe después de saveImage:", recipe);
    setImageModalVisible(false); // Cierra el modal
  };

  if (!recipe) {
    return (
      <View style={gs.container}>
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  const processRecipePhoto = (photo: any) => {
    if (typeof photo === 'string') {
      const base64Image = photo.startsWith('data:image')
        ? photo
        : `data:image/jpeg;base64,${photo}`;
      setImageBase64(base64Image);
    } else if (Array.isArray(photo)) {
      const bytes = new Uint8Array(photo);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);
      setImageBase64(`data:image/jpeg;base64,${base64}`);
    } else {
      setImageBase64(null);
    }
  };


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

                {recipe.allergens && recipe.allergens.length > 0 && (
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1565C0", marginBottom: 6 }}>
                      Alérgenos:
                    </Text>
                    {recipe.allergens.map((allergen) => (
                      <Text key={allergen.id} style={{ color: "#1565C0" }}>
                        • {allergen.name}
                      </Text>
                    ))}
                  </View>
                )}
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
              <Text style={[gs.inputLabel, { width: "90%", color: "#1565C0", fontWeight: "bold", marginTop: 16 }]}>
      Selecciona los alérgenos
    </Text>
    <View style={{ width: "90%" }}>
      {allAllergens.length > 0 ? (
        allAllergens.map((allergen: any) => {
          const isSelected = recipe.allergens.some((a: any) => a.id === allergen.id);
          return (
            <TouchableOpacity
              key={allergen.id}
              onPress={() => {
                if (isSelected) {
                  setRecipe({
                    ...recipe,
                    allergens: recipe.allergens.filter((a: any) => a.id !== allergen.id),
                  });
                } else {
                  setRecipe({
                    ...recipe,
                    allergens: [...recipe.allergens, allergen],
                  });
                }
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                backgroundColor: "#fff",
                padding: 14,
                borderRadius: 10,
                borderColor: "#ccc",
                borderWidth: 1,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <CheckBox
                isChecked={isSelected}
                onClick={() => {
                  if (isSelected) {
                    setRecipe({
                      ...recipe,
                      allergens: recipe.allergens.filter((a: any) => a.id !== allergen.id),
                    });
                  } else {
                    setRecipe({
                      ...recipe,
                      allergens: [...recipe.allergens, allergen],
                    });
                  }
                }}
                checkBoxColor={isSelected ? "#1565C0" : "#ccc"}
              />
              <Text style={{ marginLeft: 12, fontSize: 16 }}>{allergen.name}</Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={{ color: "gray" }}>Cargando alérgenos...</Text>
      )}
    </View>
            </View>
          }

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
            {/* Botones de acción */}
            {(isOwned && !isEditing && !recipe.isCustom) && (
              <TouchableOpacity
                style={[gs.mainButton]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={gs.mainButtonText}>Editar Receta</Text>
              </TouchableOpacity>
            )}
            {(isOwned && isEditing && !recipe.isCustom) && (
              <TouchableOpacity
                style={[gs.mainButton]}
                onPress={handleSaveChanges}
              >
                <Text style={gs.mainButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            )}
            {(isOwned && recipe.userId !== null && !recipe.isCustom) &&
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


