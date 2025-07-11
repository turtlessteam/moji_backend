const todayTodoService = require('../services/todayTodoService');

const todayTodoController = async (req, res) => {
  try {
    const userId = req.user.id;
    const token = req.headers.authorization.split(' ')[1];
    const sort = req.query.sort || 'latest';
    const limit = parseInt(req.query.limit, 10) || 5;

    const result = await todayTodoService(userId, sort, limit, token);
    res.json(result);
  } catch (err) {
    console.error('[TODO TODAY] 에러:', err.message);
    res.status(500).json({ error: '오늘 할 일 조회 중 오류 발생' });
  }
};

module.exports = todayTodoController;
