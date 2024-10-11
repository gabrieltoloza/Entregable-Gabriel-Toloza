import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productRouter from './routes/products.router.js'
import handlebars from 'express-handlebars';
import { config } from '../config.js';
import { Server } from 'socket.io';
import { writeLog } from '../utils.js';


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://127.0.0.1:${PORT}/ `)
})


const socketServer = new Server(httpServer);


// Seteando instancia global del socket
app.set('socketServer', socketServer)



socketServer.on('connection', (socket) => {
    console.log("Nuevo cliente conectado - ID del cliente: ", socket.id);

    socket.on('client_connect', message => {
        writeLog(`${message} - ID del cliente: ${socket.id}`)
    })

    socket.on('success_new_product', message => {
        writeLog(`${message} - ID del cliente: ${socket.id}`)
    });

    socket.on('success_update_product', message => {
        writeLog(`${message} - ID del cliente: ${socket.id}`)
    })

    socket.on('success_deleted_product', message => {
        writeLog(`${message} - ID del cliente: ${socket.id}`)
    });

    socket.on('disconnect', () => {
        writeLog(`Cliente desconectado - ID del cliente: ${socket.id}`);
    });
});




// Configurando handlebars en express.js
app.engine('handlebars', handlebars.engine())
app.set('views', `${config.DIRNAME}/src/views`)
app.set('view engine', 'handlebars')



// Configuraciones para usar Json. y aceptar distintos formatos en el input.
app.use(express.json());
app.disable("x-powered-by")
app.use(express.urlencoded({extended: true}))






// Endpoints
app.use('/api/carts', cartsRouter)

app.use('/api/products', productRouter)




// Configuramos las rutas estaticas.
app.use('/static', express.static(`${config.DIRNAME}/src/public`))



export default app;