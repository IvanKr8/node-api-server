const express = require("express");
const router = express.Router();
const service = require("../service/app-service");

router.get("/products", async (req, res) => {
    try {
        const { search, sort } = req.query;
        
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } }
            ];
        }

        let sortOption = {};
        if (sort === 'exp') {
            sortOption = { price: 1 };
        } else if (sort === 'dec') {
            sortOption = { price: -1 };
        }

        const products = await service.getProducts(filter, sortOption);
        res.status(200).send(products);
    } catch (error) {
        responseError(res, 500, { error: 'Internal server error' });
    }
});

router.get("/product/:productId", async (req, res) => {
    const productId = req.params.productId;

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

router.put("/product/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
        const updatedProduct = await service.updateProduct(productId, req.body);
        res.status(200).send(updatedProduct);
    } catch (error) {
        responseError(res, 400, { error: 'Failed to update product' });
    }
});

router.delete("/product/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
        await service.deleteProduct(productId);
        sendOk(res, 'Product deleted successfully');
    } catch (error) {
        responseError(res, 400, { error: 'Failed to delete product' });
    }
});

async function sendOk(res, message = 'Ok') {
    res.status(200).send({ message });
};

async function responseError(res, status, error) {
    res.status(status).json(error);
};

module.exports = router;