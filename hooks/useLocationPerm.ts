import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Coord } from "../store/types";

/**
 * Hooks that ask for location authorisation and return local coordonates
 * @returns permissionStatus : bool, true location granted
 * @returns coord : Coord, { lon: number;  lat: number }
 */
export default function useLocationPerm() {
  const [permissionStatus, setPermissionStatus] = useState(true);
  const [coord, setCoord] = useState<Coord>();

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

      const coord = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };

      setCoord(coord);
    }

    let ignore = false;

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return [permissionStatus, coord];
}
