import fs from "fs" 

class CartManager {
    #path = ""

    constructor(path){
        this.#path = path
    }

    async getCarts(){
        try{
            let carts = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(carts)
        }catch(err){
            return []
        }
    }

    async getIDs(){
        let carts = await this.getCarts()
        const ids = carts.map(c => c.id)
        let mayorID = Math.max(...ids)
        if (mayorID === -Infinity) {
            return 0
        } else {
            return ++mayorID
        }
    }

    async addCart(){
        try{
            let carts = await this.getCarts()
            let mayorID = await this.getIDs()
            const cart = {
                id: mayorID,
                products: []
            }

            carts = [...carts, cart]

            await fs.promises.writeFile(this.#path, JSON.stringify(carts))
        }catch(err){
            throw new Error(err)
        }
    }

    async getCartProducts(id){
        let carts = await this.getCarts()
        let cart = carts.find( c => c.id === id)
        if (cart){
            return cart
        } else {
            throw new Error("No se encontró carrito con ese ID.")
        }
    }

    async addProductToCart(prod, cartID){
        try{
            let carts = await this.getCarts()
            let cart = carts.find( c => c.id === cartID)

            //Verifico si el producto existe en el carrito
            let prodInCart = cart.products.find( p => p.id === prod.id)

            if (prodInCart){
                prodInCart.quantity += 1
                let filterProducts = cart.products.filter( p => p.id !== prodInCart.id) 
                filterProducts = [
                    ...filterProducts,
                    prodInCart
                ]
                cart.products = filterProducts
                let newCarts = carts.filter( c => c.id !== cartID)
                newCarts = [
                    ...newCarts,
                    cart
                ]
                await fs.promises.writeFile(this.#path, JSON.stringify(newCarts))
            } else {
                cart.products = [
                    ...cart.products,
                    {
                        id: prod.id,
                        quantity: 1
                    }
                ]
                let newCarts = carts.filter( c => c.id !== cartID)
                newCarts = [
                    ...newCarts,
                    cart
                ]
                await fs.promises.writeFile(this.#path, JSON.stringify(newCarts))

            }
            
        }catch(err){
            throw new Error(err)
        }
    }
}

export default CartManager