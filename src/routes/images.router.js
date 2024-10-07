import { Router } from "express";
import { uploader } from "../uploader.js";



const router = Router()





const auth = (req, res, next) => {
    console.log("Simulando que se autentico con exito")
    next()
}




// Probando endopoint para handlebars
// Probando endopoint para handlebars
// Probando endopoint para handlebars
router.get('/', (req, res) => {
    
    // El siguiente objeto sera accesible en las plantillas handlebars
    let testUser = {
        name: "Gabriel",
        lastName: "Toloza",
        auth: true,
        style: "index.css",
        role: "Admin",
        items: [
            {caracteristica: "Capo"},
            {caracteristica: "Genio"},
            {caracteristica: "Doctor"},
            {caracteristica: "Programador"}
        ]
    }



    // Usamos render, metodo de handlebars, para enviar el objeto "testUser" hacia las plantillas
    res.status(200).render('index', testUser)
})




// Metodo post para manejar el formulario y la subida de archivos.
// Metodo post para manejar el formulario y la subida de archivos.
// Metodo post para manejar el formulario y la subida de archivos.
router.post('/', auth, uploader.array('testMulter', 5), (req, res) => {
    const { firstName, lastName } = req.body;

    if ( firstName != '' || lastName != '') {
        const newUser = {
            firstName: firstName,
            lastName: lastName
        };

        res.status(200).json({ error: null, data: newUser, file: req.files})
    } else {
        res.status(400).json({ error: "Faltan campos obligatorios", data: []})
    }

})






export default router