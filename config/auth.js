const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //Check for the token in all places in the request.
  let token = req.get("Authorization") || req.query.token || req.body.token;
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        next(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    next();
  }
};
