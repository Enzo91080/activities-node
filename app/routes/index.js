const express = require('express')
const router = express();

const userRoutes = require('./user.js') //Ce fichier n’existe pas encore.
router.use("/auth", userRoutes)


const woodRoutes = require('./wood.js') //Ce fichier n’existe pas encore.
router.use("/wood", woodRoutes)

module.exports = router