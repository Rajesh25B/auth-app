import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "store/slices/AuthSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
console.log(store.getState());
export default store;
