const express = require("express");
const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        res.status(200).json("{message: Hello!}")
    } catch (error) {
        responseError(res, 500, { error: 'Internal server error' })
    }
});

async function responseError(res, status, error) {
    res.status(status).json(error);
}

module.exports = router;