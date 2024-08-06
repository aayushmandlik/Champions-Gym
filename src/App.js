import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Sessions from "./components/Sessions";
import Trainers from "./components/Trainers";
import Membership from "./components/Membership";
import ClientTestimonials from "./components/ClientTestimonials";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import "./App.css";
import ScrollReveal from "scrollreveal";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");

    const handleMenuClick = (e) => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute(
        "class",
        isOpen ? "ri-close-line" : "ri-menu-line"
      );
    };

    const handleNavLinkClick = (e) => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
    };

    menuBtn.addEventListener("click", handleMenuClick);
    navLinks.addEventListener("click", handleNavLinkClick);

    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".header__content h2", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__content .header__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal(".about__card", {
      duration: 1000,
      interval: 500,
    });

    ScrollReveal().reveal(".trainer__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    ScrollReveal().reveal(".blog__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    // Cleanup function to remove event listeners
    return () => {
      menuBtn.removeEventListener("click", handleMenuClick);
      navLinks.removeEventListener("click", handleNavLinkClick);
    };
  }, []);

  // const swiper = new Swiper(".swiper", {
  //   loop: true,

  //   pagination: {
  //     el: ".swiper-pagination",
  //   },
  // });

  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Sessions />
      <Trainers />
      <Membership />
      <ClientTestimonials />
      <Blog />
      <Footer />
    </>
  );
};

export default App;
