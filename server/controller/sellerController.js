const sellerModel = require("../model/sellerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email cant be empty" });
  }
  if (!password) {
    return res.status(400).json({ error: "password cant be empty" });
  }
  try {
    await sellerModel.isSellerExists(email, res).then((seller) => {
      try {
        bcrypt.compare(password, seller.password).then((match) => {
          if (match) {
            const accessToken = jwt.sign(
              {
                id: seller.sellerID,
                email: seller.email,
                roles: 2347,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "30s",
              }
            );

            const refreshToken = jwt.sign(
              {
                id: seller.sellerID,
                email: seller.email,
              },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            );

            //for testing
            res.json({
              user: seller,
              roles: 2347,
              success: "user has been successfuly logged in",
              accessToken: accessToken,
            });
          } else {
            res.json({ error: "email or password is incorrect!" });
          }
        });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    });
  } catch {
    return res.status(500).json({ error: "email or password is incorrect!" });
  }
};

const addProduct = (req, res) => {
  const {
    productName,
    supplierName,
    supplierContactNo,
    supplierEmail,
    stockAmount,
    price,
    discount,
    unitWeight,
    category,
    image1,
  } = req.body;

  if (!productName) {
    return res.json({ error: "productName can't be empty" });
  }

  if (!supplierName) {
    return res.json({ error: "descrption can't be empty" });
  }

  if (!supplierContactNo) {
    return res.json({ error: "supplierContactNo can't be empty" });
  }

  if (!stockAmount) {
    return res.json({ error: "stockAmount can't be empty" });
  }

  if (!unitWeight) {
    return res.json({ error: "unitWeught can't be empty" });
  }

  try {
    sellerModel.addProduct(
      productName,
      supplierName,
      supplierContactNo,
      supplierEmail,
      stockAmount,
      price,
      discount,
      unitWeight,
      category,
      image1,
      res
    );
  } catch (err) {
    res.json({ error: err });
  }
};

const addStock = async (req, res) => {
  const { productName, productID, stockAmount } = req.body;

  if (!productName) {
    return res.json({ error: "productName can't be empty" });
  }

  if (!productID) {
    return res.json({ error: "product id can't be empty" });
  }

  if (!stockAmount) {
    return res.json({ error: "stockAmount can't be empty" });
  }

  try {
    await sellerModel.addStock(productName, productID, stockAmount, res);
  } catch (err) {
    res.json({ error: err });
  }
};

const addCustomer = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.json({ error: "username can't be empty" });
  }

  if (!email) {
    return res.json({ error: "email can't be empty" });
  }

  if (!password) {
    return res.json({ error: "password can't be empty" });
  }

  try {
    await sellerModel.addCustomer(username, email, password, res);
  } catch (err) {
    res.json({ error: err });
  }
};

const getSellerListings = async (req, res) => {
  try {
    await sellerModel.getSellerListings(res).then((results) => {
      const listings = results;
      res.json({ listings: listings });
    });
  } catch (err) {
    return res.json({ error: "Internal Server Error!" });
  }
};

const getStock = async (req, res) => {
  try {
    await sellerModel.getStock(res).then((results) => {
      const stock = results;
      res.json({ stock: stock });
    });
  } catch (err) {
    return res.json({ error: "Internal Server Error!" });
  }
};

const getCustomers = async (req, res) => {
  try {
    await sellerModel.getCustomers(res).then((results) => {
      const customers = results;
      res.json({ customers: customers });
    });
  } catch (err) {
    return res.json({ error: "Internal Server Error!" });
  }
};

const getSalesData = async (req, res) => {
  const { from, to } = req.body;

  if (!to) {
    return res.json({ error: "To Date Can't be empty" });
  }

  if (!from) {
    return res.json({ error: "From Date Can't be empty" });
  }

  try {
    await sellerModel.getSalesData(from, to, res).then((results) => {
      const records = results;
      console.log(results);
      res.json({ records: records });
    });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    await sellerModel.getPendingOrders(res).then((results) => {
      const orders = results;

      res.json({ orders: orders });
    });
  } catch (err) {
    return res.json({ error: "Internal Error" });
  }
};

const getShippedOrders = async (req, res) => {
  const { sellerID } = req.body;

  try {
    await sellerModel.getShippedOrders(sellerID, res).then((results) => {
      const orders = results;

      res.json({ orders: orders });
    });
  } catch (err) {
    return res.json({ error: "Internal Error" });
  }
};

const getCompletedOrders = async (req, res) => {
  const { sellerID } = req.body;

  try {
    await sellerModel.getCompletedOrders(sellerID, res).then((results) => {
      const orders = results;

      res.json({ orders: orders });
    });
  } catch (err) {
    return res.json({ error: "Internal Error" });
  }
};

const updateShippingStatus = async (req, res) => {
  const { orderItemID } = req.body;
  console.log("herrrrr");

  try {
    await sellerModel.updateShippingStatus(orderItemID, res).then(() => {
      res.json({ success: "Marked as Shippped" });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

// Update products by admin
const updateProduct = async (req, res) => {
  const {
    productName,
    supplierName,
    supplierContactNo,
    supplierEmail,
    stockAmount,
    price,
    discount,
    unitWeight,
    category,
    image1,
    id,
  } = req.body;

  console.log("Data on Controller -> ", image1);

  if (!productName) {
    return res.json({ error: "productName can't be empty" });
  }

  if (!supplierName) {
    return res.json({ error: "descrption can't be empty" });
  }

  if (!supplierContactNo) {
    return res.json({ error: "supplierContactNo can't be empty" });
  }

  if (!stockAmount) {
    return res.json({ error: "stockAmount can't be empty" });
  }

  if (!unitWeight) {
    return res.json({ error: "unitWeught can't be empty" });
  }

  try {
    await sellerModel
      .updateProduct(
        productName,
        supplierName,
        supplierContactNo,
        supplierEmail,
        stockAmount,
        price,
        discount,
        unitWeight,
        category,
        image1,
        id,
        res
      )
      .then(() => {
        res.json({ success: "Product Updated" });
      });
  } catch (error) {
    return res.json({ error: error });
  }
  // try {
  //   await sellerModel.updateProduct(
  //     productName,
  //     supplierName,
  //     supplierContactNo,
  //     supplierEmail,
  //     stockAmount,
  //     price,
  //     discount,
  //     unitWeight,
  //     category,
  //     image1,
  //     res
  //   ).then(() => {
  //     res.json({ success: "Product updated" });
  //   });
  // } catch (err) {
  //   return res.json({ error: "Something went wrong" });
  // }
};

// Update stock by admin
const updateStock = async (req, res) => {
  
  const {
    productId,
    productName,
    Amount,
    stockId,
  } = req.body;

    
  if (!productId) {
    return res.json({ error: "product ID can't be empty" });
  }

  if (!productName) {
    return res.json({ error: "product Name can't be empty" });
  }

  if (!Amount) {
    return res.json({ error: "Amount can't be empty" });
  }

  try {
    await sellerModel.updateStock( 
      productId,
      productName,
      Amount,
      stockId,
      res
      ).then(() => {
      res.json({ success: "Stock Updated"});
    });
  } catch (error) {
    return res.json({ error : error });
  }
  
};

const getOneStock = async (req, res) => {
  const stockId = req.params.id;
  // console.log(stockId)

  try {
    await sellerModel.getStockDetails(stockId, res).then((results) => {
      console.log(results, 'results');

      const stock = results;
      res.json({ stocks: stock });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = {
  loginSeller,
  addProduct,
  getSellerListings,
  addStock,
  addCustomer,
  getSalesData,
  getStock,
  getCustomers,
  getPendingOrders,
  getShippedOrders,
  getCompletedOrders,
  updateShippingStatus,
  updateProduct,
  updateStock,
  getOneStock,
  
};
