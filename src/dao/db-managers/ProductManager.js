import producModel from "../models/product.model.js";

export default class ProductManager{
    constructor(){
        "Working with DB system."
    }

    async getProducts(){
        try{
            const products = await producModel.find().lean()
            return products
        }catch(err){
            console.log(err)
            return []
        }
    }

    async addProduct(title, description, price, thumbail, code, stock, status, category){
        try{
            const product = {
                title,
                description,
                price,
                thumbail,
                code,
                stock,
                status,
                category
            }
            const result = await producModel.create(product)
            return result
        }catch(err){
            throw new Error(err.message)
        }     
    }

    async getProductById(id){
        try{
            const product = await producModel.findById(id)
            return product
        }catch(err){
            throw new Error(err)
        }
    }

    async deleteProduct(id){
        try{
            const result = await producModel.deleteOne({_id: id})
            return result
        }catch(err){
            throw new Error(err)
        }
    }

    async updateProduct(id, propModify){
        try{
            const result = await producModel.findOneAndUpdate({_id: id}, propModify, {new: true})
            return result
        }catch(err){
            throw new Error(err)
        }
    }
}