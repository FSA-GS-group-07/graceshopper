const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Order },
} = require('../db');

//a route to check a specific order by userId
// add item to cart
// update quantity of item(s) to cart
// delete item from cart
// clear cart?
// check out and complete cart

// GET api/orders/:id
router.get('/', async (req, res, next) => {
  try {
    const userId = req.body.userId;
    console.log('req.body', req.body);
    const order = await Order.findAll({
      where: {
        [Sequelize.Op.and]: [{ userId: userId }, { status: 'CART' }],
      },
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
