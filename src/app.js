import express from 'express';
import cartsRouter from '../routes/carts.router.js';
import productRouter from '../routes/products.router.js'


const app = express();
const PORT = 8080;

app.use(express.json());
app.disable("x-powered-by")
app.use(express.urlencoded({extended: true}))




app.use('/api/carts', cartsRouter)

app.use('/api/products', productRouter)







app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://127.0.0.1:${PORT}/ `)
})
