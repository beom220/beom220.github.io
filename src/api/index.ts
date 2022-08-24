import {authAPI, clientAPI} from "@/api/configAPI";

export const loginAPI = async (userData:object) => {
    return await clientAPI.post('/admin/login', userData)

}

export const getPointAPI = async () => {
    const {data} = await authAPI.get('/admin')
    return data;
}