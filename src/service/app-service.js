const Product = require("../db/db_schemes");

async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error("Error retrieving products:", error);
        throw new Error("Failed to retrieve products");
    }
}

async function getProductById(productId) {
    try {
        const product = await Product.findOne({ id: productId });

        return product;
    } catch (error) {
        throw new Error(`Failed to get product by id: ${error.message}`);
    }
}

async function createNewProduct(reqBody) {
    try {
        const product = new Product(reqBody);
        await product.save();
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
    }
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getProductById
};