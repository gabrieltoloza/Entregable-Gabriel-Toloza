
import fs from 'fs'
import { idController } from '../utils.js'
import { ProductManager } from './ProductManajer.js'




export class CartManager {

    static file = './db/carts.json'

    static async init(){
        try {
            const iniciar = await fs.promises.access(this.file)
            console.log("El archivo de CartProducts ya existe")
        } catch (error) {
            console.log(`El archivo no existe, se creo ${this.file}`)
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
        }
    }

    // Se necesita visualizar los objetos anidados:
    static async #readJsonCarts() {
        const result = await fs.promises.readFile(this.file, 'utf-8')
        return result
    }

    
    static async getCarts(){
        return await this.#readJsonCarts()
    }



    static async getCartByID(idParam) {
        try{
            // Obtenemos todas las ordenes 
            const orders = JSON.parse(await this.getCarts())
            // Encontramos la orden segun el parametro de entrada
            const order = orders.find(obj => obj["cartID"] === Number(idParam))
            // Si no se encuentra, lanzamos un error.
            if(!order) throw new Error('No se encontro el carrito con el id proporcionado')
            
            // Desestructuramos la orden para procesar la respuesta
            const {cartID, product } = order


            // Generamos el array de objetos con { id , quantity }
            let productList = product.map(obj => ({ id: obj["id"], quantity: obj["quantity"]}))

            // Generamos las promesas y la almacenamos en la variable
            let productPromises = productList.map( async (item) => {
                let productData = await ProductManager.getProductById(item.id);
                return {product: productData, quantity: item.quantity }
            })

            // Consumimos las promesas con Promises.all
            let partialResult = await Promise.all(productPromises)


            // Preparamos el resultado final
            const result = {
                cartID,
                product: partialResult
            }

            return result
            

        } catch(error) {
            return error
        }
    }
    


    static async createOrder(){

        try {
            const newId = idController(JSON.parse(await this.getCarts()))
            const carts = JSON.parse(await this.getCarts())

            if (newId instanceof Error) throw new Error("Error al crear el id autoincremental")
        
            const newOrder = {
                cartID: newId,
                product: []
            }
            
            carts.push(newOrder)
            await fs.promises.writeFile(this.file, JSON.stringify(carts, null, 4))
            return carts

        } catch (error) {
            return error
        }
    }



    static async addProductCarts(inputID, inputOrder){
        try {
            const parseID = Number(inputID);
            const { id, quantity } = inputOrder
            
            const orders = JSON.parse(await this.getCarts())
            const order = orders.find(obj => obj["cartID"] === parseID)
            const products = await ProductManager.getProducts()
            
            if(!order) throw new Error("No se encontro el carrito")
            if(!products) throw new Error("No se encontro el producto")

            const { cartID, product } = order;

            
            if(!products.find(obj => obj["id"] === Number(id))) throw new Error("No se encuentra el producto que quiere agregar")
            
            if(product.some(obj => obj["id"] === id)){
                product.forEach(obj => {
                    if(obj["id"] === id) {
                        obj["quantity"]+= quantity
                    }
                })
            } else {
                product.push(inputOrder)
            }

            await fs.promises.writeFile(this.file, JSON.stringify(orders, null, 4))
            console.log("Producto actualizado con exito")

            return await this.getCartByID(parseID)

        
        } catch(error){
            return error
        }
    }



}