const uploadMemoService = require('../services/uploadMemoService');
const generateMemoTitle = require('../utils/generateMemoTitle');

const uploadMemoController = async (req, res) => {
  try {
    const userId = req.user.id; // 또는 토큰에서 userId 추출
    const token = req.token;

    const { memoContent, priority, todo } = req.body;

    // 제목 생성 로직
    //const memoTitle = generateMemoTitle(); 
    const memoTitle = "exampleMemoTitle"; //더미데이터


    await uploadMemoService({ userId, memoContent, priority, memoTitle, todo, token });

    res.status(200).send();
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ message: '서버 에러' });
  }
};

module.exports = uploadMemoController;
