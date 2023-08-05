import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const initialState = {
  username: "",
  password: "",
};
const Login = () => {
  const [state, setState] = useState(initialState);
  const { username, password } = state;
  const hostory = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginUsr = async (e) => {
    // const user = { username, password };
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const logData = await Axios.post(
      "http://localhost:4200/login",
      formData,
      config
    );
    if (
      username !== logData.data.data.username ||
      password !== logData.data.data.password
    ) {
      alert("Login username password not match");
    } else {
      if (username !== undefined || password !== undefined) {
        if (logData.data.status === 201) {
          hostory("/home");
          setState(logData.data.data);
          localStorage.setItem("LoginData", [
            logData.data.data.username,
            logData.data.data.password,
          ]);
        }
      }
    }
  };

  return (
    <div>
      <div className="form_row">
        <input
          type={"text"}
          placeholder="Username"
          name="username"
          onChange={handleInput}
        ></input>
      </div>
      <div className="form_row">
        <input
          type={"password"}
          placeholder="Password"
          name="password"
          onChange={handleInput}
        ></input>
      </div>
      <div className="form_row">
        <input type={"submit"} value="login" onClick={loginUsr}></input>
      </div>
    </div>
  );
};

export default Login;
