const express = require("express");
const router = express.Router();
const Product = require("../db/db_schemes");

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        responseError(res, 500, { error: 'Internal server error' })
    }
});

router.post("/product", async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      sendOk(res, 'Product created successfully');
    } catch (error) {
      responseError(res, 400, { error: 'Failed to create product' });
    }
  });

async function sendOk(res, message = 'Ok') {
    res.status(200).send({ message });
}

async function responseError(res, status, error) {
    res.status(status).json(error);
}

module.exports = router;