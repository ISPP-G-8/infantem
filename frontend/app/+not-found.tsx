import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const gs = require("../static/styles/globalStyles");

	return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={[gs.container, {justifyContent:"center"}]}>
        <Text style={gs.headerText}>This screen does not exist.</Text>
        <Link href="/" style={{marginTop: 15, paddingVertical: 15}}>
          <Text style={{color: "#2e78b7"}}>Go to home screen!</Text>
        </Link>
      </View>
    </>
	);
}

