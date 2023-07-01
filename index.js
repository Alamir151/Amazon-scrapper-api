const path = require("path");
const express = require("express")
const app = express();

require('dotenv').config();


const scrapeProducts = require("./service");
app.get("/scrape", async (req, res) => {
    const { search } = req.query;
    console.log(search);
    const products = await scrapeProducts(search);
    res.status(200).json({ result: products });
})


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));




