import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_URL,
    // validateStatus: function (status) {
    //     // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
    //     return status < 500;
    // }
}
const clientAPI = axios.create(axiosConfig);

export default clientAPI;