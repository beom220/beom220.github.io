import {atom, selector} from "recoil";
import {GetSession} from "@/hooks/useSession";

export const memberState = atom({
    key: 'memberState',
    default: selector({
        key: 'memberStateRefresh',
        get: async () => {
            /**
             * sessionStorage 조회, user값이 있다면userState 반영,
             * */
            let keys = Object.keys(sessionStorage);
            let isUser = keys.filter((v) => v === 'user');
            try {
                if (isUser.length) {
                    return GetSession('user' || '')
                }
                return null
            } catch (error) {
                throw error
            }
        }
    }),
})