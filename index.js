class ProductManager{

    products = []
    
    constructor(){}
    
    addProduct(title, description, price, thumbail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock,
            id : this.products.length
        }

        let verificar = Object.values(product)
        let sameCode = this.products.find( prod => prod.code === code)

        if (verificar.includes(undefined) === true){
            console.log(`El producto ${product.title} NO ha sido cargado, debe completar todos los datos.`)
        }else if(sameCode){
            console.log(`El producto ${product.title} NO ha sido cargado ya que la propiedad "code" está repetida, ${sameCode.title} tiene el mismo valor.`)
        }else{
            this.products.push(product)
            console.log(`${product.title} cargado correctamente.`)
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        let element = this.products.find(prod => prod.id === id)
        if (element){
            return element
        } else {
            return "Not Found"
        }
    }

}

const manager1 = new ProductManager()
const manager2 = new ProductManager()

// console.log("----- MANAGER 1 -----")
manager1.addProduct("Auriculares Redragon", "blablabla",12000,"ruta de imagen",0,  10)
manager1.addProduct("Teclado HyperX", "blablabla", 33000, "ruta de imagen", 1, 15)
manager1.addProduct("Mouse Logitech", "blablabal", 19000, "ruta de imagen",2,7)
console.log(manager1.getProductById(1))
// console.log(manager1.getProducts())

// console.log("----- MANAGER 2 -----")
// manager2.addProduct("Gorra Adidas", "una alfombra muy peluda", 13000, "any", 12, 80)
// manager2.addProduct("Remera Nike", "remera nike cómoda", 3000, "thumb", 52, 40)
// console.log(manager2.getProducts())

