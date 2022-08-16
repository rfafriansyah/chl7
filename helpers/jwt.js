const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  return jwt.sign(payload, "SJ@IR*@NIIJA(@#RID");
};

const verifyToken = (token) => {
  return jwt.verify(token, "SJ@IR*@NIIJA(@#RID");
};

module.exports = {
  signToken,
  verifyToken,
};
