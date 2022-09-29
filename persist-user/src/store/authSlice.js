import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    auth: {
        email: "",
        idToken: "",
        localId: "",
        expiresIn: "",
        refreshToken: ""
    }
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
        }
    }
})

export const { confirmSignUp, failSignUp, storeSignUpResponse } = authSlice.actions
export default authSlice.reducer

export const signUpThunk = (email, password) => {
    const payload = { email, password, returnSecureToken: true }
    return async (dispatch, getState) => {
        try {
            const user = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK4-1Hm8KHdmdKj10rUiUXNaFBvZa2bo4`, payload)
            debugger
            dispatch(confirmSignUp())
            dispatch(storeSignUpResponse(user.data))
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