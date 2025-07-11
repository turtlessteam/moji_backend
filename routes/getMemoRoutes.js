const express = require('express');
const router = express.Router();
const getMemoController = require('../controllers/getMemoController');
const authMiddleware = require('../middlewares/authMiddleware');
const searchMemoController = require('../controllers/searchMemoController');
const uploadMemoController = require('../controllers/uploadMemoController');

router.get('/', authMiddleware, getMemoController);
router.post('/upload', authMiddleware, uploadMemoController);
router.get('/search', authMiddleware, searchMemoController);

module.exports = router;
