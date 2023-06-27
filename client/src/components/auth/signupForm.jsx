import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
const apiUrl = config.API_BASE_URL;

const SignupForm = () => {
  const navigate = useNavigate();
  const errorSpan = document.getElementById("errorSpan");
  const [profileImg, setProfileImg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleInputChangeProfileImg = (e) => {
    setProfileImg(e.target.value);
  };

  const handleInputChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleInputChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleInputChangeUserHandle = (e) => {
    setUserHandle(e.target.value);
  };

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleInputChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordCheck !== password) {
      return (errorSpan.innerHTML = "Passwords does not match");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}auth/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileImg: profileImg,
            firstName: firstName,
            lastName: lastName,
            userHandle: userHandle,
            email: email,
            password: password,
          }),
          credentials: "include",
        });
        const data = await response.status;
        console.log(data);
        if (data === 201) {
          navigate("/feed");
        } else {
          errorSpan.innerHTML = "Email/username is already registered";
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
        <label className="cardBg" htmlFor="profileImg">
          Avatar
        </label>
        <input
          className="form-control"
          type="file"
          id="profileImg"
          onChange={setProfileImg}
        />
      </div>
      <div className="mb-2 cardBg">
        <label className="cardBg" htmlFor="firstName">
          First Name
        </label>
        <input
          className="form-control"
          type="text"
          id="firstName"
          placeholder="John"
          onChange={setFirstName}
        />
      </div>
      <div className="mb-2 cardBg">
        <label className="cardBg" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="form-control"
          type="text"
          id="lastName"
          placeholder="Doe"
          onChange={setLastName}
        />
      </div>
      <div className="mb-2 cardBg">
        <label className="cardBg" htmlFor="userHandle">
          Username
        </label>
        <input
          className="form-control"
          type="text"
          id="userHandle"
          placeholder="johndoe"
          onChange={setUserHandle}
        />
      </div>
      <div className="mb-2 cardBg">
        <label className="cardBg" htmlFor="email">
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
      <div className="mb-2 cardBg">
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
      <div className="mb-4 cardBg">
        <label className="cardBg" htmlFor="passwordCheck">
          Password (again)
        </label>
        <input
          className="form-control"
          id="passwordCheck"
          type="password"
          placeholder="********"
          onChange={handleInputChangePasswordCheck}
        />
      </div>
      <div className="cardBg">
        <button className="form-control" type="submit">
          Sign up
        </button>
      </div>
      <p className="cardBg text-center mb-0 p-0" id="errorSpan"></p>
    </form>
  );
};

export default SignupForm;
