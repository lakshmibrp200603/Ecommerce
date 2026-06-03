import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../container/Home";

export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='*' element={<Home/>}/>
            </Routes>
            </BrowserRouter>

    )
}