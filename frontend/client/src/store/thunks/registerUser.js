const { createAsyncThunk } = require("@reduxjs/toolkit");

// register thunk that makes async req to port 5000
export const registerUser = createAsyncThunk(
  "users/register",
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

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
