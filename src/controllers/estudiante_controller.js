import Estudiante from "../models/Estudiante.js"
import mongoose from "mongoose"

const perfilEstudiante =(req,res)=>{
    delete req.estudianteBDD.nombre
    delete req.estudianteBDD.apellido
    delete req.estudianteBDD.cedula
    delete req.estudianteBDD.fecha_nacimiento
    delete req.estudianteBDD.ciudad
    delete req.estudianteBDD.direccion
    delete req.estudianteBDD.telefono
    delete req.estudianteBDD.email
    delete req.estudianteBDD.createdAt
    delete req.estudianteBDD.updatedAt
    delete req.estudianteBDD.__v
    res.status(200).json(req.estudianteBDD)
}
const listarEstudiantes = async (req,res)=>{
    const estudiantes = await Estudiante.find({estado:true}).where('estudiante').equals(req.estudianteBDD).select("-createdAt -updatedAt -__v").populate('_id nombre apellido cedula fecha_nacimiento ciudad direccion telefono email')
    res.status(200).json(estudiantes)
}
const detalleEstudiante = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el estudiante ${id}`});
    const estudiante = await Estudiante.findById(id).select("-createdAt -updatedAt -__v").populate('_id nombre apellido cedula fecha_nacimiento ciudad direccion telefono email')
    res.status(200).json(estudiante)
}
const registrarEstudiante = async(req,res)=>{
    const {cedula,email,fecha_nacimiento} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarCedulaBDD = await Estudiante.findOne({cedula})
    if(verificarCedulaBDD) return res.status(400).json({msg:"Lo sentimos, la cédula ya se encuentra registrada"})
    const verificarEmailBDD = await Estudiante.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    // const fechaNacimiento = /^\d{4}\/\d{2}\/\d{2}$/;
    // if (!fechaNacimiento.test(fecha_nacimiento)) {
    //     return res.status(400).json({msg: "Lo sentimos, la fecha de nacimiento debe estar en formato AAAA/MM/DD"});
    // }
    const nuevoEstudiante = new Estudiante(req.body)
    await nuevoEstudiante.save()
    res.status(200).json({msg:"Registro exitoso del estudiante"})
}
const actualizarEstudiante = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Estudiante ${id}`});
    await Estudiante.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del estudiante"})
}
const eliminarEstudiante = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el estudiante ${id}`})
    await Estudiante.findByIdAndDelete(id);
    res.status(200).json({msg:"Estudiante eliminado exitosamente"})
}

export {
	perfilEstudiante,
    listarEstudiantes,
    detalleEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}