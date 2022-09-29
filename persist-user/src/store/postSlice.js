import { createSlice } from "@reduxjs/toolkit";
import axios from "./../Interceptors/index";
import { autoLogin } from "./authSlice";

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
        autoLogin(dispatch)
        const state = getState().auth
        console.log('state', state)
        if(!state.authenticated) return
        try {
            const res = await axios.get(`/post.json`)
            const parseData = Object.keys(res.data).map(id => ({...res.data[id], id}))
            console.log('parseData', parseData)
            dispatch(setPost(parseData))
        } catch {

        }
    }
}

export const postPostThunk = (data) => {
    return async(dispatch, getState) => {
        
        try {
            const res = await axios.post('/post.json', JSON.stringify(data))
            if (res && res.data) {
                dispatch(getPostThunk())
            }
        } catch {

        }
    }
}
export const updatePostThunk = (id,data) => {
    return async(dispatch, getState) => {
        try {
            const res = await axios.put(`/post/${id}.json`, JSON.stringify(data))
            if (res && res.data) {
                dispatch(getPostThunk())
            }
        } catch {

        }
    }
}
