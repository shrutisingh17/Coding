const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (existingUser) {
      return res.status(409).json("User already exists!");
    }
    //encrypting password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });

    const savedUser = await newUser.save();
    return res.status(200).json("User has been created.");
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Logging In
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "jwtkey");
    const { password, ...other } = user.toObject();

    return res
      .cookie("access_token", token, {
        httpOnly: false,
      })
      .status(200)
      .json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Logging out
router.post("/logout", async (req, res) => {
  try {
    return res.clearCookie("access_token", {
      sameSite: "none",
      secure: true
    }).status(200).json("User has been logged out.");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
