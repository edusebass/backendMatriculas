import {Schema, model} from 'mongoose'
import mongoose from 'mongoose'

const matriculaSchema = new Schema({
    codigo:{
        type:Number,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    id_estudiante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Estudiante'
    },
    id_materia:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Materia'
    }

},{
    timestamps:true
})

export default model('Matricula',matriculaSchema)