// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };


// -----------------------------

// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//   // Get token from header
//   const token = req.header('x-auth-token');
//   console.log("Auth token: ",token);

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// ------------------------------------

const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//   const token = req.header('x-auth-token');
//   console.log("Received token in auth middleware:", token);

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired', expired: true });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
