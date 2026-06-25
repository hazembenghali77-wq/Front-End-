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
        username: localStorage.getItem("username") || null,
        email: localStorage.getItem("email") || null,
        userId: localStorage.getItem("userId") || null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("isAuth");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
            state.token = null;
            state.isAuth = false;
            state.role = null;
            state.username = null;
            state.email = null;
            state.userId = null;
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
            state.role = action.payload.User?.role || null;
            state.username = action.payload.User?.username || null;
            state.email = action.payload.User?.email || null;
            state.userId = action.payload.User?._id || null;
            state.error = null;
            state.message = action.payload.msg;
            localStorage.setItem("token", state.token);
            localStorage.setItem("isAuth", state.isAuth ? "true" : "false");
            localStorage.setItem("role", state.role);
            localStorage.setItem("username", state.username);
            localStorage.setItem("email", state.email);
            localStorage.setItem("userId", state.userId);
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
            state.email = action.payload.User.email;
            state.userId = action.payload.User._id;
            state.error = null;
            localStorage.setItem("token", state.token);
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("role", state.role);
            localStorage.setItem("username", state.username);
            localStorage.setItem("email", state.email);
            localStorage.setItem("userId", state.userId);
            state.message = action.payload.msg
        },
        [LoginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuth = false;
            state.userId = null;
            state.email = null;
            state.message = action.payload
            
        }
    }
});

export default UserSlice.reducer;
export const { logout,clearMessage } = UserSlice.actions;