import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productRouter from './routes/products.router.js'
import imagesRouter from './routes/images.router.js';
import { config } from './config.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';





const app = express();
const PORT = 8080;


const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://127.0.0.1:${PORT}/ `)
})

const SocketServer = new Server(httpServer)

SocketServer.on('connection', socket => {
    console.log(`Nuevo cliente conectado con el id ${socket.id}`)

    socket.on('init_message', data => {
        SocketServer.emit('new_message', { id: socket.id, message: data })
    })
})


app.use(express.json());
app.disable("x-powered-by")
app.use(express.urlencoded({extended: true}))


// Configurando el motor de plantillas "handlebars" y
//  seteando donde estan ubicados los archivos
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`)
app.set('view engine', 'handlebars')




// API del Primer Entregable
app.use('/api/carts', cartsRouter)
app.use('/api/products', productRouter)



// SECCION DE MULTER - Endpoint para realizar el post/subida de archivos
// indicando la ruta al formulario en la propiedad "action"
// Aqui hay una prueba de un chat mas un formulario de inicio de session para algun futuro (ignorar)
app.use('/images', imagesRouter)


app.use('/jajaja', () => {
    console.log("Holaaa")
})

// SECCION PARA SERVIR ARCHIVOS ESTATICOS
app.use('/static', express.static(`${config.DIRNAME}/public`))









