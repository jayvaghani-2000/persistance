import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        counter:counterSlice,
        post:postSlice
    }
})

export default store