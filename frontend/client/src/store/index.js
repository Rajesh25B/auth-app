import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "store/slices/AuthSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
