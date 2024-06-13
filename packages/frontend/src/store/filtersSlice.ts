import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuredFilters: {
    q: "",
    ordering: "Padrão",
    genres: [],
    currentPage: 1,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuerySearch(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        q: action.payload,
      };
    },
    setOrdering(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        ordering: action.payload,
      };
    },
    setCurrentPage(state, action) {
      state.featuredFilters = {
        ...state.featuredFilters,
        currentPage: action.payload,
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
        q: "",
        ordering: "Padrão",
        genres: [],
        currentPage: 1,
      };
    },
  },
});

export const {
  setQuerySearch,
  setOrdering,
  setCurrentPage,
  setGenres,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
