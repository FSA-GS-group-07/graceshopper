const {
  models: { User },
} = require('../db');

//gatekeeping middleware

const requireToken = async (req, res, next) => {
  try {
    // console.log('req.headers----->', req.headers);
    const token = req.headers.authorization;
    // console.log('token---->', token);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };
