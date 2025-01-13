import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  return (
    <Box sx={{ marginTop: { lg: "100px", xs: "20px" } }} p="20px">
      <Typography variant="h3" mb="33px">
        Watch{" "}
        <span
          style={{
            color: "#ff2625",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {name}
        </span>{" "}
        Exercise Videos
      </Typography>
      <Stack
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "50px", xs: "0" } }}
      >
        {Array.isArray(exerciseVideos) &&
          exerciseVideos.slice(0, 6).map((item, index) => (
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={item.video.thumbnails[0].url} alt={item.video.title} />
              <Box>
                <Typography variant="h6" color="#000">
                  {item.video.title}
                </Typography>
                <Typography variant="h6" color="#000" fontWeight="bold">
                  {item.video.channelName}
                </Typography>
              </Box>
            </a>
          ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
