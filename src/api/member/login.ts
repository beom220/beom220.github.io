import clientAPI from "@/api/configAPI";
import {useMutation} from "@tanstack/react-query";
import {MemberType} from "@/types/member";

const loginAPI = async (form: MemberType): Promise<{ data: MemberType; status: number }> => {
    const {data, status} = await clientAPI.post( "/login", form);
    return {data, status};
}

export const useLogin = () => useMutation(loginAPI);

