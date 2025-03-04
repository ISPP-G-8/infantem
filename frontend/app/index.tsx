import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text>Hello world, frontend is working. :D</Text>
      <Text>This page is not implemented yet. It has not styles.</Text>
      <Link
        href="/appStyleSamples"
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
        }}
      >
        Click here to check a showcase of the styles.
      </Link>

      <Link
        href="/auth/LoginScreen"
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          marginTop: 20
        }}>
        Go to Login Screen
      </Link>

      <Link
        href="/auth/ProfileScreen"
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          marginTop: 20
        }}>
        Profile
      </Link>
    </View>
  );
}

