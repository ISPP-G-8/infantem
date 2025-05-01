import { Stack, router } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { Text } from 'react-native';

export default function CustomRecipeLayout() {
  const { user } = useAuth();

  if (!(user?.role === "nutritionist" || user?.role === "premium")) 
        router.replace('/recipes');

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
      <Stack.Screen name="ask" options={{ title: "Solicita una receta" }} />
		</Stack>
	);
}



