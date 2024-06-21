import fs from "fs-extra"
import catchAsync from "../utils/catchAsync.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const customers = fs.readJsonSync(`${__dirname}/../dev-data/customers.json`)

const getCustomers = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'success',
        results: customers.length,
        data: customers
    })
})

export default {
    getCustomers
}