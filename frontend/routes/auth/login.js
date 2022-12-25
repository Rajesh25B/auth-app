const express = require("express");
const cookie = require("cookie");

// To make AJAX req in Express we need node-fetch package
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/api/users/login", async (req, res) => {
  // make a req to Dj-backend-API '/api/token/'
  const { email, password } = req.body;
  const body = JSON.stringify(email, password);

  try {
    const response = await fetch(`${process.env.API_URL}/api/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await response.json(); // get back the data

    if (response.status === 200) {
      // if successful, we get back access&refresh tokens, set them in cookies

      res.setHeader("Set-Cookie", [
        // [`access=${data.access}; refresh=${data.refresh}; HttpOnly; Max-Age: 1800`] // setting cookie without cookie package (manual-setup)
        cookie.serialize("access", data.access, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: "/api/",
          sameSite: "strict",
          // secure: process.env.NODE_ENV === "production",
        }),
        cookie.serialize("refresh", data.refresh, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: "/api/",
          sameSite: "strict",
          // secure: process.env.NODE_ENV === "production",
        }),
      ]);
      return res.status(200).json({ success: "Logged in successfully" });
    } else {
      return res.status(response.status).json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
