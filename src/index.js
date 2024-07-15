require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const db_connection = require("./db/db_conn");

const router = require("./app/app");
app.use("/api/", router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
