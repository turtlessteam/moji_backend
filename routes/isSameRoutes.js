const express = require('express');
const router = express.Router();
const isSameController = require('../controllers/isSameController');

router.post('/isSame', isSameController.isSame);

module.exports = router;