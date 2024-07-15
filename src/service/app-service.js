const Product = require("../db/db_schemes");

async function getProducts(filter, sortOption) {
    try {
        let query = Product.find(filter);

        if (sortOption) {
            query = query.sort(sortOption);
        }

        const products = await query.exec();
        return products;
    } catch (error) {
        throw new Error(`Failed to get products: ${error.message}`);
    }
};

async function getProductById(productId) {
    try {
        const product = await Product.findOne({ id: productId });
        return product;
    } catch (error) {
        throw new Error(`Failed to get product by id: ${error.message}`);
    }
};

async function createNewProduct(reqBody) {
    try {
        const product = new Product(reqBody);
        await product.save();
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
    }
};

async function deleteProduct(productId) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        return deletedProduct;
    } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
    }
};

async function updateProduct(productId, newData) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, newData, { new: true });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
    }
};

module.exports = {
    getProducts,
    createNewProduct,
    getProductById,
    deleteProduct,
    updateProduct
};