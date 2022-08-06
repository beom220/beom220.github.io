import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
// import './app.css';
import {BrowserRouter} from "react-router-dom";
import Router from "@/routes";
import Template from "@/components/template";
import {useRecoilValue} from "recoil";
import {memberState} from "@/app/member";
import Login from "@/pages/member/login";


function App() {
    const member = useRecoilValue(memberState);
    return (
        <div className="App">

            <BrowserRouter>
                <Template>
                    <Router/>
                </Template>
            </BrowserRouter>

        </div>
    );
}

export default App;
