import { Router } from "express";
import { borrarTarea, crearTarea, editarTarea, listarTareas, obtenerTarea } from "../controllers/tareas.controllers.js";
import { check} from "express-validator";

const router = Router();

router.route('/tareas').get(listarTareas).post([check], crearTarea)
router.route('/tareas/:id').get(obtenerTarea).put(editarTarea).delete(borrarTarea)

export default router