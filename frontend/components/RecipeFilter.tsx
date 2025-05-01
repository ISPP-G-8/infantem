import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { getToken } from "../utils/jwtStorage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { RecipeFilter } from "../types";

const styles = require("../static/styles/recipeFilter");
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

type RecipeFilterProps = {
  filters: RecipeFilter;
  setFilters: React.Dispatch<React.SetStateAction<RecipeFilter>>;
  onApplyFilters: (filters: any) => void;
};

const RecipeFilterComponent = ({
  filters,
  setFilters,
  onApplyFilters,
}: RecipeFilterProps) => {
  const [ingredient, setIngredient] = useState("");
  const [allergen, setAllergen] = useState("");

  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];
  const [availableAllergens, setAvailableAllergens] = useState<string[]>([]);
const [selectedAllergen, setSelectedAllergen] = useState<string>("");
const [jwt, setJwt] = useState<string | null>(null); // 👈 MOVIDO AQUÍ

  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      setJwt(token);
    };
    getUserToken();
  }, []);


  // Yeah, the animation code is a bit messy; but trust me, it looked way bad without it.
  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animatedHeight, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.name) count++;
    if (filters.minAge !== undefined) count++;
    if (filters.maxAge !== undefined) count++;
    if (filters.ingredients && filters.ingredients.length > 0) count++;
    if (filters.allergens && filters.allergens.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();
  const contentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 470],
  });

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setFilters({
        ...filters,
        ingredients: [...(filters.ingredients || []), ingredient.trim()],
      });
      setIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...(filters.ingredients || [])];
    updatedIngredients.splice(index, 1);
    setFilters({
      ...filters,
      ingredients: updatedIngredients,
    });
  };

  const addAllergen = () => {
    if (allergen.trim() !== "") {
      setFilters({
        ...filters,
        allergens: [...(filters.allergens || []), allergen.trim()],
      });
      setAllergen("");
    }
  };

  const removeAllergen = (index: number) => {
    const updatedAllergens = [...(filters.allergens || [])];
    updatedAllergens.splice(index, 1);
    setFilters({
      ...filters,
      allergens: updatedAllergens,
    });
  };

  const handleReset = () => {
    setFilters({});
    onApplyFilters({});
  };

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/allergens`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener alérgenos");
        const data = await response.json();
        console.log("Alérgenos:", data);
        const names = data.map((a: any) => a.name);
        setAvailableAllergens(names);
      } catch (error) {
        console.error("Error obteniendo alérgenos:", error);
      }
    };
  
    fetchAllergens();
  }, [apiUrl, jwt]);
  
  

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleExpand}>
        <Text style={styles.toggleButtonText}>Filtros de recetas</Text>
        {activeFiltersCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFiltersCount}</Text>
          </View>
        )}
        <Text style={styles.expandIcon}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      <Animated.View
        style={[styles.animatedContainer, { height: contentHeight }]}
      >
        {expanded && (
          <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Buscar</Text>
              <TextInput
                style={styles.input}
                placeholder="Busca por el nombre de la receta..."
                value={filters.name || ""}
                onChangeText={(text) => setFilters({ ...filters, name: text })}
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Edad mínima en meses</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Min"
                  value={filters.minAge?.toString() || ""}
                  onChangeText={(text) => {
                    const minAge = text === "" ? undefined : parseInt(text, 10);
                    setFilters({ ...filters, minAge });
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Edad máxima en meses</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Máx"
                  value={filters.maxAge?.toString() || ""}
                  onChangeText={(text) => {
                    const maxAge = text === "" ? undefined : parseInt(text, 10);
                    setFilters({ ...filters, maxAge });
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="#A0A0A0"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ingredientes</Text>
              <View style={styles.addItemContainer}>
                <TextInput
                  style={styles.addItemInput}
                  placeholder="Añade un ingrediente"
                  value={ingredient}
                  onChangeText={setIngredient}
                  placeholderTextColor="#A0A0A0"
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addIngredient}
                >
                  <Text style={styles.addButtonText}>Añadir</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {(filters.ingredients || []).map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tag}
                    onPress={() => removeIngredient(index)}
                  >
                    <Text style={styles.tagText}>{item} ×</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Alérgenos</Text>
              <View style={styles.addItemContainer}>
              <View style={[styles.addItemInput, { padding: 0, justifyContent: "center" }]}>
              {availableAllergens?.length > 0 &&
              availableAllergens.filter(
                (name) => !(filters.allergens || []).includes(name)
              ).length > 0 ? (
                <select
                  style={{
                    flex: 1,
                    height: 40,
                    borderWidth: 0,
                    backgroundColor: "transparent",
                    color: "#000",
                  }}
                  value={selectedAllergen}
                  onChange={(e) => setSelectedAllergen(e.target.value)}
                >
                  <option value="">Selecciona un alérgeno...</option>
                  {availableAllergens
                    .filter((name) => !(filters.allergens || []).includes(name))
                    .map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                </select>
              ) : (
                <Text style={{ color: "#808080", paddingLeft: 8 }}>
                  Todos los alérgenos han sido añadidos
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                if (
                  selectedAllergen &&
                  !filters.allergens?.includes(selectedAllergen)
                ) {
                  setFilters({
                    ...filters,
                    allergens: [...(filters.allergens || []), selectedAllergen],
                  });
                  setSelectedAllergen("");
                }
              }}
            >
              <Text style={styles.addButtonText}>Añadir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagsContainer}>
            {(filters.allergens || []).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => {
                  const updated = [...(filters.allergens || [])];
                  updated.splice(index, 1);
                  setFilters({ ...filters, allergens: updated });
                }}
              >
                <Text style={styles.tagText}>{item} ×</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>




            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Restablecer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => onApplyFilters(filters)}
              >
                <Text style={styles.applyButtonText}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

export default RecipeFilterComponent;
