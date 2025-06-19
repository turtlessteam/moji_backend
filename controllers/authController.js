const authService = require('../services/authService');

//��ü ���� �帧�� ����
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', result:result });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};