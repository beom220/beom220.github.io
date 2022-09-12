import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { PrivateRoutes, PublicRoutes } from "@/routes";
import {useQuery} from "@tanstack/react-query";
import {memberKey} from "@/types/queryKey";
import {getLoginInfoAPI} from "@/api/member/login";
import {useRecoilState} from "recoil";
import {memberState} from "@/app/member";
import useSession from "@/hooks/useSession";

function App() {
    const [member, setMember] = useRecoilState(memberState);
    const {SetSession, GetSession} = useSession();

    const {data:authData, isError:authIsError, isLoading:authIsLoading, isSuccess:authIsSuccess} = useQuery(
        memberKey.info,
        () => getLoginInfoAPI(),
        {
            staleTime: 60 * 1000 * 24,
            enabled: !!GetSession('user')
        }
    );
    useEffect(() => {
        if(!!authData && !member.objectId && !!GetSession('user')){
            SetSession('userInfo', JSON.stringify(authData.data))
            setMember(authData.data)
        }
    },[authData, member])

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
