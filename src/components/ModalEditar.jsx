import { Button, Modal, Container, Form } from "react-bootstrap";
import { obtenerTarea, editarTarea, leerTareas } from "../helpers/queries";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ModalEditar = (props) => {
  const { id } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    cargarTareaEnFormulario(id);
  }, []);

  const datosValidados = async (tarea) => {
    const respuesta = await editarTarea(tarea, id);
    if (respuesta.status === 200) {
      Swal.fire({
        title: "Receta editada",
        text: `La receta: ${tarea.nombreTarea}, fue editada correctamente`,
        icon: "success",
      });
      const respuestaTareasEditadas = await leerTareas();
      if (respuestaTareasEditadas.status === 200) {
        const NuevasTareas = await respuestaTareasEditadas.json();
        props.setTareas(NuevasTareas);
        props.onHide();
      }
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `La receta: ${tarea.nombreTarea}, no pudo ser editada, intente esta operación en unos minutos.`,
        icon: "error",
      });
    }
  };
  const cargarTareaEnFormulario = async (id) => {
    const respuesta = await obtenerTarea(id);
    console.info(respuesta);
    if (respuesta.status === 200) {
      const tareaBuscada = await respuesta.json();
      setValue("nombreTarea", tareaBuscada.nombreTarea);
      setValue("completado", tareaBuscada.completado);
    }
  };

  return (
    <Modal
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Modal.Footer>
              <Button onClick={props.onHide} variant="danger">
                Cerrar
              </Button>
              <Button type="submit" variant="success">
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditar;
