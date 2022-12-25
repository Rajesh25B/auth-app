const express = require("express");

// To make AJAX req in Express we need nod-fetch package
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// create a router
const router = express.Router();

// route handler, endpoint gonna hit on port:5000 with POST req,
router.post("/api/users/register", async (req, res) => {
  // this gonna make an AJAX req to Dj backend
  const { first_name, last_name, email, phone_number, password } = req.body;
  // There is nothing inside of body, so apply middleware in index.js

  // JSONify the request.body data
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    phone_number,
    password,
  });

  try {
    const response = await fetch(`${process.env.API_URL}/api/users/register/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    // extract the data and return the status to AsyncThunks
    const data = await response.json();
    return res.status(registerRes.status).json(data); // data comes from serializer.data
  } catch (err) {
    return res.status(500).json({
      error: "Try after sometime, something went wrong",
    });
  }
});

module.exports = router;
