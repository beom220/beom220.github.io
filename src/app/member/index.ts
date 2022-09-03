import {atom, selector} from "recoil";
import {GetSession} from "@/hooks/useSession";

export const memberState = atom({
    key: 'memberState',
    default : null
})