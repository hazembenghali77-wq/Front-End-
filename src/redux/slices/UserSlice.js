import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk("Register", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post("/register", data);
        return res.data;
        
    } catch (err) {
        return rejectWithValue(err.response.data.msg);
    }
});

export const LoginUser = createAsyncThunk("Login", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post("/login", data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.msg);
    }
});

const UserSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        token: localStorage.getItem("token") || null,
        isAuth: localStorage.getItem("isAuth") === "true",
        error: null,
        role: localStorage.getItem("role") || null,
        username: localStorage.getItem("username") || null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("isAuth");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            state.token = null;
            state.isAuth = false;
            state.role = null;
            state.username = null;
        },
        clearMessage:(state) => {
            state.message = null
        }
    },
    extraReducers: {
        [RegisterUser.pending]: (state) => {
            state.isLoading = true;
        },
        [RegisterUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.isAuth = false;
            state.error = null;
            state.message = action.payload.msg;
            localStorage.setItem("token", state.token);
        },
        [RegisterUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuth = false;
            state.message = action.payload
        },
        [LoginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [LoginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.isAuth = true;
            state.role = action.payload.User.role;
            state.username = action.payload.User.username;
            state.error = null;
            localStorage.setItem("token", state.token);
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("role", state.role);
            localStorage.setItem("username", state.username);
            state.message = action.payload.msg
        },
        [LoginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuth = false;
            state.message = action.payload
            
        }
    }
});

export default UserSlice.reducer;
export const { logout,clearMessage } = UserSlice.actions;