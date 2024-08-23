import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import EquipmentImage from "../assets/icons/equipment.png";
import TargetImage from "../assets/icons/target.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      nameTitle: "Body Part: ",
      name: bodyPart,
    },
    {
      icon: EquipmentImage,
      nameTitle: "Equipment: ",
      name: equipment,
    },
    {
      icon: TargetImage,
      nameTitle: "Target: ",
      name: target,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: { lg: "row" },
        p: "20px",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography
          variant="h3"
          textTransform="capitalize"
          fontWeight="bold"
          sx={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {name}
        </Typography>
        <Typography variant="h5">
          Exercises keeps you strong.{" "}
          <strong
            style={{
              color: "#ff2625",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {name}
          </strong>{" "}
          {` `} is one of the best exercise to practice and maintain.{" "}
          <strong
            style={{
              color: "#ff2625",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {name}
          </strong>{" "}
          is the exercise that targets your{" "}
          <strong
            style={{
              color: "#ff2625",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {target}
          </strong>
          .It will help you to gain energy.
        </Typography>
        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button>
              <img src={item.icon} alt={item.icon} />
            </Button>
            <Typography
              variant="h5"
              textTransform="capitalize "
              fontWeight="bold"
            >
              {item.nameTitle}
            </Typography>
            <Typography variant="h5" textTransform="capitalize">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
