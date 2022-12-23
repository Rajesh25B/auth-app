import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "store/thunks/registerUser";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    registered: false,
  },
  reducers: {
    resetRegistered(state, action) {
      // resets back to false when registered got true(when user registered)
      state.registered = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registered = true;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { resetRegistered } = authSlice.actions;
export const userReducer = authSlice.reducer;
