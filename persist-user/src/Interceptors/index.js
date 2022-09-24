import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://userpersistance-default-rtdb.firebaseio.com"
})

axiosInstance.defaults.headers.common["authorization"] = "known auth"

// axios.interceptors.request.use(() => {

// })

export default axiosInstance