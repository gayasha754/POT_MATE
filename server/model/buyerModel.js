const { query } = require("../config/database");
const db = require("../config/database");

const createBuyer = (data, res) => {
  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ error: "Internal Server Error!" });

    const username = data.username;
    const email = data.email;
    const password = data.password;

    const sql =
      "INSERT INTO buyers (username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [username, email, password], (error, results) => {
      connection.release();

      if (error) {
        res.json({ error: "Internal Server Error!" });
      } else {
        res.status(200).json({ success: true, results: results });
      }
    });
  });
};

const findBuyer = (username) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;

      const sql = "SELECT * FROM buyers WHERE username=?";
      connection.query(sql, username, (error, results) => {
        if (error) throw error;

        if (results.length === 0 && !error) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });
};

const isBuyerExists = (username) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;

      const sql = "SELECT * FROM buyers WHERE username=?";
      connection.query(sql, username, (error, results) => {
        if (error) throw error;
        console.log(results + "results from buyer exist");
        if (results.length === 1 && !error) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
    });
  });
};

const createOrder = (buyerID, subTotal, total) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.log(err);
      } else {
        const sql =
          "INSERT INTO orders (buyerID, subTotal, total) VALUES (?, ?, ?)";
        connection.query(sql, [buyerID, subTotal, total], (err, results) => {
          connection.release();
          if (err) {
            console.log(err);
            reject();
          } else {
            console.log(results);
            db.getConnection((err, connection) => {
              if (err) {
                console.log(err);
              } else {
                const sql =
                  "SELECT * FROM orders ORDER BY orderID DESC LIMIT 1";
                connection.query(sql, [], (err, results) => {
                  connection.release();
                  if (err) {
                    reject();
                  } else {
                    console.log(results);
                    resolve(results[0]);
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};

const addOrderAddress = (orderID, address) => {
  const { city, country, line1, line2, postal_code } = address;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.log(err);
      } else {
        const sql =
          "INSERT INTO order_address (orderID, line1, line2, city, postalCode) VALUES (?, ? , ? , ?, ?)";
        connection.query(
          sql,
          [orderID, line1, line2, city, country, postal_code],
          (err, results) => {
            connection.release();
            if (err) {
              console.log(err);
              reject();
            } else {
              console.log(results);
              resolve();
            }
          }
        );
      }
    });
  });
};

const placeOrder = (orderID, cart) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      const sql =
        "INSERT INTO order_items (orderID,productID, orderQuantity, orderPrice, status) VALUES (?, ?, ? ,? , ? ,? )";
      connection.query(
        sql,
        [
          orderID,
          cart.productID,
          cart.sellerID,
          cart.quantity,
          cart.price,
          "Pending",
        ],
        (err, results) => {
          connection.release();
          if (err) {
            console.log("error");
          }
        }
      );
    }
  });
};

const getOrders = (buyerID, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT order_items.*, products.productName, products.image, orders.datetime FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.id WHERE orders.buyerID = ? AND order_items.status = ? OR order_items.status = ? ORDER BY order_items.orderItemID DESC";
        connection.query(
          sql,
          [buyerID, "Pending", "Delivered"],
          (error, results) => {
            connection.release();
            if (error) {
              reject();
            } else {
              resolve(results);
            }
          }
        );
      }
    });
  });
};

const getOrdersTop = (buyerID, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT order_items.*, products.title, products.shippingTime, product_images.image1, orders.datetime FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.productID INNER JOIN product_images ON products.productID = product_images.productID WHERE orders.buyerID = ? AND order_items.status = ? OR order_items.status = ? ORDER BY order_items.orderItemID DESC LIMIT 3";
        connection.query(
          sql,
          [buyerID, "Pending", "Shipped"],
          (error, results) => {
            connection.release();
            if (error) {
              reject();
            } else {
              resolve(results);
            }
          }
        );
      }
    });
  });
};

const ratingItem = (requestID, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
      } else {
        const sql =
          "SELECT products.id, products.productName, products.image FROM order_items INNER JOIN products on order_items.productID = products.id WHERE order_items.orderItemID=? ";
        connection.query(sql, [requestID], (error, results) => {
          connection.release();
          if (error) {
            reject();
          } else {
            resolve(results[0]);
          }
        });
      }
    });
  });
};

const submitReview = (data, res) => {
  const { orderItemID, productID, storeRating, productRating, review } = data;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "INSERT INTO reviews (orderItemID, storeRating, productID, productRating, review) VALUES (?,?,?,?,?)";
        connection.query(
          sql,
          [orderItemID, storeRating, productID, productRating, review],
          (error, results) => {
            connection.release();
            if (error) {
              reject();
            } else {
              resolve(results);
            }
          }
        );
      }
    });
  });
};

const getProductRating = (data, res) => {
  const { productID } = data;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json("Internal Server Error");
      } else {
        const sql =
          "SELECT SUM(productRating) AS total, COUNT(productID) AS reviewCount FROM reviews WHERE productID = ?";
        connection.query(sql, [productID], (error, results) => {
          if (error) {
            console.log("error in get");
            reject();
          } else {
            console.log(results);
            resolve(results[0]);
          }
        });
      }
    });
  });
};

const updateProductRating = (data, averageRating, res) => {
  const { productID } = data;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "UPDATE products SET averageRating = ? WHERE id = ?";
        connection.query(sql, [averageRating, productID], (error, results) => {
          if (error) {
            console.log("Error In UpdateProductRating");
            reject();
          } else {
            console.log("Update success!");
            resolve();
          }
        });
      }
    });
  });
};

const updateOrderItemStatus = (data, res) => {
  const { orderItemID } = data;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "UPDATE order_items SET status =? WHERE orderItemID = ?";
        connection.query(sql, ["Completed", orderItemID], (error, results) => {
          if (error) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getCompletedOrders = (buyerID, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT order_items.*, products.id, reviews.productRating, products.productName, products.image, orders.datetime FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.id INNER JOIN reviews ON reviews.orderItemID = order_items.orderItemID WHERE orders.buyerID = ? AND order_items.status = ? ORDER BY order_items.orderItemID";
        connection.query(sql, [buyerID, "Completed"], (error, results) => {
          connection.release();
          if (error) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getCompletedOrdersTop = (buyerID, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql =
          "SELECT order_items.*, products.id, reviews.productRating, products.productName, products.image, orders.datetime FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.id INNER JOIN reviews ON reviews.orderItemID = order_items.orderItemID WHERE orders.buyerID = ? AND order_items.status = ? ORDER BY order_items.orderItemID LIMIT 3";
        connection.query(sql, [buyerID, "Completed"], (error, results) => {
          connection.release();
          if (error) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getUserDetails = (buyerId, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT username, email, password FROM buyers WHERE id=? ";

        connection.query(sql, [buyerId], (error, results) => {
          connection.release();
          if (error) {
            reject();
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

module.exports = {
  createBuyer,
  findBuyer,
  isBuyerExists,
  createOrder,
  addOrderAddress,
  placeOrder,
  getOrders,
  ratingItem,
  submitReview,
  updateOrderItemStatus,
  getCompletedOrders,
  getProductRating,
  updateProductRating,
  getOrdersTop,
  getCompletedOrdersTop,
  getUserDetails,
};
