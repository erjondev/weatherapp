export interface WeatherRawData {
  coord?: Coord;
  weather?: Weather[];
  base?: string;
  main?: Main;
  visibility?: number;
  wind?: Wind;
  rain?: Rain;
  clouds?: Clouds;
  dt?: number;
  sys?: Sys;
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

export interface IWeatherRawData {
  data: WeatherRawData | null;
  isLoading: boolean;
  errors: string;
}

export type WeatherStateType = {
  weather: IWeatherRawData;
};

export const WEATHER = "weather";
export type WEATHER = typeof WEATHER;

export const GET_WEATHER_BY_COORD = `${WEATHER}/getWeatherAction`;
export type GET_WEATHER_BY_COORD = typeof GET_WEATHER_BY_COORD;

export type CityWeatherStateType = {
  cityWeather: IWeatherRawData;
};

export const CITY_WEATHER = "cityWeather";
export type CITY_WEATHER = typeof CITY_WEATHER;

export const GET_WEATHER_BY_CITY = `${CITY_WEATHER}/getCityWeatherAction`;
export type GET_WEATHER_BY_CITY = typeof GET_WEATHER_BY_CITY;

interface Clouds {
  all?: number;
}

export interface Coord {
  lon?: number;
  lat?: number;
}

interface Main {
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  humidity?: number;
  sea_level?: number;
  grnd_level?: number;
}

interface Rain {
  "1h"?: number;
}

interface Sys {
  type?: number;
  id?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;
}

interface Weather {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
}

interface Wind {
  speed?: number;
  deg?: number;
  gust?: number;
}
