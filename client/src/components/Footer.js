import React from "react";
import logo from "../assets/logo2.png";
import gallery1 from "../assets/gallery-1.jpg";
import gallery2 from "../assets/gallery-2.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import gallery5 from "../assets/gallery-5.jpg";
import gallery6 from "../assets/gallery-6.jpg";
import gallery7 from "../assets/gallery-7.jpg";
import gallery8 from "../assets/gallery-8.jpg";
import gallery9 from "../assets/gallery-9.jpg";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <p>
            Welcome to Champions Gym, where we believe that every journey to
            fitness is unique and empowering.
          </p>
          <ul className="footer__links">
            <li>
              <a href="#">
                <span>
                  <i className="ri-map-pin-2-fill"></i>
                </span>
                123 Main Street
                <br />
                Sunrise Valley, Evergreen Heights
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="ri-phone-fill"></i>
                </span>
                +91 9876543210
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="ri-mail-fill"></i>
                </span>
                info@Champions Gym.com
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>GALLERY</h4>
          <div className="gallery__grid">
            <img src={gallery2} alt="gallery" />
            <img src={gallery1} alt="gallery" />
            <img src={gallery3} alt="gallery" />
            <img src={gallery4} alt="gallery" />
            <img src={gallery5} alt="gallery" />
            <img src={gallery6} alt="gallery" />
            <img src={gallery7} alt="gallery" />
            <img src={gallery8} alt="gallery" />
            <img src={gallery9} alt="gallery" />
          </div>
        </div>
        <div className="footer__col">
          <h4>NEWSLETTER</h4>
          <p>
            Don't miss out on the latest news and offers - sign up today and
            join our thriving fitness community!
          </p>
          <form action="/">
            <input type="text" placeholder="Enter Email" />
            <button className="btn btn__primary">SEND</button>
          </form>
          <div className="footer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        Copyright © 2024 Aayush Mandlik. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
