// import React, { useState } from "react";
// import { TextField, Button, Box, Typography, Stack } from "@mui/material";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form Data:", formData);
//   };

//   return (
//     <Stack
//     // className="membership"
//     // alignItems="center"
//     // mt="35px"
//     // justifyContent="center"
//     // p="50px"
//     // id="contact"
//     >
//       {/* <Typography
//         fontWeight={700}
//         sx={{
//           fontSize: { lg: "44px", xs: "30px" },
//           fontFamily: "'Oswald', sans-serif",
//         }}
//         textAlign="center"
//         mb="50px"
//         color="white"
//       >
//         Contact Form
//       </Typography> */}

//       <section className="membership" id="contact">
//         <div className="section__container membership__container">
//           <h2 className="section__header">CONTACT FORM</h2>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               width: "100%",
//               maxWidth: "700px",
//               mx: "auto",
//               mt: 5,
//               p: 3,
//               borderRadius: 2,
//               boxShadow: 3,
//               backgroundColor: "#fff",
//             }}
//           >
//             {/* <Typography variant="h4" gutterBottom>
//           Contact Us
//         </Typography> */}
//             <Stack spacing={2}>
//               <TextField
//                 label="Name"
//                 variant="outlined"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <TextField
//                 label="Email"
//                 variant="outlined"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <TextField
//                 label="Phone"
//                 variant="outlined"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//               <TextField
//                 label="Message"
//                 variant="outlined"
//                 name="message"
//                 multiline
//                 rows={4}
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               />
//               <Button
//                 className="search-btn"
//                 type="submit"
//                 //   variant="contained"
//                 //   color="success"
//                 sx={{
//                   mt: 2,
//                   bgcolor: "#FF2625",
//                   color: "#fff",
//                   textTransform: "none",
//                 }}
//               >
//                 Submit
//               </Button>
//             </Stack>
//           </Box>
//         </div>
//       </section>
//     </Stack>
//   );
// };

// export default ContactForm;

import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for Toastify

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    // Send form data to the backend
    fetch("http://localhost:8000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Show success toast
          toast.success("Emails sent successfully!");
          setLoading(false);
          setFormData({
            name: "",
            email: "",
            message: "",
            phone: "",
          });
        } else {
          // Show error toast
          toast.error("Failed to send emails.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // Show error toast
        toast.error("An error occurred. Please try again.");
        setLoading(false);
      });
  };

  return (
    <Stack>
      <ToastContainer /> {/* Toast container to display notifications */}
      <section className="membership" id="contact">
        <div className="section__container membership__container">
          <h2 className="section__header">CONTACT FORM</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: "700px",
              mx: "auto",
              mt: 5,
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
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "red",
                    },
                  },
                }}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "red",
                    },
                  },
                }}
                required
              />
              <TextField
                label="Phone"
                variant="outlined"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "red",
                    },
                  },
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "red",
                    },
                  },
                }}
                required
              />
              <Button
                className={`search-btn ${!loading && "cursor-pointer"}`}
                type="submit"
                sx={{
                  mt: 2,
                  bgcolor: "#FF2625",
                  color: "#fff",
                  textTransform: "none",
                }}
                // disabled={loading}
              >
                {loading ? "Sending... Please Wait" : "Submit"}
              </Button>
            </Stack>
          </Box>
        </div>
      </section>
    </Stack>
  );
};

export default ContactForm;
