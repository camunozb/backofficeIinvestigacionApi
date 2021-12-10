const { Schema, model } = require('mongoose')



const project = new Schema({
    idProyecto: {
        type: String,
        unique: true,
        required: true
    },
    nombreProyecto: {
        type: String,
        required: true,
        unique: true
    },
    objetivosGenerales: String,
    objetivosEspecificos: [String],

    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fechaTerminacion: Date,
    
    lider: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "usuarios"
        // idLider: Number,
        // nombreLider:String
    },
    
    inscripciones: [{
        idEstudiante: Number,
        idInscripcion: String,
        estadoInscripcion: String,
        faseInscripcion: String,
    }],
    
    avances: [{
        _id:String,
        idEstudiante: Number,
        idAvance: String,
        descripcion: String,
        observaciones:String
    }],
    
    estadoProyecto: {
        type: String,
        default: "inactivo"
    },
    faseProyecto: {
        type: String,
        //required: true,
    },

    presupuesto: Number,

    // activo: {
    //     type: Boolean,
    //     default: true
    // },

    },
        {
            timestamps: true
    },
    
       
        
        
        
        
)
module.exports = model('Proyectos', project, 'proyectos')