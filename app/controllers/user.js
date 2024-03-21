const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: passwordHash });
    res.status(201).send(user);
  } catch (err) {
    // If a user with the same email already exists, return a 409 status and a message
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "User already exists" });
    }

    // If any other error occurs, return a 500 status and a message
    res.status(500).json({
      message:
      err.message ||
      "Something wrong happened with your request to create a new user.",
    });
  }
};

// Export the login function
exports.login = async (req, res) => {
  try {
    // Try to find a user with the email provided in the request body
    const user = await User.findOne({ where: { email: req.body.email } });

    // If no user is found, return a 404 status and a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a user is found, compare the password provided in the request body with the user's password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // If the password is not valid, return a 401 status and a message
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the password is valid, sign a new JWT with the user's ID and the secret from the environment variables
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: Number(process.env.TOKEN_EXPIRATION),
    });

    // Return a 200 status, the token, and the user's data
    res.status(200).json({ token, user });

  } catch (error) {
    // If an error occurs, return a 500 status and a message
    res.status(500).json({
      message:
        error.message ||
        "Something wrong happened with your request to log in.",
    });
  }
};