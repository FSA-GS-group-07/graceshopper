const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.body.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.body.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;

    if (req.user && !req.user.admin) {
      return res.status(403).send("You shall not pass!");
    } else {
      next();
    }
  } catch (error) {
    return res.status(403).send("You shall not pass!");
  }
};

module.exports = { requireToken, isAdmin };
