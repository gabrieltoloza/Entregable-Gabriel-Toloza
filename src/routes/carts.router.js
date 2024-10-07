import { Router } from 'express'
import { CartsController } from '../Controller/CartsController.js';

const router = Router()


router.get('/', CartsController.getCarts) // --> GET - Este endpoint lo usarian los desarrolladores para ver que recursos hay.


router.get('/:cid', CartsController.getCartsById) // --> GET By Id


router.post('/', CartsController.createOrder) // --> POST - Nuevo carrito vacio


router.post('/:cid/product/:pid', CartsController.addProduct) // --> POST - Agregar producto al carrito




export default router;