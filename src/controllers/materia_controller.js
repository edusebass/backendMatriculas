import Materia from "../models/Materia.js"
import mongoose from "mongoose"

const infoMateria =(req,res)=>{
    delete req.materiaBDD.nombre
    delete req.materiaBDD.codigo
    delete req.materiaBDD.descripcion
    delete req.materiaBDD.creditos
    delete req.materiaBDD.createdAt
    delete req.materiaBDD.updatedAt
    delete req.materiaBDD.__v
    res.status(200).json(req.materiaBDD)
}
const listarMaterias = async (req,res)=>{
    const materias = await Materia.find({estado:true}).where('materia').equals(req.materiaBDD).select("-createdAt -updatedAt -__v").populate('_id nombre codigo descripcion creditos')
    res.status(200).json(materias)
}
const detalleMateria = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la materia ${id}`});
    const materia = await Materia.findById(id).select("-createdAt -updatedAt -__v").populate('_id nombre codigo descripcion creditos')
    res.status(200).json(materia)
}
const registrarMateria = async(req,res)=>{
    const {nombre,codigo} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarNombreBDD = await Materia.findOne({nombre})
    if(verificarNombreBDD) return res.status(400).json({msg:"Lo sentimos, la materia ya se encuentra registrada"})
    const verificarCodigoBDD = await Materia.findOne({codigo})
    if(verificarCodigoBDD) return res.status(400).json({msg:"Lo sentimos, el código ya se encuentra registrado"})
    const nuevoMateria = new Materia(req.body)
    await nuevoMateria.save()
    res.status(200).json({msg:"Registro exitoso de la materia"})
}
const actualizarMateria = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la materia ${id}`});
    await Materia.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa de la materia"})
}
const eliminarMateria = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la materia ${id}`})
    await Materia.findByIdAndDelete(id);
    res.status(200).json({msg:"Materia eliminada exitosamente"})
}

export {
	infoMateria,
    listarMaterias,
    detalleMateria,
    registrarMateria,
    actualizarMateria,
    eliminarMateria
}