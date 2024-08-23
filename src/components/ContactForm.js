import React, { useState } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <Stack
      className="membership"
      alignItems="center"
      mt="35px"
      justifyContent="center"
      p="50px"
      id="contact"
    >
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
          fontFamily: "'Oswald', sans-serif",
        }}
        textAlign="center"
        mb="50px"
        color="white"
      >
        Contact Form
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "700px",
          mx: "auto",
          //   mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        {/* <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography> */}
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone"
            variant="outlined"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
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
          />
          <Button
            className="search-btn"
            type="submit"
            //   variant="contained"
            //   color="success"
            sx={{
              mt: 2,
              bgcolor: "#FF2625",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ContactForm;
