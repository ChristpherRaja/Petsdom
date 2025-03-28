import Axios from "axios";

const axios = Axios.create({
    baseURL:import.meta.env.VITE_BASE_URL
})

axios.interceptors.response.use(null,error => {
    if(error.status==401){
        return error.response
    }else if(error.status==500){
        return error.response
    }else if(error.status===404){
        return error.response
    }else if(error.status===400){
        return error.response
    }
})

export default axios;