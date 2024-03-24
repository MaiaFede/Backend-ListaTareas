import React from 'react';
import {Button, Modal, Container,Form} from 'react-bootstrap';
import {obtenerTarea, editarTarea } from "../helpers/queries";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ModalEditar = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, setValue
  } = useForm();

  const {id} = useParams();

  useEffect(()=>{
   cargarTareaEnFormulario();
  }, [])

  const datosValidados = async (tarea) => {
  const respuesta = await editarTarea(tarea, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Receta editada",
          text: `La receta: ${tarea.nombreTarea}, fue editada correctamente`,
          icon: "success",
        });
        {props.onHide}
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `La receta: ${tarea.nombreTarea}, no pudo ser editada, intente esta operación en unos minutos.`,
          icon: "error",
        });
      }
  }
  const cargarTareaEnFormulario = async()=>{
    const respuesta = await obtenerTarea(id)
    if (respuesta.status === 200) {
      const tareaBuscada = await respuesta.json();
      setValue("nombreTarea", tareaBuscada.nombreTarea);
      setValue("completado", tareaBuscada.completado);
    }
  }
    return (
        <Modal {...props} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
        Editar tarea
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Container>
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
          <Form.Group className="mb-3" controlId="formCompletado">
          <Form.Control
            type="checkbox"
            {...register("completado", {
              required: "Seleccionar si la tarea finalizo es un dato obligatorio",
              
            })}
          />
          <Form.Text className="text-danger">
            {errors.completado?.message}
          </Form.Text>
          </Form.Group>
        <Modal.Footer>
        <Button onClick={props.onHide} className="btn btn-danger">Cerrar</Button>
        <Button  type="submit" variant="sucess">Guardar cambios</Button>
        </Modal.Footer>
   
           
      </Form>
          </Container>
        </Modal.Body>
          
      </Modal>
    );
};

export default ModalEditar;