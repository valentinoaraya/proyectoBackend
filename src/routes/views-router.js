import { json, Router } from "express";
import { manager } from "../app.js";

const viewsRouter = Router()
viewsRouter.use(json())

viewsRouter.get("/", async (req,res)=>{
    const products = await manager.getProducts()
    res.render("home", {products})
})

viewsRouter.get("/real-time-products", async (req,res)=>{
    const products = await manager.getProducts()
    res.render("real-time-products", {products})             
})

viewsRouter.get("/chat", async (req,res)=>{
    res.render("chat")
})

export default viewsRouter