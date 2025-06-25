const registerService = require('../services/registerService');

exports.register = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const { access_token, id, nickname } = await registerService.registerUser(email, password);

    res.status(201).json({ access_token, id, nickname });
  } catch (error) {
    console.error('[REGISTER] 에러:', error.message);
    res.status(400).json({ message: error.message });
  }
};
