const express = require("express");
const router = express.Router();
const path = require("path");
const fileUpload = require("express-fileupload");

router
  .route("/products")
  .post(fileUpload({ createParentPath: true }), (req, res) => {
    const files = req.files;

    let fileNames = [];

    Object.keys(files).forEach((key) => {
      const filepath = path.join(
        __dirname,
        "..",
        "uploads",
        "products",
        files[key].name
      );
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ error: err });
      });

      fileNames.push(files[key].name);
    });

    return res.json({
      files: fileNames,
      success: "Images has been logged!",
    });
  });

module.exports = router;
