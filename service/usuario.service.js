const User = require('../model/usuarioModel')

const usuarios = async () => await User.find({})
const getUsuarioNombre = async (nombre) => await User.findOne({ nombre })
const getUsuarioId = async (idUsuario) => await User.findOne({ idUsuario })
const getUsuarioRol = async (rol) => await User.findOne({ rol })
const getUsuarioEstudiante = async () => await getUsuarioEstudiante.find({ rol: 'Estudiante' })

module.exports = {
    usuarios,
    getUsuarioNombre,
    getUsuarioId,
    getUsuarioRol,
    getUsuarioEstudiante,
}
