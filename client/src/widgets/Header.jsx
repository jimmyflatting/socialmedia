import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <>
      <div id="header m-0">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 d-flex justify-content-between mx-auto">
              <h1 className="my-auto">SocialMedia</h1>
              <GiHamburgerMenu className="h2 my-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
