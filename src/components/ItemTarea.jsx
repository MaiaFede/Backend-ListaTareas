import React from 'react';
import { Button } from 'react-bootstrap';
const ItemTarea = ({tarea}) => {
    return (
        <li key={tarea.id} className="list-unstyled mt-3 row ">
                    <div className="conteiner-fluid border rounded-pill d-flex justify-content-start col-7 mx-4">
                    <input type="checkbox" checked={tarea.completado} onChange={(e) => {e.target.value}} className="ms-5" />
                    <p className='mt-3 me-5 ms-2'> {tarea.nombreTarea} </p>
                    </div>
     <Button className="btn btn-danger col-4">Eliminar</Button>
       </li>
    );
};

export default ItemTarea;