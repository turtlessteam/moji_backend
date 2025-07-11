const express = require('express');
const router = express.Router();
const todayTodoController = require('../controllers/todayTodoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/today', authMiddleware, todayTodoController);

module.exports = router;
