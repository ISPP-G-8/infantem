import { Stack } from "expo-router";
import { Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

function StackLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0D47A1", // Azul oscuro
        },
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Loubag",
              fontSize: 24,
              color: "#fff",
            }}
          >
            Infantem
          </Text>
        ),
        
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "", // No se muestra porque usamos headerTitle personalizado
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "Detalles",
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "Añade una receta",
        }}
      />
    </Stack>
  );
}

export default StackLayout;
