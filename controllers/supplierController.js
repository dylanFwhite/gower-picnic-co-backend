import fs from "fs-extra"
import catchAsync from "../utils/catchAsync.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const suppliers = fs.readJsonSync(`${__dirname}/../dev-data/suppliers.json`)

const getSuppliers = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'success',
        results: suppliers.length,
        data: suppliers
    })
})

export default {
    getSuppliers
}