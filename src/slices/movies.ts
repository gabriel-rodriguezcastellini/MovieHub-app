import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { Movie } from "../types/movies";
import { handleAxiosError } from "../utils/errorHandler";

interface MoviesState {
  visibleMovies: Movie[];
  movies: Movie[];
  movie: Movie | null;
  loading: boolean;
  error: string | undefined;
  updatingVisibility: boolean;
}

const initialState: MoviesState = {
  visibleMovies: [],
  movies: [],
  movie: null,
  loading: false,
  error: undefined,
  updatingVisibility: false,
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getVisibleMovies = createAsyncThunk(
  "movies/getVisibleMovies",
  async () => {
    const response = await axios.get(`${apiBaseUrl}/movies/visible`);
    return response.data;
  }
);

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await axios.get(`${apiBaseUrl}/movies`);
  return response.data;
});

export const getMovie = createAsyncThunk(
  "movies/getMovie",
  async (id: string) => {
    const response = await axios.get(`${apiBaseUrl}/movies/${id}`);
    return response.data;
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie: Movie, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/movies`, movie);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (
    { id, data }: { id: string; data: Omit<Movie, "_id"> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${apiBaseUrl}/movies/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/movies/${id}`);
      return response.data;
    } catch {
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const updateMovieVisibility = createAsyncThunk(
  "movies/updateMovieVisibility",
  async (
    { id, isVisible }: { id: string; isVisible: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/movies/${id}/visibility`,
        { isVisible }
      );
      return response.data;
    } catch {
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMovie: (state) => {
      state.movie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVisibleMovies.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getVisibleMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.visibleMovies = action.payload;
      })
      .addCase(getVisibleMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.error = undefined;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateMovie.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.error = undefined;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.error = undefined;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateMovieVisibility.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateMovieVisibility.fulfilled, (state) => {
        state.error = undefined;
      })
      .addCase(updateMovieVisibility.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const reducer = moviesSlice.reducer;
export default reducer;
