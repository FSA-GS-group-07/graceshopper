const {
  models: { User },
} = require('../db');

//gatekeeping middleware

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };
