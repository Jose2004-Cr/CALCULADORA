import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../components/Nav";
import Jorgeboolw from "../components/Jorgeboolw";
import Simpson_1 from "../components/Simpson1_3";
import SimpsonAbierto from "../components/Simpsonabierto";
import MetodoSimpsonTresOctavos from "../components/Sipson3_8";
import MetodoTrapezoidal from "../components/Trapezoidal";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Nav></Nav>
                <Routes>
                    <Route path="calculadoraIntegral" element={<Jorgeboolw/>}></Route>
                    <Route path="simpson_1-3" element={<Simpson_1/>}></Route>
                    <Route path="simpsonabierto" element={<SimpsonAbierto/>}></Route>
                    <Route path="sipson3_8" element={<MetodoSimpsonTresOctavos/>}></Route>
                    <Route path="trapezoidal" element={<MetodoTrapezoidal/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;