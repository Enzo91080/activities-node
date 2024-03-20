const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const userData = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await User.create(userData);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new user.",
    });
  }
};

exports.login = (req, res) => {
  res.send("You are login");
};
