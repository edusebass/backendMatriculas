import {Router} from 'express'
const router = Router()
import {
    perfilEstudiante,
    listarEstudiantes,
    detalleEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} from "../controllers/estudiante_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";


router.get('/estudiante/informacion', verificarAutenticacion, perfilEstudiante)
router.get('/estudiantes', verificarAutenticacion, listarEstudiantes)
router.get('/estudiante/:id', verificarAutenticacion, detalleEstudiante)
router.post('/estudiante/registro', verificarAutenticacion, registrarEstudiante)
router.put('/estudiante/actualizar/:id', verificarAutenticacion, actualizarEstudiante)
router.delete('/estudiante/eliminar/:id', verificarAutenticacion, eliminarEstudiante)

export default router