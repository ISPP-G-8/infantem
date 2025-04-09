import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../context/AuthContext';
import { router } from 'expo-router';
import { Baby, Intake, Recipe } from '../../../types';
import Pagination from '../../../components/Pagination';

export default function intakeDetail() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../../../static/styles/globalStyles");
  const { token } = useAuth();
  const { width } = useWindowDimensions();
  const cardWidth = width < 500 ?350 :600;
 
  const [errorMessage, setErrorMessage] = useState('');
  const [babies, setBabies] = useState<Baby[]>([]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [recipesPage, setRecipesPage] = useState<number>(1);
  const [recipesTotalPages, setRecipesTotalPages] = useState<number | null>(null);

  const [intake, setIntake] = useState<Intake>({
    date: '', 
    quantity: 0,
    observations: '',
    baby: null, 
    recipes: []
  });

  useEffect(() => {
    const fetchBabies = async (): Promise<boolean> => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/baby`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching babies");
        } 

        const data = await response.json();
        setBabies(data);
        return true;

      } catch (error) {
        console.error('Error fetching recipes: ', error);
        return false;
      }
    };

    fetchBabies();
  }, []);

  useEffect(() => {
    const fetchRecipes= async (): Promise<boolean> => {
      const url = `${apiUrl}/api/v1/recipes/visible?page=${recipesPage-1}${searchQuery? `&name=${searchQuery}` : ''}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching recipes");
        } 

        const data = await response.json();
        setRecipes(data.content);
        setRecipesTotalPages(data.totalPages);
        return true;

      } catch (error) {
        console.error('Error fetching recipes: ', error);
        return false;
      }
    };

    fetchRecipes();
  }, [searchQuery, recipesPage]);

  const handleDateChange = (text: string) => {
    setIntake({...intake, date: text});
    
    // Updated regex to match "YYYY-MM-DD HH:MM:SS" format
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(text)) {
      setErrorMessage('Formato debe ser AAAA-MM-DD HH:MM:SS');
    } else {
      setErrorMessage('');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setIntake({...intake, [field]: value});
  };

  const handleSaveIntake = async () => {
    if (!intake.baby) {
      setErrorMessage("Tienes que asociar un bebé a la ingesta"); 
      return
    } else {
      setErrorMessage("");
    }

    if (errorMessage) 
      return;

    const intakeToSend = {
      ...intake,
      date: intake.date.replace(' ', 'T') + ':00'
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/intake`, {
        method: intake.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(intakeToSend)
      });
      
      if (!response.ok)
        throw new Error('Error al guardar la ingesta');

      router.push("/calendar/intakes");

    } catch (error) {
      console.error('Error saving intake:', error);
    }
  };

  const handleCancel = () => {
    router.push("/calendar/intakes");
  };

  return (

    <View style={gs.container}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        Añade una ingesta
      </Text>
          <ScrollView contentContainerStyle={[gs.card, { width: cardWidth, alignItems: "center", justifyContent: "center", marginBottom: 19, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }]}>
            
            
            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Fecha y hora:</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
              placeholder="AAAA-MM-DD HH:MM"
              value={intake.date}
              onChangeText={handleDateChange}
            />

            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Cantidad (g):</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%" }]} 
              placeholder="Ej. 120"
              keyboardType="numeric"
              value={intake.quantity.toString()}
              onChangeText={(text) => handleInputChange("quantity", text)}
            />

            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Observaciones:</Text>
            <TextInput
              style={[gs.input, { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1565C0", opacity: 0.8, width:"80%", textAlignVertical: 'top' }]} 
              placeholder="Ej. Tomó bien la leche"
              multiline={true}
              value={intake.observations}
              onChangeText={(text) => handleInputChange("observations", text)}
            />

            <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Bebé:</Text>
            {babies &&
              <View style={{ borderWidth: 1, borderColor: "#1565C0", borderRadius: 8, width: "80%", marginBottom: 16 }}> 
            <Picker
            selectedValue={intake.baby}
            style={{ opacity: 0.8 }}
            onValueChange={(babyId) => {
            // IDK why the backend ask for a JSON like this. :O
            setIntake((prevIntake) => ({ ...prevIntake, baby: { id: parseInt(babyId) } }));
            }}
            >
            <Picker.Item label="Seleccionar un bebé" value={null} />
            {babies.map((baby) => (
              <Picker.Item 
              key={baby.id} 
              label={baby.name} 
              value={baby.id} 
              />
            ))}
            </Picker>
            </View>
            }

          <Text style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#1565C0', fontWeight: 'bold', marginBottom: 5 }}>Recetas:</Text>
          {recipes && (
            <View style={{ width: "80%", marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <TextInput
                  style={{ 
                    flex: 1, 
                    borderWidth: 1, 
                    borderColor: "#1565C0", 
                    borderRadius: 8, 
                    padding: 8,
                    marginRight: 8,
                    width: "60%"
                  }}
                  placeholder="Buscar recetas..."
                  value={tempSearchQuery}
                  onChangeText={(text) => setTempSearchQuery(text)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#1565C0',
                    padding: 8,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {setSearchQuery(tempSearchQuery)}}
                >
                  <Text style={{ color: 'white' }}>Buscar</Text>
                </TouchableOpacity>
              </View>
              
              <View style={{ borderWidth: 1, borderColor: "#1565C0", borderRadius: 8 }}>
                <FlatList
                  data={recipes}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0E0E0',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                      onPress={() => {
                        const exists = intake.recipes.some(r => r.id === item.id);

                        const updatedRecipes = exists
                          ? intake.recipes.filter(r => r.id !== item.id)
                          : [...intake.recipes, { id: item.id }];

                        setIntake(prevIntake => ({
                          ...prevIntake,
                          recipes: updatedRecipes
                        }));
                      }}
                    >
                      <View style={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: 10, 
                        borderWidth: 1, 
                        borderColor: '#1565C0',
                        backgroundColor: intake.recipes.some(r => r.id === item.id) ? '#1565C0' : 'white',
                        marginRight: 10
                      }} />
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id.toString()}
                  style={{ maxHeight: 200 }}
                />
              {recipesTotalPages&& (
                <Pagination 
                  totalPages={recipesTotalPages} 
                  page={recipesPage} 
                  setPage={setRecipesPage} 
                />
              )}

              </View>
            </View>
          )}
          {errorMessage&& <Text style={{ color: "red", alignSelf: 'flex-start', marginLeft: '10%' }}>{errorMessage}</Text>}

            <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSaveIntake}>
              <Text style={gs.mainButtonText}>{intake.id ? "Actualizar" : "Guardar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[gs.mainButton, { backgroundColor: "red", marginTop: 10 }]} onPress={handleCancel}>
              <Text style={gs.mainButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
    </View>
  );
}
