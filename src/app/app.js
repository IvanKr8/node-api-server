const express = require("express");
const router = express.Router();
const service = require("../service/app-service");

router.get("/products", async (req, res) => {
    try {
        const products = await service.getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        responseError(res, 500, { error: 'Internal server error' })
    }
});

router.get("/product/:productId", async (req, res) => {
    const productId = req.params.productId;
    console.log(productId);
    try {
        const product = await service.getProductById(productId);
        if (!product) {
            return responseError(res, 404, { error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        responseError(res, 500, { error: 'Internal server error' });
    }
});

router.post("/product", async (req, res) => {
    try {
      await service.createNewProduct(req.body);
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