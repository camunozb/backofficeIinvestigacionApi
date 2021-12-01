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
    lider:  String,
    
    inscripciones: [{
        idInscripcion: String,
        idEstudiante: String,
        estadoInscripcion: String,
        faseInscripcion: String,
        type: Schema.Types.Array,
        ref: "usuarios"
    }],
    
    avances: [{
        type: String,
        required: true,
        unique: true
    }],
    estadoProyecto: {
        type: String,
        default: "inactivo"
    },
    faseProyecto: String,
    presupuesto: Number,

    activo: {
        type: Boolean,
        default: true
    },

    },
        {
            timestamps: true
        }
)
module.exports = model('Proyectos', project, 'proyectos')