const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('onboard/register', registerController.register);

module.exports = router;
