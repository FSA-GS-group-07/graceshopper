const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Order, Order_items, Cocktail },
} = require('../db');
const { requireToken } = require('./gatekeeping');

// GET api/cart/
// GET current order using requireToken middleware
router.get('/', requireToken, async (req, res, next) => {
  try {
    //we have access to req.user
    if (req.user) {
      const order = await Order.findAll({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: 'CART' }],
        },
      });
      const orderItems = await Order_items.findAll({
        where: { orderId: order[0].dataValues.id },
      });
      // const cocktails = await Cocktail.findAll({
      //   where: { orderId: order[0].dataValues.id },
      // });
      res.json({ order, orderItems });
    } else {
      res.status(404).send('You have to be logged in to view cart (for now)!');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
