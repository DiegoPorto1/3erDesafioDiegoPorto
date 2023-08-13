
import { promises as fs} from 'fs'
const path = './productos.json'


class ProductManager {
    constructor() {
        this.products = []
    }
    getProducts = async () => {
        const prods = JSON.parse ( await fs.readFile (path, 'utf-8'))
        console.log(prods)
    }
    addProduct = async (product) => {
        const prods = JSON.parse ( await fs.readFile (path, 'utf-8'))
        const producto = prods.find (prod => prod.id === product.id)
    
        if (producto){
            console.log("Producto ya agregado")
        }
        else {
            prods.push(product)
            await fs.writeFile (path ,JSON.stringify(prods))
        }
      
    }
    getProductById(id) {
        const prod = this.products.find ( prod => prod.id === id)
        if (prod) {
            console.log (prod)
        } else {
            console.log ("Producto no encontrado")
        }
    }
    deleteProduct = async (id) => {
        const prods = JSON.parse ( await fs.readFile (path, 'utf-8'))
        const producto = prods.find (prod => prod.id === id)
    
        if (producto){
            await fs.writeFile (path ,JSON.stringify(prods.filter(prod => prod.id != id)))
    
        } else {
            console.log ("producto no encontrado")
        }
    }
    updateProduct = async (id, product)=> {
        const prods = JSON.parse ( await fs.readFile (path, 'utf-8'))
        const indice = prods.findIndex (prod => prod.id === id)
    
        if (indice != -1){
           prods[indice].title= product.title 
           prods[indice].description= product.description
           prods[indice].price= product.price
           prods[indice].code= product.code
           prods[indice].stock= product.stock
           prods[indice].thumbnail= product.thumbnail
            
           await fs.writeFile (path ,JSON.stringify(prods))
         } 
         else {
        console.log("producto no encontrado")
    }
    
    }
    
    
}


class Product {
    constructor (title, description, price, code , stock, thumbnail){
    this.title = title
    this.description = description
    this.price = price
    this.code = code
    this.stock = stock
    this.thumbnail = thumbnail  
    this.id = Product.incrementarId()  
    }
    static incrementarId(){

        if(this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
           
    }

} 





export default  ProductManager;


