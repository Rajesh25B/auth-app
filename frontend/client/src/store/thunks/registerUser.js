import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "config";

// register thunk that makes async req to port 5000
export const registerUser = createAsyncThunk(
  "users/register",
  async (
    { first_name, last_name, email, phone_number, password },
    thunkAPI
  ) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      phone_number,
      password,
    });

    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
