import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ICON_URL } from "./utils/constants";
import useWeather from "./hooks/useWeather";
import { useState } from "react";
import { WeatherRawData } from "./utils/types";

export default function App() {
  const [localWeather, permissionStatus, searchCity] = useWeather();
  const [city, setCity] = useState();
  const [searchError, setSearchError] = useState(false);
  const [pending, setPending] = useState(false);
  const [searchedCityWeather, setSearchedCityWeather] =
    useState<WeatherRawData>();

  const handleSearch = async () => {
    setPending(true);
    setSearchError(false);
    try {
      const data = await searchCity(city);
      if (data.cod !== 200) {
        setSearchError(true);
        setPending(false);
        setSearchedCityWeather(undefined);
        return;
      }
      setSearchedCityWeather(data);
      setPending(false);
    } catch (error) {
      console.log("ERROR :", error);
      setPending(false);
    }
  };

  // We don't have location authorisation
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

  const displayedWeather = searchedCityWeather ?? localWeather;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setCity}
          value={city}
          placeholder="Search a city"
        />
        <Button onPress={handleSearch} title="Search" color="#841584" />
      </SafeAreaView>
      {searchError && (
        <Text style={styles.errorMessage}>
          Un erreur est survenue pendant la recherche de ville ! {"\n"}
          On affiche la météo local :)
        </Text>
      )}
      {pending ? (
        <Text>Recherche en cours...</Text>
      ) : (
        <>
          <Image
            style={styles.logo}
            source={{
              uri: ICON_URL + displayedWeather?.weather?.[0].icon + "@4x.png",
            }}
          />
          <Text style={styles.paragraph}>
            {displayedWeather?.name} :{displayedWeather?.main?.temp} ° C
          </Text>
        </>
      )}

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
  errorMessage: {
    backgroundColor: "#FAA0A0",
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
