import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getPointAPI} from "@/api";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {memberState} from "@/app/member";

export default function Test(){
    const [user, setUser] = useRecoilState(memberState);
    const {data : member, isLoading, isError} = useQuery(testKeys.user,
        () => getPointAPI(),
        {staleTime: 60 * 1000}
    );
    useEffect(() => {
        if(member){
            setUser({
                name : member.name,
                auth_level : member.auth_level
            })
        }
    }, [member])
    return (
        <>
            {isLoading && 'loading'}
            {user.name}
        </>
    )
}