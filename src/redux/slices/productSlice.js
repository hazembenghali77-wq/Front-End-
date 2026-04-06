import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProduct = createAsyncThunk("GetProduct", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get("/getproduct",data)
        return res.data
    } catch (err) {
        return rejectWithValue(err.response.data.msg)
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        products: [],
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [GetProduct.pending]: (state) => { state.isLoading = true },
        [GetProduct.fulfilled]: (state, action) => {
            state.isLoading = false
            state.products = action.payload.Product
            state.error = null
        },
        [GetProduct.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default productSlice.reducer
