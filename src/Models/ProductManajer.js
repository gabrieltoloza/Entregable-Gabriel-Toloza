import fs from 'fs';
import path from 'path';
import { idController } from '../../utils.js';
import { config } from '../../config.js';



export class ProductManager {

    static file = `${config.DIRNAME}/src/db/products.json`

    static async init() {
        try{
            const initial = await fs.promises.access(this.file)
            console.log("Ya existe el archivo de productos")
        } catch (error) {
            console.log("El archivo no existe, se creo uno.")
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
        }
    }


    static async #readJsonProducts() {
        const result = await fs.promises.readFile(this.file, 'utf-8')

        return JSON.parse(result)
    }



    static async getProducts() {
        return await this.#readJsonProducts()
    }



    static async getProductById(id){
        try {
            const products = await this.getProducts()
            const product = products.find(obj => obj["id"] === Number(id))
            if(!product) throw new Error("El producto no se encuentra en los registros.")

            return product

        } catch (error) {
            return error
        }
    }


    
    static async addProduct(product) {
        try {

            const result = await this.getProducts()

            if(result.some(obj => obj['code'] === product.code.toLowerCase())) throw new Error("El producto que quiere ingresar ya existe en la base de datos")
            
        
            let newId = idController(result)
            let newAdd = { id: newId, ...product , status: true }
            
            result.push(newAdd)

            await fs.promises.writeFile(this.file, JSON.stringify(result, null, 4))
            
            return await this.getProductById(newId)

        } catch (error) {
            return error
        }
    }


    static async updateProduct(product) {
        try {
            const result = await this.getProducts()
            
            const productIndex = result.findIndex(obj => obj["id"] === product.id)
            
            if(productIndex < 0) throw new Error("Producto no encontrado!!")
            
            const productFound = result[productIndex]

            for(let key in product) {
                if(key !== 'id')
                    productFound[key] = product[key]
            }

            result[productIndex] = productFound
            await fs.promises.writeFile(this.file, JSON.stringify(result, null, 4))
            return await this.getProductById(product.id)

        } catch(error) {
            return error
        }
    }


    static async deleteProduct(id) {
        try {
            const result = await this.getProducts()
            const productsFiltered = result.filter(obj => obj.id !== Number(id))
            
            if ( result.length === productsFiltered.length ) throw new Error("Ocurrio un error al borrar el producto")
            
            await fs.promises.writeFile(this.file, JSON.stringify(productsFiltered, null, 4))
            
            return { message: "Producto borrado del registro", deletedProduct: id }

        } catch (error) {
            return error
        }

    }

};




