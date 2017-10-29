const jwt = require('jsonwebtoken');

const decodeSub = (req, res, next) => {
  const tokenCookie = req.cookies.id_token;
  const tokenJWT = req.headers.authorization;
  if (!tokenCookie && !tokenJWT) {
    req.user = null;
    return next();
  } else {
    const token = tokenCookie || tokenJWT;
    // req.cookies['refresh-token'];
    try {
      const decoded = jwt.verify(token, 'yourtoken');
      req.user = decoded;
      // console.log('decoded ', decoded)
      return next();
    } catch (e) {
      req.user = null;
      return next();
    }
  }

};

module.exports = decodeSub;
