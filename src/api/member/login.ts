import {authAPI, clientAPI} from "@/api/configAPI";
import {MemberType} from "@/types/member";

export const postLoginAPI = (form:MemberType) => {
    return clientAPI.post( "/admin/login", form);
}

export const getLoginInfoAPI = () => {
    return authAPI.get( "/admin");
}