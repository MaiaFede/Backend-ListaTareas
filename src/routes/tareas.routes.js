import { Router } from "express";
import { borrarTarea, crearTarea, editarTarea, listarTareas, obtenerTarea } from "../controllers/tareas.controllers.js";
import { check} from "express-validator";
import validacionTarea from "../helpers/validacionTarea.js";

const router = Router();

router.route('/tareas').get(listarTareas).post([validacionTarea], crearTarea)
router.route('/tareas/:id').get(obtenerTarea).put([validacionTarea],editarTarea).delete(borrarTarea)

export default router