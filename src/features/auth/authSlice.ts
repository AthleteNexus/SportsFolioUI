import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axios";


interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  status: "idle",
};


export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await api.post("/login", credentials);
    return response.data.token;
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;