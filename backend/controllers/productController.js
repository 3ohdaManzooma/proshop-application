//this will automaticaly handle the exception when i try to retreive data from database 
import AsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc Fetch all products 
//@route GET /api/products
//@access Public
const findProducts=AsyncHandler(async(req,res)=>{
    //retrun all the products in the db
    const products = await Product.find({})
    res.json(products)
})
 //@desc Fetch single products 
//@route GET /api/products/:id
//@access Public
const findProductByID=AsyncHandler(async(req,res)=>{
    
    const product = await Product.findById(req.params.id)
    if (product) {

        res.json(product)
    } else {
        res.status(404).json({ message: 'Product no found ' })
    }
})
export {findProducts , findProductByID}