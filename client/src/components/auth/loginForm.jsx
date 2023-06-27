import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
const apiUrl = config.API_BASE_URL;

const LoginForm = () => {
  const navigate = useNavigate();
  const errorSpan = document.getElementById("errorSpan");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        });
        const data = await response.status;
        console.log(data);
        if (data === 202) {
          navigate("/feed");
        } else {
          errorSpan.innerHTML = "Wrong username/password";
          errorSpan.classList.add("mt-4");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  return (
    <form className="cardBg p-4 mb-4 rounded" onSubmit={handleSubmit}>
      <div className="mb-2 cardBg">
        <label className="cardBg" htmlFor="username">
          Email
        </label>
        <input
          className="form-control"
          id="username"
          type="text"
          placeholder="hello@example.com"
          onChange={handleInputChangeEmail}
        />
      </div>
      <div className="mb-4 cardBg">
        <label className="cardBg" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          id="password"
          type="password"
          placeholder="********"
          onChange={handleInputChangePassword}
        />
      </div>
      <div className="cardBg">
        <button className="form-control" type="submit">
          Login
        </button>
      </div>
      <p className="cardBg text-center mb-0 p-0" id="errorSpan"></p>
    </form>
  );
};

export default LoginForm;
