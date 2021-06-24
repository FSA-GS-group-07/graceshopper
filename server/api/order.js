const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Order, Order_items, Cocktail },
} = require('../db');

//get request to get the quantity for user
router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const { cocktailId, quantity } = req.body;
      const order = await Order.findOne({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: 'cart' }],
        },
        include: Cocktail,
      });
    }
  } catch (err) {
    next(err);
  }
});
