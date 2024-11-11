import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie } from "../types/movies";

interface MoviesState {
  list: Movie[];
  loading: boolean;
  error: string | undefined;
}

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/movies`
  );
  return response.data;
});

const initialState: MoviesState = {
  list: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
      state.error = initialState.error;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.loading = initialState.loading;
      state.list = action.payload;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loading = initialState.loading;
      state.list = initialState.list;
      state.error = action.error.message;
    });
  },
});

export const reducer = slice.reducer;

export default reducer;
