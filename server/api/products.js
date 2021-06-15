const router = require("express").Router();
const {
  models: { User, Product },
} = require("../db");
module.exports = router;

// GET /products/:id
router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.paramds.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
