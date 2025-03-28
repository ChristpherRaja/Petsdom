import axios from "../config/axiosConfig"

axios.defaults.withCredentials = true;

export const apiCall = async ({url,params}, method = 'get',body) => {
console.log(url)
    try {
        const { data } = await axios({ url, method, data:body, params })
        console.log(data.data)
        return data
    } catch (error) {
        return error
    }
}