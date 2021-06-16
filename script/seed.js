"use strict";

const { db } = require("../server/db");

const User = require("../server/db/models/user");
const Cocktail = require("../server/db/models/cocktail");


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */




async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')
  

  const data = require('../script/data2.json')

  let cocktails = [];
  
  data.drinks.forEach((drink) => {
    let cocktail = {
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb
    }
    cocktails.push(cocktail)
  })
  
  
  // Creating Users
  const users = await Promise.all([
    User.create({
      firstName: "cody",
      lastName: "bean",
      email: "cody@email.com",
      username: "cody",
      password: "123",
    }),
    User.create({
      firstName: "murphy",
      lastName: "terry",
      email: "murphy@email.com",
      username: "murphy",
      password: "123",
    }),
  ]);

  // Creating Cocktails
  const allCocktails = await Promise.all(
    cocktails.map((cocktail) => Cocktail.create(cocktail))
  )
 

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${allCocktails.length} cocktails`)
  console.log(`seeded successfully`)

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
