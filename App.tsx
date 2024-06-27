import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

import { ICON_URL } from "./utils/constants";
import useWeather from "./hooks/useWeather";

export default function App() {
  const [weather, permissionStatus] = useWeather();

  // Cas ou la permission n'est pas accordée
  if (!permissionStatus) {
    return (
      <View style={styles.container}>
        <Text>
          L'utilisateur n'a pas accordées la permission d'utiliser la
          localisation
        </Text>

        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: ICON_URL + weather?.weather?.[0].icon + "@4x.png",
        }}
      />
      <Text style={styles.paragraph}>Nantes : {weather?.main?.temp}° C</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
