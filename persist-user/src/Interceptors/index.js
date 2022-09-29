import axios from "axios";
import store from "./../store/store"
const axiosInstance = axios.create({
    baseURL: "https://userpersistance-default-rtdb.firebaseio.com"
})

axiosInstance.defaults.headers.common["authorization"] = "known auth"

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState().auth
    
    console.log('config', state)
    config.params = config.params || {}
    config.params.auth = state.auth.idToken
    return config
})

export default axiosInstance