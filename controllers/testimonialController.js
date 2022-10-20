import { Testimonial } from "../models/Testimonial.js";

const guardarTestimonial = async (req, res) => {

    //validar formulario testimonial (sin dependencias, hay una dependencia de express que nos ahorra el trabajo)

    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    // El metodo trim quita los espacios en blanco al inicio y al final de un input
    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre esta vacio'})
    }

    if (correo.trim() === '') {
        errores.push({mensaje: 'El correo esta vacio'})
    }

    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje esta vacio'})
    }

    if (errores.length > 0) {

        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        
        //Mostrar la vista con erores 
        /*mandamos nuestras variables de nombre, correo y mensaje para cuando aparezca un error no se borre lo que el usuario
        habia llenado del formulario*/
        res.render('testimonial', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales         
        })
    }else{
        //Almacenar en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimonial');
        } catch (error) {
            console.log(error)
        }
    }

}

export {
    guardarTestimonial
}