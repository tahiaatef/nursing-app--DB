const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // الحصول على التوكن من الـ Header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  
  // نتوقع أن يكون التوكن بالشكل التالي: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // يمكننا استخدام هذه البيانات في باقي الـ Endpoints
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
