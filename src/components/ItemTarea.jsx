import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import {borrarTarea, leerTareas,obtenerTarea} from "../helpers/queries"
import {useState} from "react";
import ModalEditar from './ModalEditar';

const ItemTarea = ({tarea, setTareas,completar, obtenerTareas }) => {
  const [modalShow, setModalShow] = useState(false);
  
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
        <li key={tarea.id} className="list-unstyled mt-3 align-content-center justify-content-center row ">
                    <div className="conteiner-fluid border rounded-pill d-flex justify-content-between col-9 mx-5 ">
                    <input type="checkbox" checked={tarea.completado} onChange={(e) => completar(tarea.id, e.target.checked)}className="ms-5" />
                    <p className='mt-3 me-5 ms-2'> {tarea.nombreTarea} </p>
                    <div className="d-flex justify-content-between align-content-center">
                    <Button variant="link" onClick={() => setModalShow(true)}> <i className="bi bi-pencil-square col-6"></i></Button>
                    <Button  variant="danger" onClick={eliminarTarea} className="col-6 btn-costum ">Eliminar</Button>
 
    <ModalEditar show={modalShow} onHide={() => setModalShow(false)} id={tarea.id}  obtenerTareas={obtenerTareas} />
                    </div>
                    </div>
    
       </li>
    );
};

export default ItemTarea;