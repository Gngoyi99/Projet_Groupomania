import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        <ul>
          <li></li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
