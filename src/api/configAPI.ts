import axios, { AxiosRequestConfig } from 'axios';
import {GetSession} from "@/hooks/useSession";

const axiosConfig: AxiosRequestConfig = {
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'https://api.abm-korea.com'
    // validateStatus: function (status) {
    //     // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
    //     return status < 500;
    // }
}
const axiosAuthConfig: AxiosRequestConfig = {
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'https://api.abm-korea.com',
    // baseURL: 'http://localhost:3000/',
    headers: {Authorization: `Bearer ${GetSession('user')}`}
}
const clientAPI = axios.create(axiosConfig);
const authAPI = axios.create(axiosAuthConfig);

export {clientAPI, authAPI};