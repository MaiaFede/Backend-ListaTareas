import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionTarea = [
  check("nombreTarea")
    .notEmpty()
    .withMessage("El nombre de la tarea es un dato obligatorio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre de la tarea debe tener entre 3 y 100 caracteres"),
  check("completado")
    .notEmpty()
    .withMessage("El estado de completado es un dato obligatorio")
    .isBoolean()
    .withMessage("El estado de completado debe ser un valor booleano (true o false)"),

  (req, res, next) => resultadoValidacion(req, res, next),
];
export default validacionTarea;
