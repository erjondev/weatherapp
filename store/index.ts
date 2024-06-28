import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { all, fork } from "redux-saga/effects";
import { watchGetCityWeather, watchGetWeather } from "./sagas";
import rootReducers from "./rootReducers";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield all([fork(watchGetWeather), fork(watchGetCityWeather)]);
};

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
