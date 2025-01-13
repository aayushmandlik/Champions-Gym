import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { height, weight, gender } = formData;

    if (!height || !weight || !gender) {
      toast.error("Please enter height, weight, and select gender");
      return;
    }

    const bmi = calculateBMI(height, weight);

    let message = `Your BMI is ${bmi}. `;
    if (bmi < 18.5) {
      message += "You are underweight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      message += "You have a normal weight.";
    } else if (bmi >= 25 && bmi < 29.9) {
      message += "You are overweight.";
    } else {
      message += "You are obese.";
    }

    toast.success(message);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "500px",
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" gutterBottom>
        BMI Calculator
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Height (cm)"
          variant="outlined"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          required
        />
        <TextField
          label="Weight (kg)"
          variant="outlined"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Calculate BMI
        </Button>
      </Stack>
      <ToastContainer />
    </Box>
  );
};

export default BMICalculator;
