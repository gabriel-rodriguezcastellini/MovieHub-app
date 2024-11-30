import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { Movie } from "../types/movies";

interface MoviesState {
  visibleMovies: Movie[];
  movies: Movie[];
  movie: Movie | null;
  loading: boolean;
  error: string | undefined;
  updatingVisibility: boolean;
}

export const getVisibleMovies = createAsyncThunk(
  "movies/getVisibleMovies",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/movies/visible`
    );
    return response.data;
  }
);

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

export const updateMovieVisibility = createAsyncThunk(
  "movies/updateMovieVisibility",
  async ({ id, isVisible }: { id: string; isVisible: boolean }) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/movies/${id}/visibility`,
      { isVisible }
    );
    return { id, isVisible };
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie: Movie, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/movies`,
        movie
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error adding movie:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (
    {
      id,
      ...data
    }: {
      id: string;
      title: string;
      description: string;
      imageUrl: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/movies/${id}`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error updating movie:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: MoviesState = {
  visibleMovies: [],
  movies: [],
  movie: null,
  loading: false,
  error: undefined,
  updatingVisibility: false,
};

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateLocalVisibility: (state, action) => {
      const updatedMovie = action.payload;
      const index = state.movies.findIndex(
        (movie) => movie._id === updatedMovie.id
      );
      if (index !== -1) {
        state.movies[index].isVisible = updatedMovie.isVisible;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVisibleMovies.pending, (state) => {
      state.loading = true;
      state.error = initialState.error;
    });
    builder.addCase(getVisibleMovies.fulfilled, (state, action) => {
      state.loading = initialState.loading;
      state.visibleMovies = action.payload;
    });
    builder.addCase(getVisibleMovies.rejected, (state, action) => {
      state.loading = initialState.loading;
      state.visibleMovies = initialState.visibleMovies;
      state.error = action.error.message;
    });
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
      state.error = initialState.error;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.loading = initialState.loading;
      state.movies = action.payload;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loading = initialState.loading;
      state.movies = initialState.visibleMovies;
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
    builder.addCase(updateMovieVisibility.pending, (state) => {
      state.updatingVisibility = true;
      state.error = initialState.error;
    });
    builder.addCase(updateMovieVisibility.fulfilled, (state) => {
      state.updatingVisibility = initialState.updatingVisibility;
    });
    builder.addCase(updateMovieVisibility.rejected, (state, action) => {
      state.updatingVisibility = initialState.updatingVisibility;
      state.error = action.error.message;
    });
    builder.addCase(addMovie.pending, (state) => {
      state.error = initialState.error;
    });
    builder.addCase(addMovie.fulfilled, (state) => {
      state.error = initialState.error;
    });
    builder.addCase(addMovie.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateMovie.pending, (state) => {
      state.error = initialState.error;
    });
    builder.addCase(updateMovie.fulfilled, (state) => {
      state.error = initialState.error;
    });
    builder.addCase(updateMovie.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { updateLocalVisibility } = slice.actions;

export const reducer = slice.reducer;

export default reducer;
