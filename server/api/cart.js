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
      const order = await Order.findOne({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: "cart" }],
        },
        include: Cocktail,
      });

      const cocktails = order.cocktails;
      res.json({ order, cocktails });
    } else {
      res.send({ order: {}, cocktails: [] });
    }
  } catch (err) {
    res.send({ order: {}, cocktails: [] });
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
      await Order_items.create({
        quantity: req.body.quantity,
        orderId: order.id,
        cocktailId: req.body.cocktailId,
      });
      const cocktails = await order.getCocktails();
      res.send({ order, cocktails });
    } else {
      const newOrder = await Order.create(req.body.order);

      req.body.cocktails.forEach(async (cocktail) => {
        await Order_items.create({
          orderId: newOrder.id,
          cocktailId: cocktail.id,
          quantity: cocktail.order_items.quantity,
        });
      });

      res.send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart
router.put("/", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: "cart" }],
        },
        include: Cocktail,
      });
      const { cocktailId, quantity } = req.body;

      let item = order.cocktails.filter(
        (cocktail) => Number(cocktail.id) == Number(cocktailId)
      );

      let qty;
      if (!item || item.length === 0) {
        const newOrderArr = await order.addCocktail(cocktailId);
        const newOrder = newOrderArr[0];

        item = await Order_items.findOne({
          where: {
            [Sequelize.Op.and]: [{ orderId: newOrder.orderId }, { cocktailId }],
          },
        });

        qty = quantity;
      } else {
        item = item[0].order_items;
        qty = item.dataValues.quantity + quantity;
      }

      item.update({ quantity: qty });

      res.send(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart/completed
router.put("/completed", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      await Order.update(
        {
          status: "complete",
        },
        {
          where: {
            [Sequelize.Op.and]: [{ userId: req.user.id }, { status: "cart" }],
          },
        }
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/cocktail/:id

router.delete("/cocktail/:id", requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({
      where: {
        [Sequelize.Op.and]: [{ userId }, { status: "cart" }],
      },
      include: Cocktail,
    });

    await Order_items.destroy({
      where: {
        [Sequelize.Op.and]: [
          { orderId: order.id },
          { cocktailId: req.params.id },
        ],
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
