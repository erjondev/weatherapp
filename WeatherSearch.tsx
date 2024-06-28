import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import useLocationPerm from "./hooks/useLocationPerm";
import { getCityWeatherAction } from "./store/cityWeatherSlice";
import { CityWeatherStateType, WeatherStateType } from "./store/types";
import { getWeatherAction } from "./store/weatherSlice";

export default function WeatherSearch() {
  const dispatch = useDispatch();

  const { data, isLoading, errors } = useSelector(
    (state: CityWeatherStateType) => state.cityWeather
  );

  const localWeather = useSelector((state: WeatherStateType) => state.weather);

  const [permissionStatus, coord] = useLocationPerm();
  const [city, setCity] = useState();

  const handleSearch = () => {
    dispatch(getCityWeatherAction(city));
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

  useEffect(() => {
    dispatch(getWeatherAction(coord));
  }, [coord]);

  const displayedWeather = data ?? localWeather.data;

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
      {errors && (
        <Text style={styles.errorMessage}>
          Un erreur est survenue pendant la recherche de ville ! {"\n"}
          On affiche la météo de la dernière ville :)
        </Text>
      )}
      {isLoading || localWeather.isLoading ? (
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
