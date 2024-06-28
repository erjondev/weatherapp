import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  WeatherRawData,
  GET_WEATHER_BY_COORD,
  Coord,
  GET_WEATHER_BY_CITY,
} from "./types";
import { getWeatherErrorAction, getWeatherSuccessAction } from "./weatherSlice";
import { API_KEY, BASE_URL, BASE_URL_CITY } from "../utils/constants";
import {
  getCityWeatherErrorAction,
  getCityWeatherSuccessAction,
} from "./cityWeatherSlice";

function* getWeatherSaga({ payload: coord }: PayloadAction<Coord>) {
  try {
    const response: AxiosResponse<WeatherRawData> = yield axios.get(
      `${BASE_URL}lat=${coord.lat}&lon=${coord.lon}&APPID=${API_KEY}&units=metric`
    );
    yield put(getWeatherSuccessAction(response.data));
  } catch (error: AxiosError) {
    yield put(getWeatherErrorAction(error.code));
  }
}

export function* watchGetWeather() {
  yield takeLatest(GET_WEATHER_BY_COORD, getWeatherSaga);
}

function* getCityWeatherSaga({ payload: city }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<WeatherRawData> = yield axios.get(
      `${BASE_URL_CITY}${city}&APPID=${API_KEY}&units=metric`
    );
    yield put(getCityWeatherSuccessAction(response.data));
  } catch (error: AxiosError) {
    yield put(getCityWeatherErrorAction(error.code));
  }
}

export function* watchGetCityWeather() {
  yield takeLatest(GET_WEATHER_BY_CITY, getCityWeatherSaga);
}
