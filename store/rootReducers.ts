import cityWeatherSlice from "./cityWeatherSlice";
import { CityWeatherStateType, WeatherStateType } from "./types";
import weatherReducer from "./weatherSlice";

export type StateType = {
  cityWeather: CityWeatherStateType;
  weather: WeatherStateType;
};

const rootReducers = {
  cityWeather: cityWeatherSlice,
  weather: weatherReducer,
};

export default rootReducers;
