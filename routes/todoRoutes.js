const express = require('express');
const router = express.Router();
const todayTodoController = require('../controllers/todayTodoController');
const leftTodoController = require('../controllers/leftTodoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/today', authMiddleware, todayTodoController);
router.get('/left', authMiddleware, leftTodoController);

module.exports = router;
