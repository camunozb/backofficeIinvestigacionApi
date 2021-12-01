const User = require('../model/usuarioModel')


const buscarUsuarioPorIdentificacion = (identi) => listaUsuarios.find(user => user.idUsuario=== identi)

const usuarios = async () => await User.find({})

const getUsuarioNombre = async (nombre) => await User.findOne({ nombre })

const getUsuarioId = async (idUsuario) => await User.findOne({ idUsuario })

//const getUsuarioRol = async (rol) => await User.find({ rol })
const getUsuarioRol = async () => await User.find({ rol })


module.exports = {
    //buscarUsuarioPorIdentificacion,
    usuarios,
    getUsuarioId,
    getUsuarioNombre,
    getUsuarioRol
}

//.populate("inscripciones")