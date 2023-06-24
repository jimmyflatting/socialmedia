import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import { config } from "./utils/config";

const apiUrl = config.API_BASE_URL;

function App() {
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}auth/validate`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.status === 200) {
          setValidate(true);
        } else {
          setValidate(false);
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="app bg-gray-100 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        {validate ? (
          <>
            <Route path="/feed" element={<Feed />} />
            <Route path="/:id" element={<Profile />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
