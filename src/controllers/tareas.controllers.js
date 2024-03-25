import Tarea from "../database/models/tarea.js";

export const listarTareas= (req, res)=>{
    console.info("aqui obtener la lista de todos los productos");
    res.send("Aqui enviaremos ls lista de productos")
}

export const crearTarea = async(req, res)=>{
    try {
      const tareaNueva = new Tarea(req.body);
      await tareaNueva.save();
      console.info(req.body)
      res.status(201).json({mensaje: 'La tarea fue creada correctamente'})
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: 'Error al crear la tarea'
      })
    }  
  }