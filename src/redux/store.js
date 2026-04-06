import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "./slices/UserSlice"
import productSlice from "../redux/slices/productSlice"
import panierSlice from "../redux/slices/panierSlice"

export default configureStore({reducer: {user:UserSlice,products:productSlice,panier:panierSlice}})