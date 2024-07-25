import {Schema, model} from 'mongoose'

const estudianteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    cedula:{
        type:String,
        require:true,
        trim:true
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    ciudad:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    }

},{
    timestamps:true
})

export default model('Estudiante',estudianteSchema)