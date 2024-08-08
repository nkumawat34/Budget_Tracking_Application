const jwt = require('jsonwebtoken');

// Middleware function to verify JWT
const authenticateJWT = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  // Extract the token
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
