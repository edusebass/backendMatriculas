import {Router} from 'express'
import verificarAutenticacion from '../middlewares/autenticacion.js'
import { validacionUsuario } from '../middlewares/validacionUsuario.js';

const router = Router()
import{
    detalleUsuario,
    login,
    perfil,
    registro
} from "../controllers/usuario_controller.js";

router.post("/login", login)

router.post("/registro", validacionUsuario, registro)

router.get("/perfil", verificarAutenticacion, perfil)

router.get('/usuario/:id',verificarAutenticacion, detalleUsuario)

export default router