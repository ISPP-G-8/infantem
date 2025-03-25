import { router, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
//import { Redirect } from "expo-router";

export default function TabLayout() {
  
  const { isAuthenticated, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        router.replace('/signin');
      }
    };

    verifyAuth();
  }, []);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
      <Tabs>
        <Tabs.Screen
        name="recipes"
        options={{
          headerShown: false,
          lazy: true,
          tabBarLabel: "Recetas",
          tabBarIcon: ({ color }) => (
            <Ionicons name='list' color={color} size={24} />
            ),
        }}
        />
        <Tabs.Screen
        name="allergens"
        options={{
          lazy: true,
          headerShown: false,
          tabBarLabel: "Alérgenos",
          tabBarIcon: ({ color }) => (
            <Ionicons name='medical' color={color} size={24} />
          ),
        }}
        />
        <Tabs.Screen
        name="account"
        options={{
          lazy: true,
          headerShown: false,
          tabBarLabel: "Cuenta",
          tabBarIcon: ({ color }) => (
            <Ionicons name='man' color={color} size={24} />
          ),
        }}
        />
        <Tabs.Screen
        name="baby"
        options={{
          lazy: true,
          headerShown: false,
          tabBarLabel: "Bebé",
          tabBarIcon: ({ color }) => (
            <Ionicons name='folder-sharp' color={color} size={24} />
          ),
        }}
        />
      </Tabs>
      
		);
  // We should return this if the user is not logged in
	// return <Redirect href="/login" />;
}

