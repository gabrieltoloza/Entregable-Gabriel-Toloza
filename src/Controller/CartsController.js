import { CartManager } from '../Models/CartManager.js';
import { ProductManager } from '../Models/ProductManajer.js';



export class CartsController{
    
    static async getCarts(req, res) {

        
        const result = await CartManager.getCarts()
        
        res.json(JSON.parse(result))

    }

    static async getCartsById(req, res){

        const id = req.params.cid
        
        const result = await CartManager.getCartByID(Number(id))

        if(result instanceof Error ) return res.status(404).json({ message: result.message })

        res.status(200).json(result)
        
    }
    

    static async createOrder(req, res){

        const result = await CartManager.createOrder()
        
        if ( result instanceof Error ) return res.status(500).json({ message: result.message })

        
        res.status(200).json({ message: "Carrito creado con exito", result: result})

        console.log("Solicitud POST Exitosa!!")
    }


    static async addProduct(req, res) {

        const { cid, pid } = req.params
        const cardID = Number(cid)
        const productID = Number(pid)

        const { quantity } = req.body

        const result = await CartManager.addProductCarts(cardID, {id: productID, quantity: quantity})

        if(result instanceof Error) return res.status(404).json({ message: result.message })

        return res.status(200).json({ message: "Producto agregado al carrito exitosamente", ...result})

    }
};


