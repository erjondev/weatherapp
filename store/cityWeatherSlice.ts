import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CITY_WEATHER, WeatherRawData, CityWeatherStateType } from "./types";

const weatherInitialState: CityWeatherStateType = {
  cityWeather: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const cityWeatherSlice = createSlice({
  name: CITY_WEATHER,
  initialState: weatherInitialState,
  reducers: {
    getCityWeatherAction: (
      state: CityWeatherStateType,
      { payload: city }: PayloadAction<string>
    ) => {
      return {
        ...state,
        isLoading: false,
        errors: "",
      };
    },
    getCityWeatherSuccessAction: (
      state: CityWeatherStateType,
      { payload: cityWeather }: PayloadAction<WeatherRawData>
    ) => {
      return {
        data: cityWeather,
        isLoading: false,
        errors: "",
      };
    },
    getCityWeatherErrorAction: (
      state: CityWeatherStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      return {
        ...state,
        isLoading: false,
        errors: error,
      };
    },
  },
});

export const {
  getCityWeatherAction,
  getCityWeatherSuccessAction,
  getCityWeatherErrorAction,
} = cityWeatherSlice.actions;
export default cityWeatherSlice.reducer;
