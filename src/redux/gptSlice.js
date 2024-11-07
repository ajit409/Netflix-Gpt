import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    toggleSearchGpt: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});

export const { toggleSearchGpt } = gptSlice.actions;
export default gptSlice.reducer;
