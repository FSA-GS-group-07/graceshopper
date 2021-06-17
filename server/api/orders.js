const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Order, CartItem, Cocktail },
} = require('../db');
const jwt = require('jsonwebtoken');

//a route to check a specific order by userId
// add item to cart
// update quantity of item(s) to cart
// delete item from cart
// clear cart?
// check out and complete cart

// GET api/orders/
// GET current order by token userId
router.get('/', verifyToken, async (req, res, next) => {
  try {
    jwt.verify(req.token, 'shh', async (err, data) => {
      if (err) {
        // res.sendStatus(403)
        //if no token, create empty cart
        const order = await Order.create({});
        res.json(order);
      } else {
        //data format (res.json(data))
        //   {
        //     "id": 3, //or userId
        //     "iat": 1623878801
        // }
        const order = await Order.findAll({
          where: {
            [Sequelize.Op.and]: [{ userId: data.id }, { status: 'CART' }],
          },
        });
        // console.log('order---->', order);
        // console.log('order.id-->', order[0].dataValues.id);
        const cartItems = await CartItem.findAll({
          where: { orderId: order[0].dataValues.id },
        });
        const cocktails = await Cocktail.findAll()
        res.json({ order, cartItems });
      }
    });
  } catch (err) {
    next(err);
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = router;
