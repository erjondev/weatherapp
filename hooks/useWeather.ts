import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { API_KEY, BASE_URL, BASE_URL_CITY } from "../utils/constants";
import { WeatherRawData } from "../utils/types";

/**
 * Hooks that consume the OpenWeather API
 * @returns localWeather : object WeatherRawData containing local weather (uses location)
 * @returns permissionStatus : bool, true location granted
 * @returns searchCity(city: string) : async method to search the weather of a city given un param
 */
export default function useWeather() {
  const [localWeather, setLocalWeather] = useState<WeatherRawData>();
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

      let weather: WeatherRawData = await fetch(
        `${BASE_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      setLocalWeather(weather);
    }

    let ignore = false;

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const searchCity = async (city: string): Promise<WeatherRawData> => {
    let cityWeather: WeatherRawData = await fetch(
      `${BASE_URL_CITY}${city}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    return cityWeather;
  };

  return [localWeather, permissionStatus, searchCity];
}
