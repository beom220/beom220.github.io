import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_URL
}
const clientAPI = axios.create(axiosConfig);

export default clientAPI;