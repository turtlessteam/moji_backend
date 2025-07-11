const searchMemoService = require('../services/searchMemoService');

const searchMemoController = async (req, res) => {
  try {
    const userId = req.user.id;
    const keyword = req.query.keyword;
    const access_token = req.headers.authorization?.split(' ')[1];

    if (!keyword) {
      return res.status(400).json({ error: 'keyword 쿼리 파라미터가 필요합니다.' });
    }

    if (!access_token) {
      return res.status(401).json({ error: 'access_token이 필요합니다.' });
    }

    const results = await searchMemoService(userId, keyword, access_token);
    res.json(results);
  } catch (err) {
    console.error('[MEMO SEARCH] 에러:', err.message);
    res.status(500).json({ error: '메모 검색 중 오류 발생' });
  }
};

module.exports = searchMemoController;
