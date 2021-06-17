//Changes(if required) : name of the model
const router = require("express").Router();
const {
  models: { Cocktail },
} = require("../db");
module.exports = router;

// GET api/cocktails
router.get("/", async (req, res, next) => {
  try {
    const cocktails = await Cocktail.findAll();
    res.json(cocktails);
  } catch (err) {
    next(err);
  }
});

// GET api/cocktails/:id
router.get("/:id", async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findByPk(req.params.id);
    res.json(cocktail);
  } catch (err) {
    next(err);
  }
});

//PUT api/cocktails/:id
router.put("/:id", async (req, res, next) => {
  try {
    const updateCocktail = await Cocktail.findByPk(req.params.id);
    res.json(await updateCocktail.update(req.body));
  } catch (err) {
    next(err);
  }
});
