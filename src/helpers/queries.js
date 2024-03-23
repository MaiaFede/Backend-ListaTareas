const APITareas = import.meta.env.VITE_API_TAREA
console.info(APITareas)

export const leerTareas = async()=>{
try {
   const respuesta = await fetch(APITareas)
    return respuesta

} catch (error) {
    console.error(error)
}
}

export const crearTarea = async (tareaNueva) => {
    try {
      const respuesta = await fetch(APITareas,{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(tareaNueva)
      });
      console.info(respuesta);
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };

  export const borrarTarea = async (id) => {
    try {
      const respuesta = await fetch(APITareas+'/'+id,{
        method: "DELETE"     
      });
      console.info(respuesta);
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };

