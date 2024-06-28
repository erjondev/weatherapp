import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coord, WEATHER, WeatherRawData, WeatherStateType } from "./types";

const weatherInitialState: WeatherStateType = {
  weather: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const weatherSlice = createSlice({
  name: WEATHER,
  initialState: weatherInitialState,
  reducers: {
    getWeatherAction: (
      state: WeatherStateType,
      { payload: coord }: PayloadAction<Coord>
    ) => {
      return {
        ...state,
        isLoading: false,
        errors: "",
      };
    },
    getWeatherSuccessAction: (
      state: WeatherStateType,
      { payload: weather }: PayloadAction<WeatherRawData>
    ) => {
      return {
        data: weather,
        isLoading: false,
        errors: "",
      };
    },
    getWeatherErrorAction: (
      state: WeatherStateType,
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
  getWeatherAction,
  getWeatherSuccessAction,
  getWeatherErrorAction,
} = weatherSlice.actions;
export default weatherSlice.reducer;
