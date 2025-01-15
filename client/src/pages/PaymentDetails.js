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

const PaymentDetails = () => {
  const location = useLocation();

  const { price, planName } = location.state || { price: 0, planName: "" };
  console.log("Location State:", location.state); // Log the entire location state

  if (location.state) {
    console.log("Plan in PaymentDetails:", location.state.planName);
    console.log("Price in PaymentDetails:", location.state.price);
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

  console.log("Plan in PaymentDetails:", formData.planName);

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
        "https://champions-gym-server-rjxw175by-aayushmandliks-projects.vercel.app/payment",
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

export default PaymentDetails;
