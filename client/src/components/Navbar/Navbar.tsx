import React from "react";

import Search from "../Search/Search";
import Categoryes from "../Categoryes/Categoryes";
import SignActions from "../SignActions/SignActions";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <Logo />
        <Search />
        <Categoryes />
        <SignActions />
      </div>
    </div>
  );
};

export default Navbar;
