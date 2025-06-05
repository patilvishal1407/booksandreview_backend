const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log("token", token)


  if (!token) return res.sendStatus(401);

  const path = req.path;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) return res.sendStatus(403);

    const isReviewRoute = path.includes('/reviews');
    req.user = user;

    if (user.role === 'Admin' || (user.role === 'User' && isReviewRoute)) {
      // Admin And User Can make Review
      // Only Admin Can Add the Books

      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

  });
};

module.exports = authenticateToken;