import Home from "./screens/Home/Home";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './app.scss'
import './fonts/Organetto.ttf'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
import News from "./screens/News/News";

function App() {
  return (
    <BrowserRouter>
     <div className="container-fluid p-0 main-wrapper position-relative">
     <Header />
     <MobileNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/caws" element={<Caws />} />
        <Route exact path="/stake" element={<NftMinting />} />
        <Route exact path="/news" element={<News />} />
      </Routes>
      <Footer />
     </div>
    </BrowserRouter>
  );
}

export default App;
