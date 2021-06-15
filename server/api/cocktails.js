//Changes(if required) : name of the model
const router = require("express").Router();
const {
  models: { Cocktail },
} = require("../db");
module.exports = router;

// GET /cocktails
router.get("/", async (req, res, next) => {
  try {
    const cocktails = await Cocktail.findAll();
    res.json(cocktails);
  } catch (err) {
    next(err);
  }
});

// GET /cocktails/:id
router.get("/cocktails/:id", async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findByPk(req.paramds.id);
    res.json(cocktail);
  } catch (err) {
    next(err);
  }
});
