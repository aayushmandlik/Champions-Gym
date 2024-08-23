import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPartList`,
        exerciseOptions
      );

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    // if (search) {
    //   const url = `https://exercisedb.p.rapidapi.com/exercises`;
    //   try {
    //     const exercisesData = await fetchData(url, exerciseOptions);
    //     if (exercisesData) {
    //       console.log("Fetched Data:", exercisesData);
    //       setExercises(exercisesData);
    //     } else {
    //       console.log("No exercises found");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching exercises:", error);
    //   }
    // }
    let offset = 0;
    const limit = 1300;
    if (search) {
      const exercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}&offset=${offset}`,
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      // Scroll to a particular ID
      const element = document.getElementById("exercises");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack
      className="membership"
      alignItems="center"
      mt="35px"
      justifyContent="center"
      p="40px"
      id="exercise"
    >
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
          fontFamily: "'Oswald', sans-serif",
        }}
        textAlign="center"
        mb="50px"
        color="white"
      >
        Awesome Exercises You Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
              fontFamily: "'Poppins', sans-serif",
            },
            width: { lg: "1170px", xs: "350px" },
            backgroundColor: "#fff",
            // borderRadius: "400px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
            fontFamily: "'Poppins', sans-serif",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollBar
          data={bodyParts}
          bodyParts
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
