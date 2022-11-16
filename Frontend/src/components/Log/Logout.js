import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();

  const logout = () => {
    console.log("Attention");
    localStorage.clear();
    nav("/profil");
  };

  return (
    <div>
      <p onClick={logout}>Logout</p>
    </div>
  );
};

export default Logout;
