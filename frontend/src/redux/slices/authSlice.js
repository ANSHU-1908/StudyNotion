import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import { sendOtpAPI, signupAPI, loginAPI, logoutAPI } from "../../services/authAPI";

export const sendOTP = createAsyncThunk("auth/sendOTP", async (email, { rejectWithValue }) => {
  try {
    const { data } = await sendOtpAPI(email);
    toast.success(data.message);
    return data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to send OTP");
    return rejectWithValue(err.response?.data);
  }
});

export const signup = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await signupAPI(formData);
    toast.success(data.message);
    return data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
    return rejectWithValue(err.response?.data);
  }
});

export const login = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await loginAPI(formData);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success(data.message);
    return data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    return rejectWithValue(err.response?.data);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    await logoutAPI(token);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out!");
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    otpSent: false,
  },
  reducers: {
    setUser: (state, action) => { state.user = action.payload; },
    clearAuth: (state) => { state.user = null; state.token = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(login.rejected, (state) => { state.loading = false; })
      .addCase(signup.pending, (state) => { state.loading = true; })
      .addCase(signup.fulfilled, (state) => { state.loading = false; })
      .addCase(signup.rejected, (state) => { state.loading = false; })
      .addCase(logout.fulfilled, (state) => { state.user = null; state.token = null; })
      .addCase(sendOTP.fulfilled, (state) => { state.otpSent = true; });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
