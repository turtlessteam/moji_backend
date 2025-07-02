const express = require('express');
const router = express.Router();
const getMemoController = require('../controllers/getMemoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getMemoController);

module.exports = router;
