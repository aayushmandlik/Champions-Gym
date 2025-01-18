const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(
//   cors({
//     origin: "https://champions-gym.vercel.app",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

// Step 1: Enable CORS middleware globally
app.use(
  cors({
    origin: "https://champions-gym.vercel.app",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type",
  })
);

// Step 2: Add specific headers for all routes
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://champions-gym.vercel.app"
  ); // Change "*" to your frontend URL in production
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Example route to test
app.get("/", (req, res) => {
  res.send("Hello, CORS is now configured!");
});

app.options("*", cors());

app.post("/send-email", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "Gmail", // You can use any other email service provider
    auth: {
      user: process.env.AUTH_USER, // Replace with your email
      pass: process.env.AUTH_PASS, // Replace with your email password
    },
  });

  // Email to the receiver
  const mailOptionsReceiver = {
    from: email,
    to: process.env.AUTH_USER, // Replace with receiver's email
    subject: `New Contact from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Message from ${name}</h2>
        <div style="background-color: #fff; padding: 15px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p style="color: #555; line-height: 1.5;">
            <strong>Name:</strong> ${name}
          </p>
          <p style="color: #555; line-height: 1.5;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="color: #555; line-height: 1.5;">
            <strong>Phone:</strong> ${phone}
          </p>
          <p style="color: #555; line-height: 1.5; margin-top: 20px;">
            <strong>Message:</strong> ${message}
          </p>
        </div>
        <p style="color: #333; font-size: 14px; margin-top: 30px; text-align: center;">
          Hello! We wanted to let you know we received your message and will be in touch ASAP.
        </p>
        <p style="color: #333; font-size: 16px; text-align: center;">
          Regards,<br>Champions Gym
        </p>
        <p style="color: #777; font-size: 12px; text-align: center; margin-top: 20px;">
          Thank you for contacting us.
        </p>
      </div>
    `,
  };

  // Email to the sender/user
  const mailOptionsUser = {
    from: process.env.AUTH_USER,
    to: email, // The user's email
    subject: `Thank You, ${name}, for Contacting Us.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Message from ${name}</h2>
        <div style="background-color: #fff; padding: 15px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p style="color: #555; line-height: 1.5;">
            <strong>Name:</strong> ${name}
          </p>
          <p style="color: #555; line-height: 1.5;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="color: #555; line-height: 1.5;">
            <strong>Phone:</strong> ${phone}
          </p>
          <p style="color: #555; line-height: 1.5; margin-top: 20px;">
            <strong>Message:</strong> ${message}
          </p>
        </div>
        <p style="color: #333; font-size: 14px; margin-top: 30px; text-align: center;">
          Hello! We wanted to let you know we received your message and will be in touch ASAP.
        </p>
        <p style="color: #333; font-size: 16px; text-align: center;">
          Regards,<br>Champions Gym
        </p>
        <p style="color: #777; font-size: 12px; text-align: center; margin-top: 20px;">
          Thank you for contacting us.
        </p>
      </div>
    `,
  };

  // Send emails
  transporter.sendMail(mailOptionsReceiver, (error, info) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error sending email to receiver", error });
    }

    // Send email to the user
    transporter.sendMail(mailOptionsUser, (error, info) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error sending email to user", error });
      }

      res.status(200).send({ message: "Emails sent successfully" });
    });
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.post("/payment", async (req, res) => {
  const {
    email,
    name,
    phone,
    planName,
    duration,
    message,
    isMember,
    startDate,
    endDate,
    price,
  } = req.body;

  try {
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: planName,
              // Optional fields:
              // images: ["https://example.com/path-to-image.jpg"],
              // metadata: { planDuration: duration, customerPhone: phone },
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        "https://champions-gym.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://champions-gym.vercel.app/payment-failure",
      metadata: {
        name: name || "",
        email: email || "",
        phone: phone || "",
        planName: planName || "",
        duration: duration || "",
        message: message || "",
        isMember: isMember || false,
        startDate: startDate || "",
        endDate: endDate || "",
        price: price || 0,
      },
    });

    // Respond with the session URL to redirect
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return res.status(500).send("Error creating payment session");
  }
});

const processedPayments = new Set();

app.post("/verify-payment", async (req, res) => {
  const { sessionId } = req.body;
  console.log("Received sessionId:", sessionId);

  if (!sessionId) {
    return res.status(400).send("Session ID is missing");
  }

  if (processedPayments.has(sessionId)) {
    console.log("Duplicate session ID detected:", sessionId);
    return res.status(400).send("Payment already processed");
  }

  processedPayments.add(sessionId);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session details:", session);

    if (!session.metadata) {
      console.error("Metadata is missing in session.");
      return res.status(400).send("Payment session metadata is missing");
    }

    if (session.payment_status === "paid") {
      console.log("Payment status is PAID");
      processedPayments.add(sessionId);

      const {
        name,
        email,
        phone,
        planName,
        duration,
        message,
        isMember,
        startDate,
        endDate,
        price,
      } = session.metadata;

      if (!email) {
        console.error("Email is missing in session metadata.");
        return res.status(400).send("Email is missing");
      }

      const mailOptionsUsers = {
        from: process.env.AUTH_USER,
        to: email,
        subject: `Thank You, ${name}, for Your Payment at Champions Gym`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; text-align: center; border-bottom: 2px solid #dc030a; padding-bottom: 10px; font-family: 'Oswald', sans-serif;">Thank You, ${name}!</h2>

          <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We're excited to inform you that your payment was successful. Below are your details:
          </p>

          <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Phone:</strong> ${phone}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Already a Member:</strong> ${isMember}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Plan:</strong> ${planName}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Duration:</strong> ${duration}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Start Date:</strong> ${startDate}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>End Date:</strong> ${endDate}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Amount Paid:</strong> ₹${price}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Message:</strong> ${message}
            </p>
          </div>

          <p style="color: #333; font-size: 15px; margin-top: 25px; text-align: center;">
            Thank you for choosing Champions Gym. We look forward to seeing you!
          </p>

          <p style="color: #333; font-size: 16px; text-align: center; margin-bottom: 0;">
            Regards,<br><strong>Champions Gym Team</strong>
          </p>

          <footer style="color: #999; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            Champions Gym, 1234 Fitness Street, Wellness City, IN 123456<br/>
            © 2024 Champions Gym. All Rights Reserved.
          </footer>
        </div>
      `,
      };

      const mailOptionsOwner = {
        from: process.env.AUTH_USER,
        to: process.env.AUTH_USER,
        subject: `Payment from ${name} of Rs${price}, for ${planName} for ${duration} at Champions Gym`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; text-align: center; border-bottom: 2px solid #dc030a; padding-bottom: 10px; font-family: 'Oswald', sans-serif;">Payment of Rs ${price}</h2>

          <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            ${
              isMember === "yes"
                ? `New Member ${name} joined for ${planName} for ${duration}`
                : `Payment received from Old Member named ${name} for ${planName} for ${duration}`
            }. Below are the details:
          </p>

          <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Phone:</strong> ${phone}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Already a Member:</strong> ${isMember}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Plan:</strong> ${planName}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Duration:</strong> ${duration}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Start Date:</strong> ${startDate}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>End Date:</strong> ${endDate}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Amount Paid:</strong> ₹${price}
            </p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">
              <strong>Message:</strong> ${message}
            </p>
          </div>

          <p style="color: #333; font-size: 15px; margin-top: 25px; text-align: center;">
            Thank you for choosing Champions Gym. We look forward to seeing you!
          </p>

          <p style="color: #333; font-size: 16px; text-align: center; margin-bottom: 0;">
            Regards,<br><strong>Champions Gym Team</strong>
          </p>

          <footer style="color: #999; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            Champions Gym, 1234 Fitness Street, Wellness City, IN 123456<br/>
            © 2024 Champions Gym. All Rights Reserved.
          </footer>
        </div>
      `,
      };
      transporter.sendMail(mailOptionsUsers, (error, info) => {
        if (error) {
          console.error("Error sending user email:", error);
          return res.status(500).send("Error sending user email");
        }

        console.log("User email sent successfully:", info.response);

        transporter.sendMail(mailOptionsOwner, (error, info) => {
          if (error) {
            console.error("Error sending owner email:", error);
            return res.status(500).send("Error sending owner email");
          }

          console.log("Owner email sent successfully:", info.response);

          // Add session ID to processedPayments only after successful email sending
          processedPayments.add(sessionId);
          return res.json({ status: "paid" });
        });
      });
    } else {
      console.error("Payment status is not paid:", session.payment_status);
      return res.json({ status: "unpaid" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).send("Error verifying payment");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
