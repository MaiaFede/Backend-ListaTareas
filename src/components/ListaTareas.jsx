import { useState, useEffect } from "react";
import { leerTareas, crearTarea,obtenerTarea,editarTarea} from "../helpers/queries";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ItemTarea from "./ItemTarea";
import Swal from "sweetalert2";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [completado, setCompletado] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, setValue
  } = useForm();

  

  useEffect(() => {
    obtenerTareas();
   completar();
  }, []);

  const obtenerTareas = async () => {
    const respuesta = await leerTareas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setTareas(datos);
    } else {
    }
  };

  const completar = async (id, completado) => {
    const respuesta = await obtenerTarea(id);
    if (respuesta.status === 200) {
      const tarea = await respuesta.json();
      const tareaActualizada = { ...tarea, completado }; // Actualiza el estado de completado
      const respuestaEditar = await editarTarea(tareaActualizada, id);
      if (respuestaEditar.status === 200) {
        Swal.fire({
          title: "Tarea actualizada",
          text: completado ? `La tarea: ${tareaActualizada.nombreTarea}, ha sido marcada como completada` 
                          : `La tarea: ${tareaActualizada.nombreTarea}, ha sido desmarcada`,
          icon: "success"
        });
        obtenerTareas(); // Actualiza la lista de tareas
      }
    }
  };
 

  const datosValidados = async (tarea) => {
    
  const tareaNueva = {
    nombreTarea : tarea.nombreTarea,
    completado : completado,
  }
  const respuesta = await crearTarea(tareaNueva);
  if (respuesta.status === 201) {
    Swal.fire({
      title: "Tarea creada",
      text: `La tarea: ${tarea.nombreTarea}, fue creada correctamente`,
      icon: "success",
    });
    reset();
    obtenerTareas();
  } else {
    Swal.fire({
      title: "Ocurrio un error",
      text: `La tarea no pudo ser creada, intente esta operación en unos minutos`,
      icon: "error",
    });
  }
      };
   

  return (
    <div className="container-fluid align-center text-center ">
                  <h1>Bienvenido</h1>            <h4>Ingresa tus tareas</h4>
      <Form className="my-4" onSubmit={handleSubmit(datosValidados)}>
        <Form.Group className="mb-3" controlId="formNombreTarea">
          <Form.Control
            type="text"
            placeholder="Ej: Caminar en el parque"
            {...register("nombreTarea", {
              required: "El nombre de la tarea es un dato obligatorio",
              minLength: {
                value: 3,
                message:
                  "El nombre de la tarea debe tener como minimo 3 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "El nombre de la tarea debe tener como maximo 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreTarea?.message}
          </Form.Text>
          </Form.Group>
          <Button type="submit" variant="primary" className="rounded-4 ms-2">
          Agregar tarea
          </Button>
       
           
      </Form>
      <ul className="list-group">
        {tareas.map((tarea) => (
          <ItemTarea key={tarea.id} tarea={tarea}  setTareas={setTareas} completar={completar} ></ItemTarea>
        ))}
                             
      </ul>
       
    </div>
  );
};

export default ListaTareas;