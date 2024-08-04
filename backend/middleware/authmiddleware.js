const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    // Get the token from headers or query parameters
    const token = req.header('x-auth-token') || req.query.token;
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Attach the user from the payload to the request object
        req.user = decoded.user;
        
        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authenticateToken;
