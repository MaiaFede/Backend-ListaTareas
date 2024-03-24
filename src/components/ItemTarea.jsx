import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import {borrarTarea, leerTareas} from "../helpers/queries"

const ItemTarea = ({tarea, setTareas}) => {
    const eliminarTarea= () =>{
        Swal.fire({
          title: "Estas seguro de eliminar la tarea?",
          text: "No se puede revertir la operación!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Borrar",
          cancelButtonText: "Cancelar"
        }).then(async(result) => {
          if (result.isConfirmed) {
            const respuesta = await borrarTarea(tarea.id);
            if(respuesta.status === 200){
              Swal.fire({
                title: "Receta eliminada",
                text: `La receta ${tarea.nombreTarea} fue eliminada correctamente`,
                icon: "success"
              });
    const respuestaTareasNuevas = await leerTareas();
    console.log(respuestaTareasNuevas)
    if(respuestaTareasNuevas.status === 200){
      const NuevasTareas = await respuestaTareasNuevas.json();
      setTareas(NuevasTareas)
    }
    }else {
              Swal.fire({
                title:"Ocurrio un error",
                text: `La receta ${tarea.nombreTarea} no fue eliminada, intente esta operacion en unos minutos. `,
              icon: "error"
              });
            }
           
          }
        });
      }
    return (
        <li key={tarea.id} className="list-unstyled mt-3 row ">
                    <div className="conteiner-fluid border rounded-pill d-flex justify-content-start col-7 mx-4">
                    <input type="checkbox" checked={tarea.completado} onChange={(e) => {e.target.value}} className="ms-5" />
                    <p className='mt-3 me-5 ms-2'> {tarea.nombreTarea} </p>
                    </div>
     <Button variant="danger"  onClick={eliminarTarea} className="col-4">Eliminar</Button>
       </li>
    );
};

export default ItemTarea;