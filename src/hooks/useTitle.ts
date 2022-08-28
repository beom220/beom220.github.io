import {useCallback, useState} from "react";

export default function useTitle(initialState:'엔퍼센트'){
    const [ title, setTitle ] = useState<string>(initialState);
    const changeTitle = useCallback((v:string):void => setTitle(v),[title]);
    return {title, setTitle, changeTitle}
}