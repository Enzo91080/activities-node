const express = require('express');
const router = express();
const ctrlWood = require('../controllers/wood');
const auth = require("../middleware/auth.js")

router.get("/", auth, ctrlWood.listWood);
router.get("/:hardness", auth, ctrlWood.readByHardness);



module.exports = router;