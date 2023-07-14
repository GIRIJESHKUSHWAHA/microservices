const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.jwtPrivateKey
exports.verifyToken = (req, res, next) => {
      try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                  return res.status(401).json({ message: 'No token provided' });
            }
            jwt.verify(token, jwtPrivateKey, (err, decoded) => {
                  if (err) {
                        return res.status(403).json({ message: 'Failed to authenticate token' });
                  }
                  // The token is valid, you can access the decoded payload
                  if (decoded && decoded.id == req.body.id && decoded.mobile == req.body.mobile) {
                        req.id = decoded.id;
                        return next();
                  } else {
                        return res.status(403).json({ message: 'Failed to authenticate token' });
                  }
            });
      } catch (error) {
            console.log("error...", error)
      }
};

