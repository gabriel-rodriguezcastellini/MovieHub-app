import { combineReducers } from "@reduxjs/toolkit";
import { reducer as moviesReducer } from "../slices/movies";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
