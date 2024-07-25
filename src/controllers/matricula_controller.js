import Matricula from "../models/Matricula.js"
import Estudiante from "../models/Estudiante.js"
import Materia from "../models/Materia.js"
import mongoose from "mongoose"

const infoMatricula =(req,res)=>{
    delete req.matriculaBDD.codigo
    delete req.matriculaBDD.descripcion
    delete req.matriculaBDD.id_estudiante
    delete req.matriculaBDD.id_materia
    delete req.matriculaBDD.createdAt
    delete req.matriculaBDD.updatedAt
    delete req.matriculaBDD.__v
    res.status(200).json(req.matriculaBDD)
}
const listarMatriculas = async (req,res)=>{
    const matriculas = await Matricula.find({estado:true}).where('matricula').equals(req.matriculaBDD).select("-createdAt -updatedAt -__v").populate('_id codigo descripcion id_estudiante id_materia')
    res.status(200).json(matriculas)
}
const detalleMatricula = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la matricula ${id}`});
    const matricula = await Matricula.findById(id).select("-createdAt -updatedAt -__v").populate('_id codigo descripcion id_estudiante id_materia')
    res.status(200).json(matricula)
}
const registrarMatricula = async(req,res)=>{
    const {id_estudiante,id_materia} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const estudianteBDD = await Estudiante.findById(id_estudiante);
    if (!estudianteBDD) return res.status(400).json({ msg: "Lo sentimos, el estudiante no se encuentra registrado" });
    const materiaBDD = await Materia.findById(id_materia);
    if (!materiaBDD) return res.status(400).json({ msg: "Lo sentimos, la materia no se encuentra registrada" });
    const nuevoMatricula = new Matricula(req.body)
    await nuevoMatricula.save()
    res.status(200).json({msg:"Registro exitoso de la matricula"})
}
const actualizarMatricula = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la materia ${id}`});
    await Matricula.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa de la matricula"})
}
const eliminarMatricula = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la materia ${id}`})
    await Matricula.findByIdAndDelete(id);
    res.status(200).json({msg:"Matricula eliminada exitosamente"})
}

export {
	infoMatricula,
    listarMatriculas,
    detalleMatricula,
    registrarMatricula,
    actualizarMatricula,
    eliminarMatricula
}