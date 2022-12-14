import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    authenticated: false,
    auth: {
        email: "",
        idToken: "",
        localId: "",
        expiresIn: "",
        refreshToken: ""
    }
}

const saveTokenInLocalStorage = (data) => {
    localStorage.setItem("userDetails", JSON.stringify({...data, loginTime:data.loginTime || new Date()}))
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        confirmSignUp: (state, action) => {
            state.created = true
            delete state.fail
        },
        failSignUp: (state, action) => {
            state.fail = true
            delete state.created
        },
        storeSignUpResponse: (state, action) => {
            state.auth = action.payload
            state.authenticated = true
        },
        logOut: (state, action) => {
            return initialState
        } 
    }
})

export const { confirmSignUp, failSignUp, storeSignUpResponse, logOut } = authSlice.actions
export default authSlice.reducer

export const signUpThunk = (email, password) => {
    const payload = { email, password, returnSecureToken: true }
    return async (dispatch, getState) => {
        try {
            const user = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK4-1Hm8KHdmdKj10rUiUXNaFBvZa2bo4`, payload)
            dispatch(confirmSignUp())
            dispatch(storeSignUpResponse(user.data))
            saveTokenInLocalStorage(user.data)
        }
        catch (err) {
            const { response } = err
            const { data } = response
            const { error } = data
            window.alert(error.message)
            dispatch(failSignUp())
        }
    }
}
export const logInThunk = (email, password) => {
    const payload = { email, password, returnSecureToken: true }
    return async (dispatch, getState) => {
        try {
            const user = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK4-1Hm8KHdmdKj10rUiUXNaFBvZa2bo4`, payload)
            dispatch(confirmSignUp())
            dispatch(storeSignUpResponse(user.data))
            saveTokenInLocalStorage(user.data)
        }
        catch (err) {
            const { response } = err
            const { data } = response
            const { error } = data
            window.alert(error.message)
            dispatch(failSignUp())
        }
    }
}

export const autoLogin = (dispatch) => {
    const data = localStorage.getItem("userDetails")
    const dataObj = JSON.parse(data)
    debugger
    if(!data || (new Date() - new Date(dataObj.loginTime)) > dataObj.expiresIn * 1000) {
        localStorage.removeItem("userDetails")
        dispatch(logOut())
        return
    } 
    dispatch(storeSignUpResponse(dataObj))

}