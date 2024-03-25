import Tarea from "../database/models/tarea.js";

export const listarTareas = async(req, res) => {
    try {
     const tareas = await Tarea.find()
     res.status(200).json(tareas)
    } catch (err) {
     console.error(err);
     res.status(400).json({mensaje:'Error al buscar las tareas'})
    }
   };

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