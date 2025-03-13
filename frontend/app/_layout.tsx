import { Stack } from 'expo-router';

export default function RootLayout() {

  // We must manage the login logic to got an AuthProvider.
  return (
    <Stack
      initialRouteName="signin"
      screenOptions={{
        headerTitle: "Infantem",
      }}
    >
      <Stack.Screen
        name="signin"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

