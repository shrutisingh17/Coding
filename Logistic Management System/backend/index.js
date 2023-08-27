const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const customerRoute = require("./routes/customerRoute");
const itemRoute = require("./routes/itemRoute");


dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use("/api/customer", customerRoute);
app.use("/api/item", itemRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});