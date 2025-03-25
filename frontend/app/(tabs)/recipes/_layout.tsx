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
					title: "Recetas",
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

