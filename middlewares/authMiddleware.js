const supabase = require('../services/supabaseClient');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user; // 다음 단계에서 사용할 수 있게 저장
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Authentication failed', detail: err.message });
  }
};

module.exports = authMiddleware;
