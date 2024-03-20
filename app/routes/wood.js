const express = require('express');
const router = express();
const ctrlWood = require('../controllers/wood');

router.get("/", ctrlWood.listWood);
router.get("/:hardness", ctrlWood.readByHardness);



module.exports = router;