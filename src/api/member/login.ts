import clientAPI from "@/api/configAPI";
import {MemberType} from "@/types/member";

export const postLoginAPI = (form:MemberType) => {
    return clientAPI.post( "/login", form);
}

