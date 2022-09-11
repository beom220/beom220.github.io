import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { PrivateRoutes, PublicRoutes } from "@/routes";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getLoginInfoAPI} from "@/api/member/login";
import {useRecoilState} from "recoil";
import {memberState} from "@/app/member";
import useSession from "@/hooks/useSession";

function App() {
    const [member, setMember] = useRecoilState(memberState);
    const {GetSession} = useSession();

    const {data:authData, isError:authIsError, isLoading:authIsLoading, isSuccess:authIsSuccess} = useQuery(
        testKeys.info,
        () => getLoginInfoAPI(),
        {
            staleTime: 60 * 1000,
            enabled: !!GetSession('user')
        }
    );
    useEffect(() => {
        if(!!authData && !member.objectId){
            setMember(authData.data)
        }
    },[authData])

    return (
        <div className="App">
            {member.auth_level ?
                <PublicRoutes/> :
                <PrivateRoutes/>
            }
        </div>
    );
}

export default App;
