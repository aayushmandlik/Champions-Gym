import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="nav__bar">
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className={`nav__links ${menuOpen ? "open" : ""}`} id="nav-links">
          <li>
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#trainer">TRAINER</a>
          </li>
          <li>
            <a href="#client">CLIENT</a>
          </li>
          <li>
            <a href="#blog">BLOG</a>
          </li>
          <li>
            <a href="#contact">CONTACT US</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
