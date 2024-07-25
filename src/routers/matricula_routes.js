import {Router} from 'express'
const router = Router()
import {
    infoMatricula,
    listarMatriculas,
    detalleMatricula,
    registrarMatricula,
    actualizarMatricula,
    eliminarMatricula
} from "../controllers/matricula_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";


router.get('/matricula/informacion', verificarAutenticacion, infoMatricula)
router.get('/matriculas', verificarAutenticacion, listarMatriculas)
router.get('/matricula/:id', verificarAutenticacion, detalleMatricula)
router.post('/matricula/registro', verificarAutenticacion, registrarMatricula)
router.put('/matricula/actualizar/:id', verificarAutenticacion, actualizarMatricula)
router.delete('/matricula/eliminar/:id', verificarAutenticacion, eliminarMatricula)

export default router