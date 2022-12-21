import Home from "./screens/Home/Home";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.scss'
import './fonts/Organetto.ttf'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";

function App() {
  return (
    <BrowserRouter>
     <div className="container-fluid p-0 main-wrapper position-relative">
     <Header />
     <MobileNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
     </div>
    </BrowserRouter>
  );
}

export default App;
