const jwt = require("jsonwebtoken");
const jwtSecret=require('../config/keys.js').jwtSecret

module.exports = function (req, res, next){
  
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token,authorizationn denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
}