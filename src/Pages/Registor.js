import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Registor = () => {
  const hostory = useNavigate();

  const [state, setState] = useState(initialState);
  const { username, email, password } = state;
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const regUser = async (e) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (username || email || password) {
      const regData = await Axios.post(
        "http://localhost:4200/registor",
        formData,
        config
      ).then((res) => console.log(res.data));
      if (regData.data.status === 201) {
        alert("data added");
        hostory("/");
      }
    } else {
      alert("Some fields are empty");
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
          type={"email"}
          placeholder="Email"
          name="email"
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
        <input type={"submit"} value="Registor" onClick={regUser}></input>
      </div>
    </div>
  );
};

export default Registor;
