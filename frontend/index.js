const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config(); // helps to read the env vars into express

const registerRoute = require("./routes/auth/register");
const meRoute = require("./routes/auth/me");
const loginRoute = require("./routes/auth/login");

const app = express();
app.use(express.json()); // middleware allows to receive the request data in json
app.use(cookieParser());
app.use(loginRoute); // login Route usage
app.use(registerRoute); // registerRoute usage
app.use(meRoute); // meRoute usage after logging in handle home page.

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  // pass path
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
