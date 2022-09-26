import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import counterSlice from "./counterSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        counter:counterSlice,
        post:postSlice,
        auth:authSlice
    }
})

export default store