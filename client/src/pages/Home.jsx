import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/auth/loginForm";
import Signup from "../components/auth/signupForm";
import Header from "../widgets/Header";

const Home = () => {
  const [formSelect, setForm] = useState(true);

  const handleClick = () => {
    setForm(!formSelect);
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <div className="d-md-flex">
          <div className="col-12 col-md-6 justify-content-center mx-auto mb-4">
            <h1 className="">Hello, friend 👋</h1>
            <p className="h3">The platform for developers, by developers.</p>
          </div>
          <div className="col-12 col-md-6 justify-content-center mx-auto">
            {formSelect ? <Login /> : <Signup />}
            {formSelect ? (
              <p className="text-center">
                Not registered? <Link onClick={handleClick}>Sign up</Link>
              </p>
            ) : (
              <p className="text-center">
                Already registered? <Link onClick={handleClick}>Login</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
