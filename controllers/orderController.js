import fs from "fs-extra"
import catchAsync from "../utils/catchAsync.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const orders = fs.readJsonSync(`${__dirname}/../dev-data/orders.json`)

const getOrders = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'success',
        results: orders.length,
        data: orders
    })
})

export default {
    getOrders
}