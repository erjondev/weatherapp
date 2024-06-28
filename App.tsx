import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import WeatherSearch from "./WeatherSearch";
const App = () => {
  return (
    <Provider store={store}>
      <WeatherSearch />
    </Provider>
  );
};
export default App;
