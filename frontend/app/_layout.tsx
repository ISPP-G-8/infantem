import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {

  // We must manage the login logic to got an AuthProvider.
    return (
      <AuthProvider>
        <Stack
          initialRouteName="signin"
          screenOptions={{
            headerTitle: "Infantem",
          }}
        >
          <Stack.Screen
            name="signin"
            options={{
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
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
      </AuthProvider>

  );
}

