import { useState, useEffect } from "react";
import { leerTareas, crearTarea, obtenerTarea, editarTarea } from "../helpers/queries";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ItemTarea from "./ItemTarea";
import Swal from "sweetalert2";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(false);
  const[titulo, setTitulo]= useState("")
const [buttonForm, setButtonForm]= useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, setValue
  } = useForm();

  const {id} = useParams();

  useEffect(() => {
    obtenerTareas();
    cargarTareaEnFormulario()
  }, []);

  const obtenerTareas = async () => {
    const respuesta = await leerTareas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setTareas(datos);
    } else {
    }
  };

  const cargarTareaEnFormulario = async()=>{
    const respuesta = await obtenerTarea(id)
    if (respuesta.status === 200) {
      const tareaBuscada = await respuesta.json();
      setValue("nombreReceta", tareaBuscada.nombreTarea);
    }
  }

  const datosValidados = async (tarea) => {
    
if (editando){
  setTitulo("Edita tus tareas")
  setButtonForm("Actualizar tarea")
  const tareaEditada = {
    nombreTarea: tarea.nombreTarea,
    completado: false,
  };
  const respuesta = await editarTarea(tareaEditada, id);
  if (respuesta.status === 200) {
    Swal.fire({
      title: "Tarea editada",
      text: `La tarea: ${tareaEditada.nombreTarea}, fue editada correctamente`,
      icon: "success",
    });
    
  } else {
    Swal.fire({
      title: "Ocurrio un error",
      text: `La receta: ${tareaEditada.nombreTarea}, no pudo ser editada, intente esta operación en unos minutos.`,
      icon: "error",
    });
  }
}else{
  setTitulo("Ingresa tus tareas")
  setButtonForm("Agregar tarea")
  const tareaNueva = {
    nombreTarea: tarea.nombreTarea,
    completado: false,
  };
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

}
      };

  return (
    <div className="container-fluid align-center text-center ">
                  <h1>Bienvenido</h1>            <h4>{titulo}</h4>
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
          <Button type="submit" variant="primary" className="rounded-4 ms-2">
            {buttonForm}
          </Button>
        </Form.Group>
           
      </Form>
      <ul className="list-group">
        {tareas.map((tarea) => (
          <ItemTarea key={tarea.id} tarea={tarea} setTareas={setTareas} setEditando={setEditando}></ItemTarea>
        ))}
                             
      </ul>
       
    </div>
  );
};

export default ListaTareas;