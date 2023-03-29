import cartModel from "../models/cart.model.js"

export default class CartManager{
    constructor(){
        console.log("Working with DB system.")
    }

    async getCarts(){
        try{
            const carts = await cartModel.find().lean()
            return carts
        }catch(err){
            console.log(err.message)
            return []
        }
    }

    async addCart(){
        try{
            const cart = {
                products: []
            }
            const result = await cartModel.create(cart)
            return result
        }catch(err){
            throw new Error(err)
        }
    }

    async getCartProducts(id){
        try{
            const cart = await cartModel.findById(id)
            return cart
        }catch(err){
            throw new Error(err)
        }
    }



    async addProductToCart(prod, cartID){
        try{
            const cart = await cartModel.findById(cartID)
            const product = cart.products.find(elem => elem.title === prod.title)
            if(product){
                product.quantity += 1
                await cart.save()
            } else {
                cart.products.push({product: prod._id, title: prod.title})
                await cart.save()
            }
            
            console.log(cart)

    
            // No pude hacerlo con populate

            // const cart = await cartModel.findById(cartID)
            // cart.products.push({product: productID})
            // await cart.save()
            // await cart.populate("products.product")
            // console.log(JSON.stringify(cart, null, "\t"))

        }catch(err){
            throw new Error(err)
        }
    }

    async deleteProductInCart(cartID, productID){
        try{
            const cart = await cartModel.findById(cartID)
            const product = cart.products.find(elem => elem.product === productID)

            if(!product){
                throw new Error("No existe producto con ese ID")
            } 

            if (product.quantity > 1){
                product.quantity -= 1
                cart.save()
            } else {
                let newCartProducts = cart.products.filter((p)=> p.product !== productID)
                cart.products = newCartProducts
                cart.save()                
            }
            
            console.log(cart)

        }catch(err){
            throw new Error(err)
        }
    }
}