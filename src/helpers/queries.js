const APITareas = import.meta.env.VITE_API_TAREA;
console.info(APITareas);

export const leerTareas = async () => {
  try {
    const respuesta = await fetch(APITareas);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const crearTarea = async (tareaNueva) => {
  try {
    const respuesta = await fetch(APITareas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaNueva),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const borrarTarea = async (id) => {
  try {
    const respuesta = await fetch(APITareas + "/" + id, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerTarea = async (id) => {
  try {
    const respuesta = await fetch(APITareas + "/" + id);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const editarTarea = async (tareaEditada, id) => {
  try {
    const respuesta = await fetch(APITareas + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
