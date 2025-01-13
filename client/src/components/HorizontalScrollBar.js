import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import BodyParts from "./BodyParts";
import ExerciseCard from "./ExerciseCard";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import "react-horizontal-scrolling-menu/dist/styles.css";

// const LeftArrow = () => {
//   const { scrollPrev } = useContext(VisibilityContext);
//   return (
//     <Typography onClick={() => scrollPrev()} className="left-arrow">
//       <img src={LeftArrowIcon} alt="left-arrow" />
//     </Typography>
//   );
// };

// const RightArrow = () => {
//   const { scrollNext } = useContext(VisibilityContext);
//   return (
//     <Typography onClick={() => scrollNext()} className="right-arrow">
//       <img src={RightArrowIcon} alt="right-arrow" />
//     </Typography>
//   );
// };

const handleScrollLeft = () => {
  const scrollContainer = document.querySelector(
    ".react-horizontal-scrolling-menu--scroll-container"
  );
  scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
};

const handleScrollRight = () => {
  const scrollContainer = document.querySelector(
    ".react-horizontal-scrolling-menu--scroll-container"
  );
  scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
};

const LeftArrow = () => (
  <Typography onClick={handleScrollLeft} className="left-arrow">
    <img src={LeftArrowIcon} alt="left-arrow" />
  </Typography>
);

const RightArrow = () => (
  <Typography onClick={handleScrollRight} className="right-arrow">
    <img src={RightArrowIcon} alt="right-arrow" />
  </Typography>
);

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          {isBodyParts ? (
            <BodyParts
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollBar;
