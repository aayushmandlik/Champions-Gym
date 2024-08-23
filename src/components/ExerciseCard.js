import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="exercise-card"
      to={`/exercise/${exercise.id}`}
    >
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#000",
            background: "#ffa9a9",
            fontSize: "15px",
            borderRadius: "20px",
            textTransform: "capitalize",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Typography fontSize="13px" fontWeight="bold" mr="4px">
            Body Part:-
          </Typography>
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#000",
            background: "lightgreen",
            fontSize: "16px",
            borderRadius: "20px",
            textTransform: "capitalize",
            fontFamily: "serif",
          }}
        >
          <Typography fontSize="13px" fontWeight="bold" mr="4px">
            Target Muscle:-
          </Typography>
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        mt="11px"
        fontWeight="bold"
        color="#000"
        pb="10px"
        textTransform="capitalize"
        fontSize="22px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
