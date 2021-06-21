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

//POST api/cocktails
router.post("/", async (req, res, next) => {
  try {
    const newCocktail = await Cocktail.create(req.body);
    res.status(201).json(newCocktail);
  } catch (error) {
    next(error);
  }
});

//DELETE api/cocktails/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteCocktail = await Cocktail.findByPk(req.params.id);
    await deleteCocktail.destroy();
    res.status(200).json({ message: "Successfully deleted!", deleteCocktail });
  } catch (error) {
    next(error);
  }
});
