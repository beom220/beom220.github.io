import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {ErrorPage} from "@/pages/error";
import {BrowserRouter} from "react-router-dom";
import LoginForm from "@/components/join/loginForm";
import Router from "@/routes";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Router/>
                {/*<LoginForm/>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;
