import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  const gs = require("../static/styles/globalStyles"); 

  return (
    <View style={[gs.container, { justifyContent: "center" }]}>

      <View style={[gs.card, {maxWidth: 500}]}> 
        <Text style={gs.headerText}> Bienvenido a Infantem </Text>
        <Text style={gs.subHeaderText}>Aquí podrás dar el mejor cuidado a tu bebé.</Text>
      
        <View style={{marginTop:20, gap:10}}> 
          <Link style={[gs.mainButton, {width:"100%", textAlign:"center"}]} href={"/signin"}>
            <Text style={gs.mainButtonText} >Inicia sesión</Text>
          </Link>
          <Link style={[gs.secondaryButton, {width:"100%", textAlign:"center"}]} href={"/recipes"}>
            <Text style={gs.secondaryButtonText} >Continúa como invitado</Text>
          </Link>
        </View>

      </View>
		</View>
  );
}

