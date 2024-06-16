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
  searchFilters: {
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
      console.log("devlog setQuerySearch", state);
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

    /** Favorites */
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

    /** Search */
    setSearchQuerySearch(state, action) {
      console.log("devlog setSearchQuerySearch", state);
      state.searchFilters = {
        ...state.searchFilters,
        query: action.payload,
      };
    },
    setSearchOrdering(state, action) {
      state.searchFilters = {
        ...state.searchFilters,
        ordering: action.payload,
      };
    },
    setSearchPage(state, action) {
      state.searchFilters = {
        ...state.searchFilters,
        page: action?.payload || 1,
      };
    },
    setSearchGenres(state, action) {
      state.searchFilters = {
        ...state.searchFilters,
        genres: action.payload,
      };
    },
    clearSearchFilters(state) {
      state.searchFilters = {
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
  setSearchQuerySearch,
  setSearchOrdering,
  setSearchPage,
  setSearchGenres,
  clearSearchFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
