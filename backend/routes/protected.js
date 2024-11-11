const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token' });

    req.user = decoded;
    next();
  });
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ error: 'Access denied' });
  next();
};

router.get('/teacher', verifyToken, authorizeRole('teacher'), (req, res) => {
  res.json({ message: 'Welcome, Teacher!' });
});

router.get('/student', verifyToken, authorizeRole('student'), (req, res) => {
  res.json({ message: 'Welcome, Student!' });
});

module.exports = router;