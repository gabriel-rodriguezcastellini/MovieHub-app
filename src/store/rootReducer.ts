import { combineReducers } from "@reduxjs/toolkit";
import { reducer as moviesReducer } from "../slices/movies";
import notificationReducer from "../slices/notifications";

const rootReducer = combineReducers({
  movies: moviesReducer,
  notification: notificationReducer,
});

export default rootReducer;
