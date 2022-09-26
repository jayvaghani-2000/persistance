import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    post:[]
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setPost(state, action){
            state.post = action.payload
        }
    }
})

export const {setPost} = postSlice.actions 

export default postSlice.reducer


export const getPostThunk = () => {
    return async(dispatch, getState) => {
        try {
            const res = await axios.get('https://userpersistance-default-rtdb.firebaseio.com/post.json')
            const parseData = Object.keys(res.data).map(id => ({...res.data[id], id}))
            console.log('parseData', parseData)
            dispatch(setPost(parseData))
        } catch {

        }
    }
}
