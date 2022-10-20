import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimonial.js";

const paginaInicio = async (req, res) => {


    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}))

    try {
        //ambas consultas arrancan al mismo tiempo
        const resultado = await Promise.all(promiseDB)
        
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }

}

const paginaNosotros = (req, res) => {

    //solo colocamos el nombre de nuestro view y automaticamente render lo encuentra y lo muestra porque instalamos pug
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req, res) => {
    //consultar base de datos
    const viajes = await Viaje.findAll();


    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    })
}

const paginaTestimoniales = async (req, res) => {

    try {
        
        const testimoniales = await Testimonial.findAll();


        res.render('testimonial', {
            pagina: 'Testimonial',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }

}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    //el nombre de la variable que es extraida es el mismo que se asigno en el comodin del routing
    const {slug} = req.params; 

    try {
        //buscamos en nuestra base de datos el slug que corresponde con findOne y where usando la varibale extraida 
        //en el where quedaria slug: slug pero podemos dejar solamente un slug ya que es objeto
        const viaje = await Viaje.findOne({where : {slug}});

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros, 
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}