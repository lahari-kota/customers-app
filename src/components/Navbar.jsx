import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="nav-container-center">
        <div className="image-container">
          <FaUserCircle size={70} color="skyblue" />
        </div>
        <div className="links-container">
          <ul>
            <NavLink
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
              to="/"
            >
              Home
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
