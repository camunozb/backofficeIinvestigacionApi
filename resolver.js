const {
  createProject,
  addUserProject,
  getProjectNombre,
  getProjectId,
  getProjectLider,
  proyectos,
  deleteProject
} = require('./service/proyecto.service');
const { usuarios,
  getUsuarioNombre,
  getUsuarioId,
  getUsuarioRol,
  }=require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
let aes256 = require('aes256')
const { isLider, estudiante } = require('./middleware/authjwt')
const jwt = require('jsonwebtoken')

const key = 'CLAVEDIFICIL';

const resolvers = {
  Query: {
    usuarios: async () => usuarios(),
    getUsuarioNombre: async (parent, args, context, info) => getUsuarioNombre(args.nombre),
    getUsuarioId: async (parent, args, context, info) => getUsuarioId(args.idUsuario),
    getUsuarioRol: async (parent, args) => getUsuarioRol(args.rol),
   
    proyectos: async (parent, args, context, info) => {
      return proyectos()
    },
    getProjectNombre: async (parent, args, context, info) => getProjectNombre(args.nombreProyecto),
    getProjectId: async (parent, args, context, info) => getProjectId(args.idProyecto),

    getProjectLider: async (parent, args, context, info) => getProjectLider(args.lider),

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
      return User.updateOne({ idUsuario: args.idUsuario }, { estado: "Activo" })
        .then(u => "Usuario activo")
        .catch(err => "Fallo la autorización");
    },
    deleteUser: (parent, args, context, info) => {
      return User.deleteOne({ idUsuario: args.idUsuario })
        .then(u => "Usuario eliminado")
        .catch(err => "Fallo la eliminacion");
    },
    createUser: (parent, args, context, info) => {
      const { clave } = args.user;
      const nuevoUsuario = new User(args.user);
      const encryptedPlainText = aes256.encrypt(key, clave);
      nuevoUsuario.clave = encryptedPlainText
      return nuevoUsuario.save()
        .then(u => "usuario creado")
        .catch(err => console.log(err));
    },
    editarUsuario: async (parent, args, context, info) => {
      const usuarioEditado = await User.findByIdAndUpdate(args._id, {
        idUsuario: args.idUsuario,
        nombre: args.nombre,
        email: args.email,
        estado: args.estado,
        rol: args.rol
      });
      return usuarioEditado;
    },

    editarProyecto: async (parent, args, context, info) => {
      const project = await Project.findOne({ idProyecto: args.idProyecto })
      console.log(project.estadoProyecto, args._id)
      if (project.estadoProyecto == "Activo") {
        const proyectoEditado = await Project.findByIdAndUpdate(args._id, {
          idProyecto: args.idProyecto,
          nombreProyecto: args.nombreProyecto,
          objetivosGenerales: args.objetivosGenerales,
          presupuesto: args.presupuesto
        },
          { new: true });
        return proyectoEditado
      } else {
        return "Proyecto inactivo, no se puede modificar"
      }
    },

    insertUserToProject: async (parent, args, context, info) => addUserProject(args.idUsuario, args.nombreProyecto),

    createProject: (parent, args, context, info) => createProject(args.project),

    activeProjet: (parent, args, context, info) => {
      return Project.updateOne({ idProyecto: args.idProyecto }, { estadoProyecto: "Activo" })
        .then(u => "Proyecto " + args.idProyecto + " activado"  )
        .catch(err => "Fallo la activación");
    },

  crearInscripcion: async (parent, args, context, info) => {
    const proyectoInscripcion = await Project.findByIdAndUpdate(args._id, {
      $addToSet: {
        inscripciones: {
          _id: args._id,
          idEstudiante: args.idUsuario,
          idInscripcion: args.idInscripcion,
          estadoInscripcion: args.estadoInscripcion,
        },
      },
    },
        { new: true });
      return proyectoInscripcion;
    },

  
  crearAvance: async (parent, args, context, info) => {
    const project = await Project.findOne({ idProyecto: args.idProyecto }).populate("rol")
      console.log(project)
    const proyectoAvance = await Project.findByIdAndUpdate(args._id, {
      $addToSet: {
         avances: {
             _id: args._id,
            idEstudiante: args.idUsuario,
            idAvance: args.idAvance,
            descripcion: args.descripcion,
          },
        },
      },
      { new: true });
      return proyectoAvance;
    },
  
    crearObservacionAvance: async (parent, args, context, info) => {
      const project = await Project.findOne({ idProyecto: args.idProyecto })
      const avanceObservacion = await Project.findByIdAndUpdate(args._id, {
        $addToSet:
        {
          "avances":
          {
            $each:
              [{
                "idAvance": args.idAvance,
                "observaciones": args.observaciones
              }]
          }
        }
      }, {new: true});
      return avanceObservacion;
    },


    deleteProject: (parent, args, context, info) => deleteProject(args.nombreProyecto),
    autenticar: async (parent, args, context, info) => {
      try {
        const usuario = await User.findOne({ email: args.usuario })
        if (!usuario) {
          return "Verique usuario y contrasena"
        }
        const claveDesencriptada = aes256.decrypt(key, usuario.clave)
        if (args.clave != claveDesencriptada) {
          return "Verique usuario y contrasena"
        }
        const token = jwt.sign({
          rolesito: usuario.perfil
        }, key, { expiresIn: 60 * 60 * 2 })

        return token
      } catch (error) {
        console.log(error)
      }
    },


 }
}
module.exports = {
  resolvers
}