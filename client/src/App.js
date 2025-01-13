import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ExerciseDetail from "./pages/ExerciseDetail"; // Import the ExerciseDetail component
import Home from "./pages/Home"; // Import the Home component
import PaymentDetails from "./pages/PaymentDetails";
import "./App.css";
import ScrollReveal from "scrollreveal";
import { Box } from "@mui/material";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

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

  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paymentdetails" element={<PaymentDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
      {/* <Header />
      <About />
      <Sessions />
      <Trainers />
      <Membership />
      <ClientTestimonials />
      <Blog /> */}
      <Footer />
    </Box>
  );
};

export default App;
