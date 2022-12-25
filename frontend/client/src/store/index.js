import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "store/slices/AuthSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
console.log(store.getState());
export default store;

export * from "./thunks/getUser";
export * from "./thunks/login";
export * from "./thunks/logout";
export * from "./thunks/registerUser";
