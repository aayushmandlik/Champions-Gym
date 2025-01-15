import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Stack } from "@mui/material";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Location object:", location);

    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      console.error("No session_id found in the URL. Redirecting to home...");
      navigate("/");
      return;
    }

    console.log("Session ID found:", sessionId);

    // Log before making the API call
    console.log("Calling /verify-payment API with session_id:", sessionId);

    // Call the backend API to verify the payment
    axios
      .post(
        "https://champions-gym-server-rjxw175by-aayushmandliks-projects.vercel.app/verify-payment",
        {
          sessionId,
        }
      )
      .then((response) => {
        console.log("Payment verified successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error verifying payment:",
          error.response?.data || error
        );
      });
  }, [location, navigate]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ py: { lg: "150px", xs: "300px" }, px: { lg: "0px", xs: "20px" } }}
    >
      <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <g
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="circle"
            d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
          />
          <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
        </g>
      </svg>
      <Typography
        fontWeight={600}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
          fontFamily: "'Oswald', sans-serif",
        }}
        textAlign="center"
        mt="50px"
        color="black"
      >
        YOUR PAYMENT IS DONE SUCCESSFULLY
      </Typography>
    </Stack>
  );
};

export default PaymentSuccess;
