const getMemoService = require('../services/getMemoService');

const getMemoController = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = Number(req.query.limit) || 5;
    const sort = req.query.sort;

    if (!sort || !['latest', 'priority'].includes(sort)) {
      return res.status(400).json({
        error: "정렬 기준 'sort'는 반드시 'latest' 또는 'priority' 중 하나여야 합니다."
      });
    }

    const memos = await getMemoService(userId, limit, sort);
    res.json(memos);
  } catch (err) {
    console.error('[GET /memo] 에러:', err.message);
    res.status(500).json({ error: '메모 조회 중 오류 발생' });
  }
};

module.exports = getMemoController;
