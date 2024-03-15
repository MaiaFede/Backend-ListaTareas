import {useState} from 'react';

const ListaTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
const tareaGuardada = (event)=> {
    
        setNuevaTarea(event.target.value);
    }
      function añadirTarea() {
        const tareaNueva = {
          text: nuevaTarea,
          completed: false,
        };
    
        setTareas([...tareas, tareaNueva]);
        setNuevaTarea("")
      }
      function eliminarTarea(index) {
        const tareasNuevas = tareas.slice();
        tareasNuevas.splice(index, 1);
    
        setTareas(tareasNuevas);

      }
      function completarTarea(index) {
        const tareasNuevas = tareas.slice();
        tareasNuevas[index].completed = true;
    
        setTareas(tareasNuevas);
      }
    return (

        <div className="container-fluid align-center text-center ">
                    <h1>Bienvenido</h1>
                    <h4>Ingresa tus tareas</h4>
                    <input type="text" value={nuevaTarea} onChange={tareaGuardada} />  
                    <button onClick={añadirTarea} className="btn btn-primary rounded-4 ms-2">Agregar tarea</button>
                    <ul className="list-group">
        {tareas.map((tarea, index) => (
                  <li key={index} className="list-unstyled mt-3 row ">
                    <div className="conteiner-fluid border rounded-pill d-flex justify-content-start col-7 mx-4">
                    <input type="checkbox" checked={tarea.completed} onChange={() => completarTarea(index)} className="ms-5" />
                    <p className='mt-3 me-5 ms-2'> {tarea.text} </p>
                    
                    </div>
                    <button onClick={() => eliminarTarea(index)} className="btn btn-danger col-4">Eliminar</button>
                  </li>
                ))}

                    
                    </ul>    
                </div>
            );
};

export default ListaTareas;