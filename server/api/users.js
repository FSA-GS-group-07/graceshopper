const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { isAdmin } = require("./gatekeeping");
module.exports = router;

// GET api/users
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "firstName", "lastName", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
