import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie } from "../types/movies";

interface MoviesState {
  list: Movie[];
  movie: Movie | null;
  loading: boolean;
  error: string | undefined;
}

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/movies`
  );
  return response.data;
});

export const getMovie = createAsyncThunk(
  "movies/getMovie",
  async (id: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/movies/${id}`
    );
    return response.data;
  }
);

const initialState: MoviesState = {
  list: [],
  movie: null,
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
    builder.addCase(getMovie.pending, (state) => {
      state.loading = true;
      state.error = initialState.error;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.loading = initialState.loading;
      state.movie = action.payload;
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.loading = initialState.loading;
      state.movie = initialState.movie;
      state.error = action.error.message;
    });
  },
});

export const reducer = slice.reducer;

export default reducer;
