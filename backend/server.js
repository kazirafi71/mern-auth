const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

//Middleware

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Routes

app.use("/api/auth", authRoutes);

//Server and database connection

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then((result) => {
    console.log("Database connected..");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occurred");
  });
