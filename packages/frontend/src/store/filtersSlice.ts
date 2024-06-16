import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuredFilters: {
    query: "",
    ordering: "Padrão",
    genres: [],
    page: 1,
  },
  favoritesFilters: {
    query: "",
    ordering: "Padrão",
    genres: [],
    page: 1,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuerySearch(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        query: action.payload,
      };
    },
    setOrdering(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        ordering: action.payload,
      };
    },
    setPage(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        page: action?.payload || 1,
      };
    },
    setGenres(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        genres: action.payload,
      };
    },
    clearFilters(state) {
      state.featuredFilters = {
        query: "",
        ordering: "Padrão",
        genres: [],
        page: 1,
      };
    },

    setFavoritesQuerySearch(state, action) {
      state.favoritesFilters = {
        ...state.favoritesFilters,
        query: action.payload,
      };
    },
    setFavoritesOrdering(state, action) {
      state.favoritesFilters = {
        ...state.favoritesFilters,
        ordering: action.payload,
      };
    },
    setFavoritesPage(state, action) {
      state.favoritesFilters = {
        ...state.favoritesFilters,
        page: action?.payload || 1,
      };
    },
    setFavoritesGenres(state, action) {
      state.favoritesFilters = {
        ...state.favoritesFilters,
        genres: action.payload,
      };
    },
    clearFavoritesFilters(state) {
      state.favoritesFilters = {
        query: "",
        ordering: "Padrão",
        genres: [],
        page: 1,
      };
    },
  },
});

export const {
  setQuerySearch,
  setOrdering,
  setPage,
  setGenres,
  clearFilters,
  setFavoritesQuerySearch,
  setFavoritesOrdering,
  setFavoritesPage,
  setFavoritesGenres,
  clearFavoritesFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
