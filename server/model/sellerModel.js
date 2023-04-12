const e = require("express");
const db = require("../config/database");

const isSellerExists = (email, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });

      const sql = "SELECT * FROM admin WHERE email=?";
      connection.query(sql, email, (error, results) => {
        if (error) throw error;

        if (results.length === 1 && !error) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
    });
  });
};

const addProduct = (
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
) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error 1" });
    } else {
      const sql =
        "INSERT INTO products ( productName, supplierName, supplierContactNo, supplierEmail, stockAmount, price, discount, unitWeight, category, image ) VALUES (?,?,?,?,?,?,?,?,?,?)";
      connection.query(
        sql,
        [
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
        ],
        (err, results) => {
          connection.release();
          if (err) {
            return res.json({ error: "Internal Server Error 2" });
          } else {
            return res.json({ success: "product successfully added" });
          }
        }
      );
    }
  });
};

const addStock = (productName, productID, stockAmount, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error 1" });
      } else {
        const sql =
          "INSERT INTO stock ( productId, productName, Amount ) VALUES (?,?,?)";
        connection.query(
          sql,
          [productID, productName, stockAmount],
          (err, results) => {
            connection.release();
            if (err) {
              return res.json({
                error: "Internal Server Error in adding stock",
              });
            } else {
              return res.json({ success: "Stock successfully added" });
            }
          }
        );
      }
    });
  });
};

const addCustomer = (username, email, password, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error 1" });
      } else {
        const sql =
          "INSERT INTO buyers ( username, email, password ) VALUES (?,?,?)";
        connection.query(sql, [username, email, password], (err, results) => {
          connection.release();
          if (err) {
            return res.json({
              error: "Internal Server Error in adding customer",
            });
          } else {
            return res.json({ success: "Customer successfully added" });
          }
        });
      }
    });
  });
};

const getSellerListings = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT id,productName, supplierName, supplierEmail,stockAmount,price,image FROM products";
        connection.query(sql, (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getStockDetails = (stockId, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM stock WHERE stockId=? ";
        connection.query(sql, [stockId], (err, results) => {
          // connection.release();
          if (err) {
            reject();
          } else {
            console.log(results[0]);
            resolve(results[0]);
          }
        });
      }
    });
  });
};

const getStock = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM stock ORDER BY Date DESC";
        connection.query(sql, (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getCustomers = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM buyers ";
        connection.query(sql, (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getSalesData = (from, to, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT SUM(total) AS total, COUNT(orderID) AS orderCount, datetime FROM orders WHERE CAST(datetime AS DATE) BETWEEN ? AND ? GROUP BY CAST(datetime AS DATE) ";
        connection.query(sql, [from, to], (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getPendingOrders = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          // "SELECT order_items.*, products.id, products.productName, products.image, orders.datetime FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.id WHERE order_items.status = ? ORDER BY order_items.orderItemID";
        "SELECT order_items.*, products.id, products.productName, products.image, orders.datetime, order_address.line1, order_address.line2, order_address.city, order_address.postalCode FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN order_address ON orders.orderID = order_address.orderID INNER JOIN products ON order_items.productID = products.id WHERE order_items.status = ? ORDER BY order_items.orderItemID;"
          connection.query(sql, ["Pending"], (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

//order_items.status = Delivered
const getShippedOrders = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT order_items.*, products.id, products.productName, products.image, orders.datetime, order_address.line1, order_address.line2, order_address.city, order_address.postalCode FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN order_address ON orders.orderID = order_address.orderID INNER JOIN products ON order_items.productID = products.id WHERE order_items.status = ? ORDER BY order_items.orderItemID;";
        connection.query(sql, ["Delivered"], (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getCompletedOrders = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT order_items.*, products.id, reviews.productRating, products.productName, products.image, orders.datetime FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.id INNER JOIN reviews ON reviews.orderItemID = order_items.orderItemID WHERE order_items.status = ? ORDER BY order_items.orderItemID";
        connection.query(sql, ["Completed"], (err, results) => {
          connection.release();
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const updateShippingStatus = (orderItemID, res) => {
  const now = new Date();

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "UPDATE order_items SET status =?, DeliveredDate=? WHERE orderItemID = ?";
        connection.query(
          sql,
          ["Delivered", now, orderItemID],
          (err, results) => {
            connection.release();
            if (err) {
              reject();
            } else {
              console.log("");
              console.log(results);
              resolve();
            }
          }
        );
      }
    });
  });
};

const updateProduct = (
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
) => {
  const now = new Date();
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "UPDATE products SET productName=?, supplierName=?, supplierContactNo=?, supplierEmail =?, stockAmount=?, price=?, discount=?, unitWeight=?, category=?, image=? WHERE id=?";
        connection.query(
          sql,
          [
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
          ],
          (err, results) => {
            connection.release();
            if (err) {
              // return res.json({ error: "Internal Server Error 2" });
              reject();
            } else {
              // return res.json({ success: "product successfully updated" });
              resolve(results);
            }
          }
        );
      }
    });
  });
};

const updateStock = (
  productId,
  productName,
  Amount,
  stockId,
  res
) => {
  const now = new Date();
  return new Promise((resolve, reject) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    } else {
      const sql =
        "UPDATE stock SET productId=?, productName=?, Amount=? WHERE stockId=?";
      connection.query(
        sql,
        [
          productId,
          productName,
          Amount,
          stockId,
        ],
        (err, results) => {
          connection.release();
          if (err) {
            // return res.json({ error: "Internal Server Error 2" });
            reject();
          } else {
            // return res.json({ success: "product successfully updated" });
            resolve(results);

          }
        }
      );
    }
  });
});
};

module.exports = {
  isSellerExists,
  addProduct,
  getSellerListings,
  addStock,
  addCustomer,
  getSalesData,
  getStock,
  getCustomers,
  getPendingOrders,
  updateShippingStatus,
  getShippedOrders,
  getCompletedOrders,
  updateProduct,
  updateStock,
  getStockDetails,
};
