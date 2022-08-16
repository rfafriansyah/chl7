const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const registerUser = async (req, res, next) => {
  try {
    let { username, password, role } = req.body;

    let user = await User.findOne({ where: { username } });

    if (user) {
      throw {
        message: "Periksa kembali data data login anda",
        statusCode: 400,
      };
    }

    await User.create({
      username,
      password,
      role,
    });
    res.status(201).json({ message: "Register berhasil, silahkan login" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (req.headers.access_token) {
      return res.status(200).json({ message: "Anda berhasil login" });
    }
    let user = await User.findOne({ where: { username } });
    if (!user) {
      throw {
        message: "Username or password wrong",
        statusCode: 400,
      };
    }
    let isValid = comparePassword(password, user.password);
    if (!isValid) {
      throw {
        message: "Username or password wrong",
        statusCode: 400,
      };
    }
    let token = signToken({ id: user.id, username: user.name });
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
