import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import About from "../components/About";
import Sessions from "../components/Sessions";
import Trainers from "../components/Trainers";
import Membership from "../components/Membership";
import ClientTestimonials from "../components/ClientTestimonials";
import Blog from "../components/Blog";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import ContactForm from "../components/ContactForm";
import BMICalculator from "../components/BmiCalculator";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  return (
    <Box>
      <Header />
      <About />
      <Sessions />
      <Trainers />
      <Membership />
      <ClientTestimonials />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
      {/* <Blog /> */}
      <ContactForm />
      {/* <BMICalculator /> */}
    </Box>
  );
};

export default Home;
