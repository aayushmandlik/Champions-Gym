import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const PaymentDetailsMonthly = () => {
  const location = useLocation();

  const { price, planName } = location.state || { price: 0, planName: "" };
  console.log("Location State:", location.state); // Log the entire location state

  if (location.state) {
    console.log("Plan in PaymentDetailsMonthly:", location.state.planName);
    console.log("Price in PaymentDetailsMonthly:", location.state.price);
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    isMember: "",
    gymType: "",
    duration: "",
    startDate: "",
    endDate: "",
    price: location.state.price,
    planName: location.state.planName,
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  });

  console.log("Plan in PaymentDetailsMonthly:", formData.planName);

  useEffect(() => {
    if (formData.duration === "Quarterly") {
      setFormData((prevState) => ({
        ...prevState,
        price: price * 3 - 300, // Update the price for Quarterly
      }));
    } else if (formData.duration === "Half Yearly") {
      setFormData((prevState) => ({
        ...prevState,
        price: price * 6 - 700, // Update the price for Quarterly
      }));
    } else if (formData.duration === "Yearly") {
      setFormData((prevState) => ({
        ...prevState,
        price: price * 12 - 1000, // Update the price for Yearly
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        price: price, // Default price for Monthly
      }));
    }
  }, [formData.duration, price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/payment",
        formData
      );
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Stack
      className="paydetailbg"
      alignItems="center"
      justifyContent="center"
      // p="150px"
      id="contact"
      sx={{ py: { lg: "150px", xs: "100px" }, px: { lg: "0px", xs: "20px" } }}
    >
      <Typography
        fontWeight={600}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
          fontFamily: "'Oswald', sans-serif",
        }}
        textAlign="center"
        mb="10px"
        color="white"
      >
        PAYMENT DETAILS
        <Typography
          fontWeight={600}
          sx={{
            fontSize: { lg: "44px", xs: "30px" },
            fontFamily: "'Oswald', sans-serif",
          }}
          textAlign="center"
          mb="50px"
          color="#dc030a"
        >
          {location.state.planName}
        </Typography>
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "700px",
          mx: "auto",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <FormControl
            fullWidth
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          >
            <InputLabel>Already a member?</InputLabel>
            <Select
              name="isMember"
              value={formData.isMember}
              onChange={handleChange}
              label="Already a member?"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl
            fullWidth
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          >
            <InputLabel>Gym Type</InputLabel>
            <Select
              name="gymType"
              value={formData.gymType}
              onChange={handleChange}
              label="Gym Type"
            >
              <MenuItem value="Cardio">Cardio</MenuItem>
              <MenuItem value="Gym">Gym</MenuItem>
              <MenuItem value="Cardio+Gym">Cardio+Gym</MenuItem>
            </Select>
          </FormControl> */}
          <FormControl
            fullWidth
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          >
            <InputLabel>Duration</InputLabel>
            <Select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              label="Duration"
            >
              <MenuItem value="Monthly">Monthly (Rs {price})</MenuItem>
              <MenuItem value="Quarterly">
                Quarterly (Rs {price * 3 - 300})
              </MenuItem>
              <MenuItem value="Half Yearly">
                Half Yearly (Rs {price * 6 - 700})
              </MenuItem>
              <MenuItem value="Yearly">
                Yearly (Rs {price * 12 - 1000})
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="From"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <TextField
            label="To"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <TextField
            label="Message"
            variant="outlined"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <Button
            className="search-btn"
            type="submit"
            sx={{
              mt: 2,
              bgcolor: "#FF2625",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Proceed To Payment
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default PaymentDetailsMonthly;

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Stack,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";

// const PaymentDetailsMonthly = () => {
//   let cashfree;
//   const navigate = useNavigate();

//   let initializeSDK = async function () {
//     cashfree = await load({
//       mode: "sandbox",
//     });
//   };

//   initializeSDK();

//   const [orderId, setOrderId] = useState("");

//   const location = useLocation();
//   const { price, planName } = location.state || { price: 0, planName: "" };

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     isMember: "",
//     gymType: "",
//     duration: "",
//     startDate: "",
//     endDate: "",
//     price: 1,
//     planName: planName,
//     MUID: "MUID" + Date.now(),
//     transactionId: "T" + Date.now(),
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const pollPaymentStatus = async () => {
//     try {
//       const pollInterval = 5000; // Poll every 5 seconds
//       const maxAttempts = 12; // Poll for a maximum of 1 minute

//       for (let attempt = 0; attempt < maxAttempts; attempt++) {
//         const res = await axios.post("http://localhost:8000/verify", {
//           orderId,
//         });

//         if (res && res.data) {
//           switch (res.data.status) {
//             case "PAID":
//               console.log("Payment successful and verified.");
//               alert("Payment verified successfully.");
//               navigate("/payment-success");
//               return;

//             case "EXPIRED":
//               console.log("Order expired.");
//               alert("Order expired.");
//               navigate("/payment-failure");
//               return;

//             case "TERMINATED":
//               console.log("Order terminated.");
//               alert("Order terminated.");
//               navigate("/payment-failure");
//               return;

//             default:
//               console.log("Unexpected payment status:", res.data.status);
//               alert("Payment failed.");
//               navigate("/payment-failure");
//               return;
//           }
//         } else {
//           console.error("No valid response from backend.");
//           alert("Verification failed.");
//           navigate("/payment-failure");
//           return;
//         }

//         // Wait for the next poll
//         await new Promise((resolve) => setTimeout(resolve, pollInterval));
//       }

//       // If max attempts reached, handle as failure
//       alert("Verification timeout. Navigating to failure page.");
//       navigate("/payment-failure");
//     } catch (error) {
//       console.error("Error during polling:", error);
//       alert("Verification error.");
//       navigate("/payment-failure");
//     }
//   };

//   const getSessionId = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/payment", formData);

//       if (res.data && res.data.payment_session_id) {
//         setOrderId(res.data.order_id);
//         console.log("Session ID fetched:", res.data.payment_session_id); // Log session ID
//         console.log("Order ID fetched:", res.data.order_id); // Log order ID
//         return res.data.payment_session_id;
//       } else {
//         console.error("Failed to fetch session ID or order ID");
//         throw new Error("Failed to fetch session ID");
//       }
//     } catch (error) {
//       console.error("Error fetching session ID:", error);
//       throw error; // Handle error properly
//     }
//   };

//   const verifyPayment = async () => {
//     try {
//       if (!orderId) {
//         console.error("Order ID is missing.");
//         alert("Order ID is missing. Verification failed.");
//         navigate("/payment-failure");
//         return;
//       }

//       const res = await axios.post("http://localhost:8000/verify", { orderId });

//       if (res && res.data) {
//         console.log("Verification response:", res.data);

//         // Check order status returned from the backend
//         switch (res.data.status) {
//           case "PAID":
//             console.log("Payment successful and verified.");
//             alert("Payment verified successfully.");
//             navigate("/payment-success");
//             break;

//           case "EXPIRED":
//             console.log("Order expired.");
//             alert("Order expired.");
//             navigate("/payment-failure");
//             break;

//           case "TERMINATED":
//             console.log("Order terminated.");
//             alert("Order terminated.");
//             navigate("/payment-failure");
//             break;

//           default:
//             console.log("Unexpected payment status:", res.data.status);
//             alert("Payment failed.");
//             navigate("/payment-failure");
//             break;
//         }
//       } else {
//         console.error("No valid response from backend.");
//         alert("Verification failed.");
//         navigate("/payment-failure");
//       }
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       alert("Verification error.");
//       navigate("/payment-failure");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let sessionId = await getSessionId();
//       console.log("Starting checkout with session ID:", sessionId);

//       let checkoutOptions = {
//         paymentSessionId: sessionId,
//         redirectTarget: "_modal",
//       };

//       cashfree
//         .checkout(checkoutOptions)
//         .then(() => {
//           // Verification should be handled by the success redirect or by polling the backend
//           console.log("Checkout started. Awaiting user response.");
//           pollPaymentStatus();
//         })
//         .catch((error) => {
//           console.error("Error during checkout:", error);
//           alert("Error during payment. Navigating to failure page.");
//           navigate("/payment-failure");
//         });
//     } catch (error) {
//       console.error("Error during payment process:", error);
//       alert("Error occurred. Navigating to payment-failure.");
//       navigate("/payment-failure");
//     }
//   };

//   return (
//     <Stack
//       className="paydetailbg"
//       alignItems="center"
//       justifyContent="center"
//       id="contact"
//       sx={{ py: { lg: "150px", xs: "100px" }, px: { lg: "0px", xs: "20px" } }}
//     >
//       <Typography
//         fontWeight={600}
//         sx={{
//           fontSize: { lg: "44px", xs: "30px" },
//           fontFamily: "'Oswald', sans-serif",
//         }}
//         textAlign="center"
//         mb="10px"
//         color="white"
//       >
//         PAYMENT DETAILS
//         <Typography
//           fontWeight={600}
//           sx={{
//             fontSize: { lg: "44px", xs: "30px" },
//             fontFamily: "'Oswald', sans-serif",
//           }}
//           textAlign="center"
//           mb="50px"
//           color="#dc030a"
//         >
//           STANDARD
//         </Typography>
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: "100%",
//           maxWidth: "700px",
//           mx: "auto",
//           p: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           backgroundColor: "#fff",
//         }}
//       >
//         <Stack spacing={2}>
//           <TextField
//             label="Name"
//             variant="outlined"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Phone"
//             variant="outlined"
//             name="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//           <FormControl
//             fullWidth
//             variant="outlined"
//             required
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           >
//             <InputLabel>Already a member?</InputLabel>
//             <Select
//               name="isMember"
//               value={formData.isMember}
//               onChange={handleChange}
//               label="Already a member?"
//             >
//               <MenuItem value="Yes">Yes</MenuItem>
//               <MenuItem value="No">No</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl
//             fullWidth
//             variant="outlined"
//             required
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           >
//             <InputLabel>Gym Type</InputLabel>
//             <Select
//               name="gymType"
//               value={formData.gymType}
//               onChange={handleChange}
//               label="Gym Type"
//             >
//               <MenuItem value="Cardio">Cardio</MenuItem>
//               <MenuItem value="Gym">Gym</MenuItem>
//               <MenuItem value="Cardio+Gym">Cardio+Gym</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl
//             fullWidth
//             variant="outlined"
//             required
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           >
//             <InputLabel>Duration</InputLabel>
//             <Select
//               name="duration"
//               value={formData.duration}
//               onChange={handleChange}
//               label="Duration"
//             >
//               <MenuItem value="Monthly">Monthly</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="From"
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//             required
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="To"
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//             required
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 "& fieldset": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//           <Button
//             className="search-btn"
//             type="submit"
//             sx={{
//               mt: 2,
//               bgcolor: "#FF2625",
//               color: "#fff",
//               textTransform: "none",
//             }}
//           >
//             Proceed To Payment
//           </Button>
//         </Stack>
//       </Box>
//     </Stack>
//   );
// };

// export default PaymentDetailsMonthly;
