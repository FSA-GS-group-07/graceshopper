const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const { firtName, lastName, password, email, username } = req.body;
    res.send({
      token: await User.authenticate({
        firtName,
        lastName,
        password,
        email,
        username,
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { firtName, lastName, password, email, username } = req.body;
    const user = await User.create({
      firtName,
      lastName,
      password,
      email,
      username,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
