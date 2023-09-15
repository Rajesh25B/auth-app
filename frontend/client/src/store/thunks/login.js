import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "./getUser";
import { API_URL } from "config";

// login thunk that makes async req to port 5000
const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json(); // receives the data from Express router handler
      console.log(data);

      if (res.status === 200) {
        const { dispatch } = thunkAPI;
        dispatch(getUser());
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.res.data);
    }
  }
);

export { login };
