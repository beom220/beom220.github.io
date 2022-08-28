import {useState} from "react";

export default function useMessage(initialState:boolean = false){
    const [open, setOpen] = useState(initialState);
    const handleOpen = ():void => setOpen(true);
    const handleClose = ():void => setOpen(false);

    return { open, handleOpen, handleClose, setOpen };
}