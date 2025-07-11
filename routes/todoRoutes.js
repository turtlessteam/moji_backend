const express = require('express');
const router = express.Router();
const todayTodoController = require('../controllers/todayTodoController');
const leftTodoController = require('../controllers/leftTodoController');
const checkTodoController = require('../controllers/checkTodoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/today', authMiddleware, todayTodoController);
router.get('/left', authMiddleware, leftTodoController);
router.patch('/:taskId/check', authMiddleware, checkTodoController);

module.exports = router;
