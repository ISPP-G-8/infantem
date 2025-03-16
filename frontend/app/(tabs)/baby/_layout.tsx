import { Stack } from "expo-router";

function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleStyle: {
					fontWeight: "normal",
					fontSize: 25,
					fontFamily: "sans-serif",
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Mis bebés",
				}}
			/>
			<Stack.Screen
				name="edit"
				options={{
					title: "Modificar datos del bebé",
				}}
			/>
      <Stack.Screen
				name="add"
				options={{
					title: "Añadir un bebé",
				}}
			/>

		</Stack>
	);
}

export default StackLayout;
