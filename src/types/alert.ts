import {ReactNode} from "react";

type ModalKeys = "title" | "content" | "close" | "confirm";

export type ModalMessage = {
    [k in ModalKeys]?: string | ReactNode;
}

/* AlertMessage Types */
export interface AlertProps {
    message: ModalMessage;
    isOpen: boolean;
    /**
     * handler = open Control
     * */
    handler: () => void;
}

/* ConfirmMessage Types */
export interface ConfirmProps extends AlertProps{
    /**
     * actionHandler = parents action
     * */
    actionHandler: () => any;
}