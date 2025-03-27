import { Stack } from "expo-router";
import { Text, Pressable } from "react-native";

function StackLayout() {
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
						Cuenta
					</Text>
				),

			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Cuenta",
				}}
			/>
		</Stack>
	);
}

export default StackLayout;


