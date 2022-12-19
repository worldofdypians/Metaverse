import Home from "./screens/Home/Home";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.scss'

import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
     <div className="container-fluid p-0 main-wrapper">
     <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
