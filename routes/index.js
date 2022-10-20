import express from "express";
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetalleViaje
} from "../controllers/paginasController.js";
import { guardarTestimonial } from "../controllers/testimonialController.js";

//usamos la misma instancia de express pero estamos extendiendo su router, para trabajar con la misma app del index principal
const router = express.Router();

//Ejemplo de hola mundo, la "/" se refiere a nustra pagina principal (puerto 400) que estamos usasndo el metodo get  
//el callback toma 3 parametros: request, response, next. request es lo que nosotros enviamos y response es lo que express nos envia
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros );

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimonial', paginaTestimoniales);

router.post('/testimonial', guardarTestimonial);



export default router;