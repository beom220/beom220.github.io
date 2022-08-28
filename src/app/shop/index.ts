import {atom} from "recoil";
import {shopMenus} from "@/constants/shop";

export const tabState = atom({
    key : 'tabState',
    default : shopMenus[0].value
})