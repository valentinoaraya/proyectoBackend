const fs = require("fs")

class ProductManager{
    
    #path = ""
    #nextID = 0

    constructor(path){
        this.#path = path
    }
    
    async getProducts(){
        try{
            const products = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(products)
        }catch{
            return []
        }
    }
    
    async addProduct(title, description, price, thumbail, code, stock){

        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock,
            id : this.#nextID
        }

        let products = await this.getProducts()
        let verificar = Object.values(product)
        let sameCode = products.find( prod => prod.code === code)

        if (verificar.includes(undefined)){
            throw new Error(`El producto ${product.title} NO ha sido cargado, debe completar todos los datos.`)
        }
        if(sameCode){
            throw new Error(`El producto ${product.title} NO ha sido cargado ya que la propiedad "code" está repetida, ${sameCode.title} tiene el mismo valor.`)
        }
    
        products = [...products, product]
        console.log(`${product.title} cargado correctamente.`)
        await fs.promises.writeFile(this.#path, JSON.stringify(products))
        this.#nextID++
    }

    //Para modificar un producto debemos pasar como primer parámetro el ID, y como segundo parámetro un objeto con las propiedades modificadas.
    async modifyProduct(id, propModify){
        let products = await this.getProducts()
        let productModify = products.find(i => i.id === id)

        if (!productModify){
            throw new Error('No se encontró ningún producto con ese ID.')
        }

        // Hago una verificación para que no se pueda cambiar la prop ID de ningún producto
        if (Object.keys(propModify).includes('id')){
            throw new Error('No es posible modificar el ID de un producto.')
        }

        // Hago una verificación para que no se pueda cambiar la propiedad 'code' por una que ya exista.
        if (Object.keys(propModify).includes('code')){
            let sameCode = products.some(i => i.code === propModify.code)
            if (sameCode){
                throw new Error('No es posible modificar la propiedad code por una que ya exista.')
            }
        }
        
        productModify = {...productModify, ...propModify}
        let newArray = products.filter( prods => prods.id !== id)
        newArray = [...newArray, productModify]
        await fs.promises.writeFile(this.#path, JSON.stringify(newArray))
        console.log('Modificación realizada con éxito.')
    }

    async getProductById(id){
        let products = await this.getProducts()
        let element = products.find(elem => elem.id === id)
        if (element){
            return element
        } else {
            return "Not Found. No existe ningún producto con ese ID."
        }
    }

    async deleteElement(id){
        let products = await this.getProducts()
        let newArray = products.filter(prods => prods.id !== id)
        await fs.promises.writeFile(this.#path, JSON.stringify(newArray))
        console.log('Producto eliminado con éxito')
    }
}


async function main(){
    const manager1 = new ProductManager('./products.json')
    //await manager1.addProduct('producto1','descripcion producto1',1234,'thumbail','code1234', 43)
    //await manager1.addProduct('producto2', 'descripcion producto2', 1234, 'thumbail', 'code1234565', 23)
    //await manager1.addProduct('producto3', 'descripcion producto3', 1234, 'thumbail', 'code12342565', 23)
    //await manager1.modifyProduct(2, {description: 'Descripción nueva para id 2', title: 'billetera de beatles'})
    //await manager1.deleteElement(2)
}

main()