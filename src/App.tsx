import React, {useEffect} from 'react';
// import './app.css';
import {BrowserRouter} from "react-router-dom";
import Router from "@/routes";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Router/>
            </BrowserRouter>
        </div>
    );
}

export default App;
