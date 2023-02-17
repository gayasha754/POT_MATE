const rootModel = require("../model/rootModel");

const getProducts = async (req, res) => {
  try {
    await rootModel.getProducts().then((results) => {
      const products = results;
      res.json({ products: products });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

const getPotMateProducts = async (req, res) => {
  try {
    await rootModel.getPotMateProducts().then((results) => {
      const products = results;
      res.json({ products: products });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

const getCategorizedProducts = async (req, res) => {
  try {
    await rootModel.getCategorizedProducts().then((results) => {
      const products = results;
      res.json({ products: products });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

const getGardenToolsProducts = async (req, res) => {
  try {
    await rootModel.getGardenToolsProducts().then((results) => {
      const products = results;
      res.json({ products: products });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

const getPlantProducts = async (req, res) => {
  try {
    await rootModel.getPlantProducts().then((results) => {
      const products = results;
      res.json({ products: products });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

const getProductDetail = async (req, res) => {
  const productID = req.params.id;

  try {
    await rootModel.getProductDetail(productID, res).then((results) => {
      console.log(results);

      const product = results;
      res.json({ products: product });
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  getPotMateProducts,
  getCategorizedProducts,
  getGardenToolsProducts,
  getPlantProducts,
};
