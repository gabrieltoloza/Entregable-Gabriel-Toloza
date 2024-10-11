
import { ProductManager } from '../Models/ProductManajer.js';




export class ProductController{
    

    static file = './db/products.json'


    // Usamos querys por si se hacen consultas con querys. De lo contrario se devolvera todos los productos.
    static async getProducts(req, res) {
        const query = req.query
        const result = await ProductManager.getProducts()
        if(!result) return res.status(404).json({ message: "Error al cargar los productos"})

        // Opcional para manejar una posible paginacion.
        if(Object.keys(query).length > 1) {
            const { start, limit } = query;
            const paginationProducts = result.splice(Number(start), Number(limit))
            if(paginationProducts.length < 1) return res.status(202).render({ message: "No hay mas productos! :("})
            return res.status(200).render('products',{ products: paginationProducts})
        } else if (Object.keys(query).length === 1) {
            const { category } = query
            const filtered = result.filter(obj => obj["category"] === category.toLowerCase())
            if(filtered.length < 1) return res.status(404).json({ message: "No se encontraron productos con esa categoria"})
            return res.status(200).render('products', { products: filtered})
            
        }
        
        console.log(result)
        return res.status(200).render('products', { products: result })
        
    }


    //   --> GET con WebSockets "realtimeproducts"
    //   --> GET con WebSockets "realtimeproducts"
    //   --> GET con WebSockets "realtimeproducts"
    static async getProductsWebSocket(req, res) {
        

        const query = req.query
        const result = await ProductManager.getProducts()
        if(!result) return res.status(404).json({ message: "Error al cargar los productos"})

        // Opcional para manejar una posible paginacion.
        if(Object.keys(query).length > 1) {
            const { start, limit } = query;
            const paginationProducts = result.splice(Number(start), Number(limit))
            if(paginationProducts.length < 1) return res.status(202).render({ message: "No hay mas productos! :("})
                return res.status(200).render('products',{ products: paginationProducts})
        } else if (Object.keys(query).length === 1) {
            const { category } = query
            const filtered = result.filter(obj => obj["category"] === category.toLowerCase())
            if(filtered.length < 1) return res.status(404).json({ message: "No se encontraron productos con esa categoria"})
                return res.status(200).render('products', { products: filtered})
            
        }
    

        return res.status(200).render('realtimeproducts', { products: result })
        
    }



    static async getProductsById(req, res) {

        const productId = Number(req.params.pid);
        const result = await ProductManager.getProductById(productId)
        console.log(result)
        if (result instanceof Error ) {
            return res.status(404).json({ message: result.message })
        } 
        return res.status(200).json(result)
    }

    

    static async addProduct(req, res) {

        const socketServer = req.app.get('socketServer')

        const result = req.body;
        
        
        const checkThumbnails = Object.keys(result)
        if(!checkThumbnails.find(obj => obj === "thumbnails")){
            const newResult = {...result, thumbnails: [] }
            const newProduct = await ProductManager.addProduct(newResult)
            if (newProduct instanceof Error ) return res.status(500).json({ message: newProduct.message})
            socketServer.emit('new_product', newProduct)
            return res.status(200).json(newProduct)
        }
        
        const newProduct = await ProductManager.addProduct(result)
        if (newProduct instanceof Error ) return res.status(404).json({ message: newProduct.message})
        
        socketServer.emit('new_product', newProduct)

        return res.status(200).json(newProduct)
        
    }


    static async updateProduct(req, res) {

        const socketServer = req.app.get('socketServer')

        const id = Number(req.params.pid)
        const reqBody = req.body
        const body = {id, ...reqBody}
        
        const result = await ProductManager.updateProduct(body)
        
        if(result instanceof Error) return res.status(404).json({ message: result.message })
        
        const newListProducts = await ProductManager.getProducts()

        socketServer.emit('put_products', newListProducts)

        return res.status(200).json(result)

    }



    static async deleteProduct(req, res) {
            
        const socketServer = req.app.get('socketServer')    

        const id = req.params.pid

        const result = await ProductManager.deleteProduct(Number(id))

        if(result instanceof Error) return res.status(500).json({ message: result.message})


        const newListProducts = await ProductManager.getProducts()
        
        socketServer.emit('deleted_product', newListProducts)

        return res.status(200).json(result);

    }

}
