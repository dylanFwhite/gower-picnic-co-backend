import fs from "fs-extra"
import catchAsync from "../utils/catchAsync.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const products = fs.readJsonSync(`${__dirname}/../dev-data/products.json`)

const getProducts = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: products
    })
})

export default {
    getProducts
}