import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className="logo">
      React-Blog
    </div>
  );
};

export default Logo;
