/* ModalKeys Types
* title
* contents
* button close
* button confirm
* */

/*
* handler = open Control
* actionHandler = parents action
* */
type ModalKeys = "title" | "content" | "close" | "confirm";

export type ModalMessage = {
    [k in ModalKeys]?: string;
}

/* AlertMessage Types */
export interface AlertProps {
    message: ModalMessage;
    isOpen: boolean;
    handler: () => void;
}

/* ConfirmMessage Types */
export interface ConfirmProps {
    message: ModalMessage;
    isOpen: boolean;
    handler: () => void;
    actionHandler: () => any;
}