const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const Authentication = async (req, res, next) => {
  try {
    let token = req.headers.access_token;

    if (!token) {
      throw {
        message: "Invalid token",
        statusCode: 401,
      };
    }
    let payload = verifyToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw {
        message: "Invalid token",
        statusCode: 401,
      };
    }
    req.userLogin = payload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
