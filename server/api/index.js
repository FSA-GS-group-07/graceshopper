const router = require("express").Router();
module.exports = router;

// router.use("/users", require("./users"));

router.use("/cocktails", require("./cocktails"));
router.use("/cart", require("./cart"));
router.use("/orders", require("./orders"));
router.use("/users", require("./users"));
router.use("/create-checkout-session", require("./create-checkout-session"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
