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
					title: "Cuenta",
				}}
			/>
		</Stack>
	);
}

export default StackLayout;


