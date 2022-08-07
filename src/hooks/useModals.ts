import {useState} from "react";
import {ModalMessage} from "@/types/alert";


export default function useModals() {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const handleModal = (v:boolean) => {
        setIsOpen(v);
    }

    const [ message, setMessage ] = useState<ModalMessage>({});

    /* 부분 교체가 아니고 통교체 */
    const handleMessage = (v:ModalMessage) => {
        setMessage(v)
    }
    return {isOpen, handleModal, message, handleMessage}
}
