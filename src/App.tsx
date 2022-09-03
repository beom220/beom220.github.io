import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
// import './app.css';
import {BrowserRouter} from "react-router-dom";
import Router from "@/routes";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceInfoAPI} from "@/api";
import {getLoginInfoAPI} from "@/api/member/login";
import {useRecoilState} from "recoil";
import {memberState} from "@/app/member";

function App() {
    const [member, setMember] = useRecoilState(memberState);
    const {data, isError, isLoading} = useQuery(
        testKeys.info,
        () => getLoginInfoAPI(),
        {staleTime: 60 * 1000}
    );

    useEffect(() => {
        if(data){
            setMember(data.data)
        }
    }, [data])

    return (
        <div className="App">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Router/>
            </BrowserRouter>
        </div>
    );
}

export default App;
