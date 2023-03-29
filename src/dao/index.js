import FileProductManager from "./file-managers/ProductManager.js"
import FileCartManager from "./file-managers/CartManager.js"
import DbProductManager from "./db-managers/ProductManager.js"
import DbCartManager from "./db-managers/CartManager.js"

const config = {
    persistenceType: "db"
}

let ProductManager, CartManager

if (config.persistenceType === "db"){
    ProductManager = DbProductManager
    CartManager = DbCartManager
} else if (config.persistenceType === "fs"){
    ProductManager = FileProductManager
    CartManager = FileCartManager
} else {
    throw new Error("Unkown persistence type.")
}

export {ProductManager, CartManager}