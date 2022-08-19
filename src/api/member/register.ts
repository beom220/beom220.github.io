import {MemberType} from "@/types/member";
import clientAPI from "@/api/configAPI";

export const postRegisterAPI = async (form:MemberType) => {
    const { data } = await clientAPI.post( "/register", form);
    return data;
}