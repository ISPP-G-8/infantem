import React, { useState } from "react";
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
                <Text style={styles.label}>Edad mínima</Text>
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
                <Text style={styles.label}>Edad máxima</Text>
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
                <TextInput
                  style={styles.addItemInput}
                  placeholder="Añade un alérgeno"
                  value={allergen}
                  onChangeText={setAllergen}
                  placeholderTextColor="#A0A0A0"
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addAllergen}
                >
                  <Text style={styles.addButtonText}>Añadir</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {(filters.allergens || []).map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tag}
                    onPress={() => removeAllergen(index)}
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
