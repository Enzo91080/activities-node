const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = (req, res) => {
  res.send("You are login");
};

