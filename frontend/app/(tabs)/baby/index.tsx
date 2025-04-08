import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ImageBackground, ScrollView, Image, TextInput } from "react-native";
import { getToken } from "../../../utils/jwtStorage";
import { Picker } from "@react-native-picker/picker";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface Baby {
  id?: number;
  name: string;
  birthDate: string;
  genre?: string;
  weight?: number;
  height?: number;
  cephalicPerimeter?: number;
  foodPreference?: string;
}

// This draft type mirrors Baby but with all fields as strings (for form handling)
interface BabyDraft {
  id?: number;
  name: string;
  birthDate: string;
  genre: string;
  weight: string;
  height: string;
  cephalicPerimeter: string;
  foodPreference: string;
}

export default function BabyInfo() {
  const gs = require("../../../static/styles/globalStyles");
  const [babies, setBabies] = useState<Baby[]>([]);
  const [jwt, setJwt] = useState<string | null>(null);

  // We need the originalBaby because we don't fetch a DTO. Waiting for the DTO
  const [originalBaby, setOriginalBaby] = useState<Baby | null>(null);
  const [editedBaby, setEditedBaby] = useState<BabyDraft | null>(null);

  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const isValidDate = (dateString: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Format: YYYY-MM-DD
    if (!dateRegex.test(dateString)) return false;

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleBirthDateChange = (text: string) => {
    if (!isValidDate(text)) {
      setBirthDateError("Fecha inválida. Use AAAA-MM-DD y asegúrese de que la fecha existe.");
    } else {
      setBirthDateError(null);
    }
    setEditedBaby((prev) => prev ? { ...prev, birthDate: text } : prev);
  };

  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      setJwt(token);
    };
    getUserToken();
  }, []);

  useEffect(() => {
    if (!jwt) return;

    const fetchBabies = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/baby`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (!response.ok) throw new Error("Error fetching babies");
        const data: Baby[] = await response.json();
        setBabies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBabies();
  }, [jwt]);

  const handleSaveBaby = async () => {
    if (!jwt || !editedBaby) return;

    const parsedFields = {
      weight: editedBaby.weight ? parseFloat(editedBaby.weight) : undefined,
      height: editedBaby.height ? parseFloat(editedBaby.height) : undefined,
      cephalicPerimeter: editedBaby.cephalicPerimeter ? parseFloat(editedBaby.cephalicPerimeter) : undefined,
    };

    // If we're editing an existing baby, merge the new values with the original data.
    // For new babies, simply use the edited values.
    const babyToSave: Baby = originalBaby
      ? {
          ...originalBaby,
          name: editedBaby.name,
          birthDate: editedBaby.birthDate,
          genre: editedBaby.genre,
          foodPreference: editedBaby.foodPreference,
          ...parsedFields,
        }
      : {
          name: editedBaby.name,
          birthDate: editedBaby.birthDate,
          genre: editedBaby.genre,
          foodPreference: editedBaby.foodPreference,
          ...parsedFields,
        };

    const method = babyToSave.id ? "PUT" : "POST";
    const url = babyToSave.id ? `${apiUrl}/api/v1/baby/${babyToSave.id}` : `${apiUrl}/api/v1/baby`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(babyToSave),
      });
      if (!response.ok) throw new Error("Error saving baby");

      const updatedBaby = await response.json();
      setBabies((prev) =>
        babyToSave.id ? prev.map((b) => (b.id === updatedBaby.id ? updatedBaby : b)) : [...prev, updatedBaby]
      );
      setEditedBaby(null);
      setOriginalBaby(null);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBaby = async (id: number) => {
    if (!jwt) return;

    try {
      const response = await fetch(`${apiUrl}/api/v1/baby/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        console.log(response)
        throw new Error("Error deleting baby");
      }
      setBabies((prev) => prev.filter((baby) => baby.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (field: keyof BabyDraft, value: string) => {
    setEditedBaby((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleEditBaby = (baby: Baby) => {
    setOriginalBaby(baby);
    setEditedBaby({
      id: baby.id,
      name: baby.name,
      birthDate: baby.birthDate,
      genre: baby.genre || "OTHER",
      weight: baby.weight ? baby.weight.toString() : "",
      height: baby.height ? baby.height.toString() : "",
      cephalicPerimeter: baby.cephalicPerimeter ? baby.cephalicPerimeter.toString() : "",
      foodPreference: baby.foodPreference || "",
    });
    setIsEditing(true);
  };

  const handleAddBaby = () => {
    setOriginalBaby(null);
    setEditedBaby({
      name: "",
      birthDate: "",
      genre: "OTHER",
      weight: "",
      height: "",
      cephalicPerimeter: "",
      foodPreference: "",
    });
    setIsEditing(true);
  };

  const handleCancelBaby = () => {
    setEditedBaby(null);
    setOriginalBaby(null);
    setIsEditing(false);
  };

  return (
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#E3F2FD" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
          Información de los <Text style={{ fontStyle: "italic" }}>bebés</Text>
        </Text>

        <Text style={{ color: "#1565C0", textAlign: "center", fontSize: 16, marginBottom: 5, marginTop: 10 }}>
          Revisa y gestiona 
        </Text>
        <Text style={{ color: "#1565C0", textAlign: "center", fontSize: 16, marginBottom: 20 }}>
          la información de tu bebé.
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          {/* FORMULARIO */}
          {isEditing && editedBaby && (
            <View style={[gs.card, { padding: 20, alignItems: "center", justifyContent: "center", marginBottom: 20, backgroundColor: "rgba(227, 242, 253, 0.8)", borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
              <Image source={require("../../../static/images/baby-placeholder.png")} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />
              <Text style={gs.cardTitle}>{editedBaby.id ? "Editar bebé" : "Añadir bebé"}</Text>
              
              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Nombre:</Text>
              <TextInput
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                placeholder="Nombre"
                value={editedBaby.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              
              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Fecha de nacimiento:</Text>
              <TextInput
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                placeholder="AAAA-MM-DD"
                value={editedBaby.birthDate}
                onChangeText={handleBirthDateChange}
              />
              {birthDateError && <Text style={{ color: "red" }}>{birthDateError}</Text>}

              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Género:</Text>
              <Picker
                selectedValue={editedBaby.genre}
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                onValueChange={(itemValue) => handleInputChange("genre", itemValue)}
              >
                <Picker.Item label="Niño" value="MALE" />
                <Picker.Item label="Niña" value="FEMALE" />
                <Picker.Item label="Otro" value="OTHER" />
              </Picker>

              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Peso (kg):</Text>
              <TextInput
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                placeholder="Ej. 3.5"
                keyboardType="decimal-pad"
                value={editedBaby.weight}
                onChangeText={(text) => handleInputChange("weight", text)}
              />

              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Altura (cm):</Text>
              <TextInput
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                placeholder="Ej. 50"
                keyboardType="numeric"
                value={editedBaby.height}
                onChangeText={(text) => handleInputChange("height", text)}
              />

              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Perímetro cefálico (cm):</Text>
              <TextInput
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                placeholder="Ej. 35"
                keyboardType="decimal-pad"
                value={editedBaby.cephalicPerimeter}
                onChangeText={(text) => handleInputChange("cephalicPerimeter", text)}
              />

              <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Preferencias alimentarias:</Text>
              <TextInput
                style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
                placeholder="Ej. Leche materna, fórmula, etc."
                value={editedBaby.foodPreference}
                onChangeText={(text) => handleInputChange("foodPreference", text)}
              />

              <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSaveBaby}>
                <Text style={gs.mainButtonText}>{editedBaby.id ? "Actualizar" : "Guardar"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red", marginTop: 10 }]} onPress={handleCancelBaby}>
                <Text style={gs.mainButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* LISTADO DE BEBÉS */}
        <Text style={[gs.subHeaderText, { color: "#1565C0", marginBottom: 10, fontWeight: "bold" }]}>Mis bebés registrados</Text>

        {babies.length === 0 ? (
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            No hay bebés registrados aún.
          </Text>
        ) : (
          babies.map((baby) => (
            <View key={baby.id} style={[gs.card, { width: "100%", flexDirection: "row", alignItems: "center", padding: 15, marginBottom: 10 }]}>
              <Image
                source={require("../../../static/images/baby-placeholder.png")}
                style={{ width: 70, height: 70, borderRadius: 50, marginRight: 15 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[gs.cardTitle, { fontSize: 18 }]}>{baby.name}</Text>
                <Text style={gs.cardContent}>📅 Fecha de nacimiento: {baby.birthDate}</Text>
                <Text style={gs.cardContent}>🍼 Preferencia: {baby.foodPreference}</Text>
                <Text style={gs.cardContent}>⚖️ Peso: {baby.weight} kg </Text>
                <Text style={gs.cardContent}>📏 Altura: {baby.height} cm</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center", gap: 10 }}>
                <TouchableOpacity style={gs.mainButton} onPress={() => handleEditBaby(baby)}>
                  <Text style={gs.mainButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red" }]} onPress={() => handleDeleteBaby(baby.id!)}>
                  <Text style={gs.mainButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        {!isEditing && (
          <TouchableOpacity style={[gs.mainButton, { backgroundColor: "#1565C0" }]} onPress={handleAddBaby}>
            <Text style={gs.mainButtonText}>Añadir un bebé</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
