import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { API_KEY, BASE_URL } from "../utils/constants";
import { WeatherRawData } from "../utils/types";

/**
 * Hooks qui fait l'appel vers l'API OpenWeather
 * @returns [weather, permissionStatus]
 */
export default function useWeather() {
  const [weather, setWeather] = useState<WeatherRawData>();
  const [permissionStatus, setPermissionStatus] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (ignore) {
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionStatus(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //         `${BASE_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=${API_KEY}&units=metric`

      let weather: WeatherRawData = await fetch(
        `${BASE_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      setWeather(weather);
    }

    let ignore = false;

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return [weather, permissionStatus];
}
