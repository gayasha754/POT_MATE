const express = require("express");
const router = express.Router();
const rootController = require("../controller/rootController");

router.route("/getproducts/").get(rootController.getProducts);
router.route("/getpotmateproducts/").get(rootController.getPotMateProducts);
router
  .route("/getcategorizedproducts/")
  .get(rootController.getCategorizedProducts);
router
  .route("/getgardentoolsproducts/")
  .get(rootController.getGardenToolsProducts);
router.route("/getplantproducts/").get(rootController.getPlantProducts);
router.route("/getproducts/:id").get(rootController.getProductDetail);

module.exports = router;
