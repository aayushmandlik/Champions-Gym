// import React from "react";
// import { Typography, Stack } from "@mui/material";

// const PaymentSuccess = () => {
//   return (
//     <Stack
//       alignItems="center"
//       justifyContent="center"
//       // p="150px"
//       id="contact"
//       sx={{ py: { lg: "150px", xs: "100px" }, px: { lg: "0px", xs: "20px" } }}
//     >
//       <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
//         <g
//           stroke="currentColor"
//           stroke-width="2"
//           fill="none"
//           fill-rule="evenodd"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         >
//           <path
//             class="circle"
//             d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
//           />
//           <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
//         </g>
//       </svg>
//       <Typography
//         fontWeight={600}
//         sx={{
//           fontSize: { lg: "44px", xs: "30px" },
//           fontFamily: "'Oswald', sans-serif",
//         }}
//         textAlign="center"
//         mt="50px"
//         color="black"
//       >
//         YOUR PAYMENT IS DONE SUCCESSFULLY
//       </Typography>
//     </Stack>
//   );
// };

// export default PaymentSuccess;

// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Typography, Stack } from "@mui/material";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const sessionId = query.get("session_id");

//     if (sessionId) {
//       axios
//         .post("http://localhost:8000/verify-payment", { sessionId })
//         .then((response) => {
//           if (response.data.status === "paid") {
//             console.log("Payment verified, email sent successfully.");
//           } else {
//             console.log("Payment verification failed.");
//             navigate("/payment-failure");
//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying payment:", error);
//         });
//     }
//   }, [navigate]);

//   return (
//     <Stack
//       alignItems="center"
//       justifyContent="center"
//       sx={{ py: { lg: "150px", xs: "100px" }, px: { lg: "0px", xs: "20px" } }}
//     >
//       <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
//         <g
//           stroke="currentColor"
//           strokeWidth="2"
//           fill="none"
//           fillRule="evenodd"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path
//             className="circle"
//             d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
//           />
//           <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
//         </g>
//       </svg>
//       <Typography
//         fontWeight={600}
//         sx={{
//           fontSize: { lg: "44px", xs: "30px" },
//           fontFamily: "'Oswald', sans-serif",
//         }}
//         textAlign="center"
//         mt="50px"
//         color="black"
//       >
//         YOUR PAYMENT IS DONE SUCCESSFULLY
//       </Typography>
//     </Stack>
//   );
// };

// export default PaymentSuccess;

// Inside your PaymentSuccess component
// import { useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Typography, Stack } from "@mui/material";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const session_id = new URLSearchParams(location.search).get("session_id");

//   useEffect(() => {
//     if (session_id) {
//       axios
//         .post("http://localhost:8000/verify-payment", {
//           sessionId: session_id,
//         })
//         .then((response) => {
//           if (response.data.status === "paid") {
//             console.log("Payment verified and email sent.");
//           } else {
//             console.log("Payment not completed.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying payment:", error);
//         });
//     }
//   }, [session_id]);

//   return (
//     <Stack
//       alignItems="center"
//       justifyContent="center"
//       sx={{ py: { lg: "150px", xs: "100px" }, px: { lg: "0px", xs: "20px" } }}
//     >
//       <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
//         <g
//           stroke="currentColor"
//           strokeWidth="2"
//           fill="none"
//           fillRule="evenodd"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path
//             className="circle"
//             d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
//           />
//           <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
//         </g>
//       </svg>
//       <Typography
//         fontWeight={600}
//         sx={{
//           fontSize: { lg: "44px", xs: "30px" },
//           fontFamily: "'Oswald', sans-serif",
//         }}
//         textAlign="center"
//         mt="50px"
//         color="black"
//       >
//         YOUR PAYMENT IS DONE SUCCESSFULLY
//       </Typography>
//     </Stack>
//   );
// };

// export default PaymentSuccess;

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
      .post("http://localhost:8000/verify-payment", { sessionId })
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
      sx={{ py: { lg: "150px", xs: "100px" }, px: { lg: "0px", xs: "20px" } }}
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
