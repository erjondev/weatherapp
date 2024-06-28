import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  Pressable,
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
  const [city, setCity] = useState("");

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
    if (coord) {
      dispatch(getWeatherAction(coord));
    }
  }, [coord]);

  const displayedWeather = data ?? localWeather.data;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.searchbar}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            style={styles.input}
            onChangeText={setCity}
            value={city}
            placeholder="Search a city"
          />
          {city && (
            <Pressable onPress={() => setCity("")}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          )}

          <Pressable style={styles.pressBtn} onPress={handleSearch}>
            <AntDesign
              name="find"
              size={city == "" ? 24 : 40}
              color={city == "" ? "black" : "#841584"}
            />
          </Pressable>
        </View>
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
        <View style={styles.weatherInfo}>
          <Image
            style={styles.logo}
            source={{
              uri: ICON_URL + displayedWeather?.weather?.[0].icon + "@4x.png",
            }}
          />
          <Text style={styles.paragraph}>
            {displayedWeather?.name} : {displayedWeather?.main?.temp} °C
          </Text>
        </View>
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
    justifyContent: "space-evenly",
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  pressBtn: {
    marginLeft: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  paragraph: {
    fontSize: 30,
    textAlign: "center",
  },
  weatherInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    backgroundColor: "#FAA0A0",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
  },
});
