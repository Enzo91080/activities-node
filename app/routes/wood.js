const express = require('express');
const router = express();

// Import the controller
const ctrlWood = require('../controllers/wood');

// Import the middleware
const auth = require("../middleware/auth.js")
const multer = require('../middleware/multer.js')

router.get("/", auth, ctrlWood.listWood);
router.get("/:hardness", auth, ctrlWood.readByHardness);


router.post("/", auth, multer, ctrlWood.createWood);


module.exports = router;