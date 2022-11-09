import { createSlice } from "@reduxjs/toolkit";

const initialState = { global: {} };

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalState: (state, action) => {
      if (typeof action.payload === "object") {
        state.global = { ...state.global, ...action.payload };
      }
    },
  },
});

export const { setGlobalState } = globalSlice.actions;

export default globalSlice.reducer;
