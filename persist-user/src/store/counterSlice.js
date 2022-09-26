import { createSlice } from '@reduxjs/toolkit';

const initialState = 0

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        add(state, action){
            return state+1
        }
    }
})

export const {add} = counterSlice.actions

export default counterSlice.reducer