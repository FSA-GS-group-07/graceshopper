const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, Order_items, Cocktail },
} = require("../db");
const { requireToken } = require("./gatekeeping");

// GET api/orders
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAll({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: "complete" }],
        },
        include: Cocktail,
      });

      const formattedOrders = orders.map((order) => {
        return {
          order,
          cocktails: order.cocktails,
        };
      });

      res.json(formattedOrders);
    } else {
      res.send({ order: {}, cocktails: [] });
    }
  } catch (err) {
    res.send({ order: {}, cocktails: [] });
  }
});

module.exports = router;
