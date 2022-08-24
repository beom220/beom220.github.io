import {atom} from "recoil";

export const memberState = atom({
    key: 'memberState',
    default: {
        name: null,
        auth_level: null
    },
})