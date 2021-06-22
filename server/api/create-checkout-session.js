const router = require("express").Router();
module.exports = router;
require("../../secrets");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.post("/", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://google.com",
      cancel_url: "https://google.com",
    });

    console.log("session in back end", session);
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
