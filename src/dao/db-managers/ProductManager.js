import producModel from "../models/product.model.js";

export default class ProductManager {
    constructor() {
        "Working with DB system."
    }

    titleOfProducts(str){
        const words = str.split("-")
        const wordsToUpperCase = words.map(w => w[0].toUpperCase() + w.slice(1))
        const newTitle = wordsToUpperCase.join(" ")
        return newTitle
    }

    async getProducts(page, limit, sort, query) {
        try {
            let newQuery
            if (query.title && query.stock){
                let newTitle = this.titleOfProducts(query.title)
                newQuery = {
                    title: newTitle,
                    stock: query.stock
                }
            } else if (query.title && !query.stock){
                let newTitle = this.titleOfProducts(query.title)
                newQuery = {title: newTitle}
            } else if (!query.title && query.stock){
                newQuery = {stock: query.stock}
            } else {
                newQuery = {}
            }

            let newSort
            if (sort === "asc") {
                sort = { price: "asc" }
                newSort = "asc"
            } else if (sort === "desc") {
                sort = { price: "desc" }
                newSort = "desc"
            }

            const products = await producModel.paginate(
                newQuery,
                {
                    limit: limit ?? 10,
                    lean: true,
                    page: page ?? 1,
                    sort: sort ?? "null"
                }
            )
            if (sort) products.sort = newSort
            return products
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async addProduct(title, description, price, thumbail, code, stock, status, category) {

        code = Math.floor(Math.random() * 100000000000)

        try {
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
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getProductById(id) {
        try {
            const product = await producModel.findById(id)
            return product
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteProduct(id) {
        try {
            const result = await producModel.deleteOne({ _id: id })
            return result
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateProduct(id, propModify) {
        try {
            const result = await producModel.findOneAndUpdate({ _id: id }, propModify, { new: true })
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}