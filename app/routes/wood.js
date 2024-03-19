const express = require('express');
const router = express();
const ctrlWood = require('../controllers/wood');

router.get("/list", ctrlWood.listWood);

module.exports = router;