import { Stack } from "expo-router";

function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleStyle: {
					fontWeight: "normal",
					fontSize: 20,
					fontFamily: "sans-serif",
					color: "#1565C0",
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Calendario",
				}}
			/>

      		

		</Stack>
	);
}

export default StackLayout;
