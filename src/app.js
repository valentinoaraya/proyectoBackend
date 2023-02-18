import ProductManager from "./ProductManager.js";
import express from "express"

const manager = new ProductManager("./products.json")
// await manager.addProduct("Silla Gamer", "Silla gamer muy cómoda de alta calidad.", 43000, "thumbail", "code1", 10)
// await manager.addProduct("Teclado Redragon", "Teclado Redragron 60% ideal para el gaming.", 10000, "thumbail", "code2", 20)
// await manager.addProduct("Procesador Ryzen 5 3500u", "Procesador para computadora.", 69000, "thumbail", "code3", 30)
// await manager.addProduct("Mouse gamer inaámbrico", "Mouse gamer con rgb.", 19000, "thumbail", "code4", 40)

const app = express()

app.get("/products", async (req, res)=>{
    
    try{
        const products = await manager.getProducts()
        const {limit} = req.query
    
        if (limit){
            products.length = limit
            return res.send(products)
        }
    
        res.send(products)
    } catch (err){
        res.status(404).send(`${err}`)
    }
})

app.get("/products/:pid", async (req, res)=>{

    try{
        const {pid} = req.params
        const product = await manager.getProductById(parseInt(pid))
        res.send(product)
    } catch(err) {
        res.status(404).send(`${err}`)
    }
})

app.listen(8080, ()=>{
    console.log("Server listening on port 8080.")
})