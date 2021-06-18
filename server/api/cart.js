const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, Order_items, Cocktail },
} = require("../db");
const { requireToken } = require("./gatekeeping");

// GET api/cart/
// GET current order using requireToken middleware
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const orderArr = await Order.findAll({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: "cart" }],
        },
      });
      let order = {};
      let cocktails = [];
      if (orderArr.length > 0) {
        order = orderArr[0];
        cocktails = await order.getCocktails();
      }

      res.json({ order, cocktails });
    } else {
      //this seems to not be working atm need to look into why
      //wrong place to put error msg?
      res.status(404).send("You have to be logged in to view cart (for now)!");
    }
  } catch (err) {
    next(err);
  }
});

// POST /cart -> create a new cart WITH the first item added
router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.create({
        userId: req.user.id,
        status: "cart",
      });
      const orderItem = await Order_items.create({
        quantity: req.body.body.quantity,
        orderId: order.id,
        cocktailId: req.body.body.cocktailId,
      });
      const cocktails = await order.getCocktails();
      res.send({ order, cocktails });
    } else {
      console.log("there is not a user in the backend");
      res.send("no logged in user -> still have to build this feature out");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
