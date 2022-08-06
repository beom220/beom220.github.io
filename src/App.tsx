import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
// import './app.css';
import {BrowserRouter} from "react-router-dom";
import Router from "@/routes";
import Template from "@/components/template";


function App() {
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
