const db = require("../config/database");

const getProducts = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM products";
        connection.query(sql, [], (err, results) => {
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

const getPotMateProducts = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM products WHERE category = '1'";
        connection.query(sql, [], (err, results) => {
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

const getCategorizedProducts = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM products WHERE category = '2'";
        connection.query(sql, [], (err, results) => {
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

const getGardenToolsProducts = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM products WHERE category = '4'";
        connection.query(sql, [], (err, results) => {
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

const getPlantProducts = (res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM products WHERE category = '3'";
        connection.query(sql, [], (err, results) => {
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

const getProductDetail = (productID, res) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      } else {
        const sql = "SELECT * FROM products Where id=? ";
        connection.query(sql, [productID], (err, results) => {
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

module.exports = {
  getProducts,
  getProductDetail,
  getPotMateProducts,
  getCategorizedProducts,
  getGardenToolsProducts,
  getPlantProducts,
};
