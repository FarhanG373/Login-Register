import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("LoginData");
    navigate("/login");
  };
  return (
    <div>
      Home
      <button onClick={() => LogOut()}>LogOut</button>
    </div>
  );
};

export default Home;
