const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, Order_items, Cocktail },
} = require("../db");
const { requireToken } = require("./gatekeeping");

// GET api/cart/
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

// POST api/cart -> create a new cart WITH the first item added
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
      res
        .status(404)
        .send("no logged in user -> still have to build this feature out");
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart
router.put("/", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const { cocktailId, quantity } = req.body.body;

      const orderArr = await Order.findAll({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: "cart" }],
        },
      });
      const order = orderArr[0];

      let item = await Order_items.findOne({
        where: {
          [Sequelize.Op.and]: [
            { orderId: order.dataValues.id },
            { cocktailId },
          ],
        },
      });
      console.log("item", item);

      let qty;
      if (!item) {
        console.log("so we re in the conditional");
        item = await order.addCocktail(cocktailId);
        qty = quantity;
      }
      console.log("item datavalues", item.dataValues);
      qty = item.dataValues.quantity + quantity;

      item.update({ quantity: qty });

      res.send(item);
    } else {
      res
        .status(404)
        .send("no logged in user -> still have to build this feature out");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
