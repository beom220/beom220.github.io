import {atom, selector} from "recoil";
import {GetSession} from "@/hooks/useSession";
import {MemberType} from "@/types/member";

// {
//     objectId: null,
//         admin_id: null,
//     auth_level: null,
//     email: null,
//     shop: null,
// } as MemberType
export const memberState = atom({
    key: 'memberState',
    default: !!GetSession('userInfo') ?
        JSON.parse(GetSession('userInfo')) :
        {
            objectId: null,
            admin_id: null,
            auth_level: null,
            email: null,
            shop: null,
        } as MemberType
})