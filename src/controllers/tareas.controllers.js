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

  export const obtenerTarea = async(req, res) => {
    try {
 console.info(req.params.id)
     const tareaBuscada = await Tarea.findById(req.params.id)
     if (!tareaBuscada){
        return res.status(404).json({mensaje:" El id enviado NO corresponde a ninguna de las tareas"})
     }
     res.status(200).json(tareaBuscada)
    } catch (err) {
     console.error(err);
     res.status(400).json({mensaje:'Error al obtener las tareas'})
    }   
};

export const editarTarea = async(req, res) => {
    try {
    
     const tareaBuscada = await Tarea.findById(req.params.id)
    
     if (!tareaBuscada){
        return res.status(404).json({mensaje:"El id enviado NO corresponde a ninguna de las tareas"})
     }
    await Tarea.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({mensaje:" La tarea fue editada correctamente"})
    } catch (err) {
     console.error(err);
     res.status(500).json({mensaje:'Error al obtener las tareas'})
    }
   };