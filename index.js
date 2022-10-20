//Esta es la sintaxis de comonjs, que no es nativa de js
//importamos express
// const express = require('express'); version de comon.js

//para poder usar esta sintaxis tenemos que agregar "type": "module" en nuestro archivo package.json (arriba de author)
import express from 'express'; //version nativa de js
import router from './routes/index.js';
import db from './config/db.js';


//funcion para ejecutar express
const app = express();

//conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//Definir puerto (variable que sera asignada al momento de hacerl el deployment)(en local ejecuta en el puerto 4000)
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Obtener la fecha actual para agregarla en el footer
//usamos el parametro next para poder seguir leyendo codigo y avanzar al siguiente middleware
app.use((req, res, next) => {
    const year = new Date();

    /*como locals es un objetos puedo agregar nuevas propiedades con un . y agregamos nuestras variables a local para poder usarlas
    en las vistas (agregamos la variable actuaYear al footer para tener el year actualizado siempre)*/
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica para tener acceso a esos archivos
app.use(express.static('public'));


//Agregar router - el metodo use soporta todos los metodos de url que serian get, put, post y delete
app.use('/', router);
    
/*con el metodo listen arrancamos el servidor, le pasamos un puerto por el cual queremos ejecutar, seguido de un callback que si 
arranca correctamente nos indicara en consola en que puerto esta funcionando el servidor, como estamos trabajando de manera local 
se mostrara en el puerto 4000*/
app.listen(port, () => {
    //una vez hagamos el deployment tendra valor nuestra variable de port
    console.log(`El servidor esta funcionando en el puerto ${port}`)
}) 