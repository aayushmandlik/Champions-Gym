import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import ReactPaginate from "react-paginate";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const exercisesPerPage = 6;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);

    // Scroll to a particular ID
    const element = document.getElementById("exercises");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const indexOfLastExercise = (currentPage + 1) * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = Array.isArray(exercises)
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      let offset = 0;
      const limit = 1300;
      if (bodyPart === "all") {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}&offset=${offset}`,
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=${limit}&offset=${offset}`,
          exerciseOptions
        );
      }
      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box
      id="exercises"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: { lg: "110px" } }}
      mt="50px"
      p="20px"
    >
      <Typography
        variant="h3"
        mb="46px"
        fontWeight={600}
        sx={{
          fontSize: { lg: "40px", xs: "40px" },
          fontFamily: "'Oswald', sans-serif", // Applying Oswald font here
        }}
      >
        Showing Result
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "100px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Box
        mt="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%", // Ensures the box is full-width
          padding: "0 10px", // Adds some padding to avoid content touching edges
        }}
      >
        {exercises.length > exercisesPerPage && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(exercises.length / exercisesPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </Box>
    </Box>
  );
};

export default Exercises;
