//Changes(if required) : name of the model
const router = require("express").Router();
const {
  models: { Cocktail },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cocktails = await Cocktail.findAll();
    res.json(cocktails);
  } catch (err) {
    next(err);
  }
});
