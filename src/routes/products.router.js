import { Router } from "express";
import { ProductController } from "../Controller/ProductsController.js";


const router = Router()




router.get('/', ProductController.getProducts) //  --> GET 

router.get('/:pid', ProductController.getProductsById) // --> GET by ID

router.post('/', ProductController.addProduct) // --> POST

router.put('/:pid', ProductController.updateProduct) // --> PUT

router.delete('/:pid', ProductController.deleteProduct) // --> PUT




export default router;