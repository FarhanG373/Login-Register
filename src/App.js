import React, { useState, useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Registor from "./Pages/Registor";
import Home from "./Pages/Home";
function App() {
  var isLogin = localStorage.getItem("LoginData");
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={isLogin ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registor" element={<Registor />} />
      </Routes>
    </div>
  );
}

export default App;
