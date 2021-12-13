const User = require('../model/usuarioModel')

const usuarios = async () => await User.find({})

const getUsuarioNombre = async (nombre) => await User.findOne({ nombre })

const getUsuarioId = async (idUsuario) => await User.findOne({ idUsuario })

const getUsuarioRol = async (rol) => await User.find({ rol })

module.exports = {
    usuarios,
    getUsuarioId,
    getUsuarioNombre,
    getUsuarioRol,
}
