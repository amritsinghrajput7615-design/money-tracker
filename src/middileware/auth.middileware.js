const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

async function authMiddileware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 VERY IMPORTANT
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = authMiddileware;