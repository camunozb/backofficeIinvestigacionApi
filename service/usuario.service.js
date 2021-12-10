const User = require('../model/usuarioModel')

const usuarios = async () => await User.find({})//.populate("inscripciones")

const getUsuarioNombre = async (nombre) => await User.findOne({ nombre })

const getUsuarioId = async (idUsuario) => await User.findOne({ idUsuario })

const getUsuariorol = async (rol) => await User.find({ rol })

const getrol= async(rol) => await User.findOne({ rol })

//const getUsuariorol = async (rol) => await User.find({ rol })


module.exports = {
    usuarios,
    getUsuarioId,
    getUsuarioNombre,
    getUsuariorol,
    getrol
}

//.populate("inscripciones")