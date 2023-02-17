const express = require("express");
const router = express.Router();
const buyerController = require("../controller/buyerController");

router.route("/register").post(buyerController.createBuyer);
router.route("/login").post(buyerController.LoginBuyer);
router.route("/orders").post(buyerController.getOrders);
router.route("/orders/completed").post(buyerController.getCompletedOrders);
router.route("/orders/orderitem/:id").get(buyerController.ratingItem);
router.route("/orders/review/submit").post(buyerController.submitReview);
router.route("/orders/pending/top").post(buyerController.getOrdersTop);
router
  .route("/orders/completed/top")
  .post(buyerController.getOrdersCompletedTop);

module.exports = router;
