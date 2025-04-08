import { Stack,SplashScreen } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Text, Pressable,View } from 'react-native';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Loubag': require('../assets/fonts/Loubag-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Stack
        initialRouteName="signin"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0D47A1', // Azul oscuro
          },
          headerTitle: () => (
              <Text style={{ fontFamily: 'Loubag', fontSize: 24, color: '#fff'}}>
                Infantem
              </Text>
          ),
          headerRight: () => (
            <Pressable onPress={() => router.push('/signin')} style={{ marginRight: 16 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Iniciar sesión</Text>
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="signin"
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}
