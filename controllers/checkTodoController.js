const checkTodoService = require('../services/checkTodoService');

const checkTodoController = async (req, res) => {
  try {
    const userId = req.user.id;
    const token = req.headers.authorization.split(' ')[1];
    const taskId = req.params.taskId;

    const result = await checkTodoService(userId, taskId, token);
    res.json(result);
  } catch (err) {
    console.error('[TODO CHECK] 에러:', err.message);
    res.status(500).json({ error: '할 일 체크 상태 변경 중 오류 발생' });
  }
};

module.exports = checkTodoController;
