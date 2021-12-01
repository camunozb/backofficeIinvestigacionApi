const { Schema, model } = require('mongoose')
const User = require('../model/usuarioModel')

const usuario = new Schema({
    idUsuario: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    estado: {
        type: String,
        default: "pendiente"
    },
    rol: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    }
})
module.exports = model('usuarios', usuario,"usuarios" )