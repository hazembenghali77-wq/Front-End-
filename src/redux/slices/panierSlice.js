import { createSlice } from "@reduxjs/toolkit";

const panierSlice = createSlice({
    name: "panier",
    initialState: {
        isLoading: false,
        products: [],
        error: null
    },
    reducers: {
        addproductpanier: (state, action) => {
            const existing = state.products.find(p => p._id === action.payload._id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.products.push({ ...action.payload, quantity: 1 })
            }
        },
        incrementQuantity: (state, action) => {
            const product = state.products.find(p => p._id === action.payload)
            if (product) product.quantity += 1
        },
        decrementQuantity: (state, action) => {
            const product = state.products.find(p => p._id === action.payload)
            if (product) {
                if (product.quantity === 1) {
                    state.products = state.products.filter(p => p._id !== action.payload)
                } else {
                    product.quantity -= 1
                }
            }
        },
        removeproduct: (state, action) => {
            state.products = state.products.filter(p => p._id !== action.payload)
        }
    },
})

export const { addproductpanier, incrementQuantity, decrementQuantity, removeproduct } = panierSlice.actions
export default panierSlice.reducer