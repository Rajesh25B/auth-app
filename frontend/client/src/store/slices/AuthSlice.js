const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
  },
  reducers: {
    resetRegistered(state, action) {
      // resets back to false when registered got true(when user registered)
      state.registered = false;
    },
  },
});

export const { resetRegistered } = authSlice.actions;
export const userReducer = authSlice.reducer;
