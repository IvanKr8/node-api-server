require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const router = require("./app/app");
app.use("/api/", router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
