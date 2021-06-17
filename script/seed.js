"use strict";

const { db } = require("../server/db");

const User = require("../server/db/models/user");
const Cocktail = require("../server/db/models/cocktail");
const Order = require("../server/db/models/order");
const Order_items = require("../server/db/models/orderitems");

const data = require("../script/data2.json");
const users = require("./users");
const orders = require("./orderAddresses");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  let cocktails = [];
  data.drinks.forEach((drink) => {
    let cocktail = {
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
    };
    cocktails.push(cocktail);
  });
  const allCocktails = await Promise.all(
    cocktails.map((cocktail) => Cocktail.create(cocktail))
  );

  const allUsers = await Promise.all(
    users.map((user, idx) => {
      const newUser = User.build(user);
      newUser.username = `${newUser.firstName}${newUser.lastName}`;
      if (idx > 180) {
        newUser.admin = true;
        newUser.password = "123456";
      } else {
        newUser.admin = false;
        newUser.password = "123";
      }
      return newUser.save();
    })
  );

  let memo = {};
  const allOrders = await Promise.all(
    orders.map((order, idx) => {
      const newOrder = Order.build(order);

      if (idx > 150) {
        newOrder.status = "cart";
      } else {
        newOrder.userId = Math.ceil(Math.random() * 100);
        if (memo[newOrder.userId] === true) {
          newOrder.status = "complete";
        } else {
          newOrder.status = "cart";
          memo[newOrder.userId] = true;
        }
      }

      return newOrder.save();
    })
  );

  const createOrderItems = (length) => {
    let array = [];
    for (let i = 0; i < length; i++) {
      const item = {};
      item.quantity = Math.ceil(Math.random() * 5);
      item.cocktailId = Math.ceil(Math.random() * (allCocktails.length - 1));
      item.orderId = Math.ceil(Math.random() * (allOrders.length - 1));
      array.push(item);
    }
    return array;
  };

  const orderItems = createOrderItems(200);
  const allOrderItems = await Promise.all(
    orderItems.map((item) => Order_items.create(item))
  );

  console.log(`seeded ${allOrders.length} orders`);
  console.log(`seeded ${allOrderItems.length} order items`);
  console.log(`seeded ${allUsers.length} users`);
  console.log(`seeded ${allCocktails.length} cocktails`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
