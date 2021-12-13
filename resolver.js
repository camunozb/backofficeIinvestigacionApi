const { addUserProject,
    getProject,
    getProjectId,
    proyectos,
    deleteProject,
    createProject,
    activeProjet} = require('./service/proyecto.service');
const { usuarios,
    getUsuarioNombre,
    getUsuarioId,
    getUsuarioRol} = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
let aes256 = require('aes256');



const listaUsuarios = [
    {
        email: "dannylegui12@gmail.com",
        nombre: "Daniela Leguizamo",
        clave: "admin",
        estado: "activo",
        rol: "lider",
        idUsuario: 1193086577
    },
    {
        email: "d.saavedra28@icloud.com",
        nombre: "Daniel Andres ",
        clave: "admin",
        estado: "activo",
        rol: "lider",
        idUsuario: 1155
    }]



const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        usuarios: async () => usuarios(),
        getUsuarioNombre: async (parent, args, context, info) => getUsuarioNombre(args.nombre),
        getUsuarioId: async (parent, args, context, info) => getUsuarioId(args.idUsuario),
        getUsuarioRol: async (parent, args, context, info) => getUsuarioRol(args.rol),
        proyectos: async () => proyectos(),
        getProject: async (parent, args, context, info) => getProject(args.nombreProyecto),
        getProjectId: async (parent, args, context, info) => getProject(args.idProyecto),
    },

    Mutation: {
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        activeUser: (parent, args, context, info) => {
            return User.updateOne({ idUsuario: args.idUsuario }, { estado: "activo" })
                .then(u => "Usuario activo")
                .catch(err => "Fallo la autorización");
        },
        deleteUser: (parent, args, context, info) => {
            return User.deleteOne({ idUsuario: args.idUsuario })
                .then(u => "Usuario eliminado")
                .catch(err => "Fallo la eliminacion");
        },
        deleteProject: (parent, args, context, info) => deleteProject(args.nombreProyecto),
        insertUserToProject: async (parent, args, context, info) => addUserProject(args.idUsuario, args.nombreProyecto),
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        activeProjet: (parent, args, context, info) => {
            return Project.updateOne({ idProyecto: args.idProyecto }, { estadoProyecto: "activo" })
                .then(u => "Proyecto activado")
                .catch(err => "Fallo la activación");
        },
        createProject: (parent, args, context, info) => createProject(args.project),
    }
}
module.exports = resolvers