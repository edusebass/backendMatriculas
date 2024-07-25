import {Router} from 'express'
const router = Router()
import {
    infoMateria,
    listarMaterias,
    detalleMateria,
    registrarMateria,
    actualizarMateria,
    eliminarMateria
} from "../controllers/materia_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";


router.get('/materia/informacion', verificarAutenticacion, infoMateria)
router.get('/materias', verificarAutenticacion, listarMaterias)
router.get('/materia/:id', verificarAutenticacion, detalleMateria)
router.post('/materia/registro', verificarAutenticacion, registrarMateria)
router.put('/materia/actualizar/:id', verificarAutenticacion, actualizarMateria)
router.delete('/materia/eliminar/:id', verificarAutenticacion, eliminarMateria)

export default router