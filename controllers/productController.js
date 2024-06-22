import Product from "../models/productModel.js"
import factory from "./handlerFactory.js"

const getAllProducts = factory.getAll(Product)

const getProduct = factory.getOne(Product, { path: 'suppliers' })

const createProduct = factory.createOne(Product)

const updateProduct = factory.updateOne(Product)

const deleteProduct = factory.deleteOne(Product)

export default {
    getAllProducts, getProduct, createProduct, updateProduct, deleteProduct
}