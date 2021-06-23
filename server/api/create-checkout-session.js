const Cocktail = require("../db/models/cocktail");
const router = require("express").Router();
module.exports = router;
if (process.env.NODE_ENV !== "production") require("../../secrets");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.post("/", async (req, res, next) => {
  try {
    let lineItems = [];
    for (const cocktail of req.body.cocktails) {
      const verifiedCocktail = await Cocktail.findByPk(cocktail.id);
      const obj = {
        price_data: {
          currency: "usd",
          product_data: {
            name: verifiedCocktail.name,
            images: [verifiedCocktail.imageUrl],
          },
          unit_amount: verifiedCocktail.price * 100,
        },
        quantity: cocktail.order_items.quantity,
      };
      lineItems.push(obj);
    }

    let success, cancel;
    if (process.env.NODE_ENV === "production") {
      success = "https://pourdecisions.herokuapp.com/confirmation";
      cancel = "https://pourdecisions.herokuapp.com/cart";
    } else {
      success = "http://localhost:8080/confirmation";
      cancel = "http://localhost:8080/cart";
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: success,
      cancel_url: cancel,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
