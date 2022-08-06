import {atom} from "recoil";

export const sidebarState = atom({
    key : 'sidebarState',
    default : {
        visible: false,
        dimmed: false,
    }
})