import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "store/slices/AuthSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
console.log(store.getState());
export default store;
