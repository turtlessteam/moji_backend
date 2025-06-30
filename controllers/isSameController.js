const isSameService = require('../services/isSameService');

//전달받은 아이디(계정)가 이미 가입됐는지 확인하는 함수
exports.isSame = async (req, res) => {
    const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const exists = await isSameService.checkUserEmailExists(email);
    return res.status(200).send(String(exists));
  } catch (err) {
    res.status(401).json({ message: err.message });
  }

};