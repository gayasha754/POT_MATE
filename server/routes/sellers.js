const express = require("express");
const router = express.Router();
const sellerController = require("../controller/sellerController");

router.route("/login").post(sellerController.loginSeller);
router.route("/addproduct").post(sellerController.addProduct);
router.route("/addstock").post(sellerController.addStock);
router.route("/addcustomer").post(sellerController.addCustomer);

router.route("/getlistings").post(sellerController.getSellerListings);
router.route("/getstock").post(sellerController.getStock);
router.route("/getcustomers").post(sellerController.getCustomers);
router.route("/reports/sales").post(sellerController.getSalesData);
router.route("/orders").post(sellerController.getPendingOrders);
router.route("/orders/shipped").post(sellerController.getShippedOrders);
router.route("/orders/completed").post(sellerController.getCompletedOrders);
router.route("/getStock/:id").get(sellerController.getOneStock);

router
  .route("/orders/update/shipping")
  .post(sellerController.updateShippingStatus);
router.route("/updateproduct").post(sellerController.updateProduct);
router.route("/updatestock").post(sellerController.updateStock);

router.route("/getsales").post(sellerController.getSalesCount);
router.route("/getorders").post(sellerController.getOrdersCount);
router.route("/getProducts").post(sellerController.getProductsCount);
router.route("/getannualsalesdata").post(sellerController.getAnnualSalesData);


module.exports = router;
