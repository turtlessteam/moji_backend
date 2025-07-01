const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        const result = await authService.login(userEmail, password);
        res.status(200).json({ message: 'Login successful', result:result });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

