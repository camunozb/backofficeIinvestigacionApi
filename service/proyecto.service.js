const Project = require('../model/proyectoModel')
const User = require('../model/usuarioModel')



const addUserProject = async (idUsuario, nombreProyecto, idInscripcion) => {
    const user = await User.findOne({ idUsuario })
    if (user && user.estado === "Activo") {
        const project = await Project.findOne({ nombre: nombreProyecto })
        if (project && project.activo) {
            if (project.inscripciones.find(i => i == user._id)){
                console.log(i, user._id, "Segundo if")
                return "El usuario ya pertenece al proyecto indicado"    
            } else {
                await Project.updateOne({ nombre: nombreProyecto },
                    { $push: { inscripciones: [user.idUsuario, user.nombre] }})
                return "Usuario adicionado correctamente"
            }
        } else {
            return "Proyecto no valido para adicionar un integrante, consulte al administrador"
        }
    } else {
        return "Usuario no valido"
    }
}

const createProject = (project) => {
    const nuevoProyecto = new Project(project);
    return nuevoProyecto.save()
        .then(u => "Proyecto creado")
        .catch(err => console.log(err));
}

const deleteProject = (nombreProyecto) => {
    return Project.updateOne({ nombre: nombreProyecto }, { activo: false })
        .then(u => "Proyecto 'eliminado'")
        .catch(err => "Fallo la eliminacion");
}

// const modificarFase = async (idProyecto) => {
//     const project = await Project.findOne({ idProyecto })
//      if (project.faseProyecto === "en desarrollo") {
//          console.log("Fase del proyecto: ", project.faseProyecto, idProyecto)
//          return  Project.updateOne({ fase: project.idProyecto }, { faseProyecto: "terminado" }),
//              console.log(idProyecto, project.idProyecto, "Fasemodificada")
//              //.then(u => "Fase actualizada")
//              //.catch(err => "Fallo la actualización de la fase");  
//      }
// }

const proyectos = async () => await Project.find({}).populate("lider")

const getProjectNombre = async (nombreProyecto) => await Project.findOne({ nombreProyecto }).populate("lider")

const getProjectId = async (idProyecto) => await Project.findOne({ idProyecto }).populate("lider")

const getProjectLider = async (lider) => await Project.find({ lider })

//const rolEstudiante = async (rol) => await User.find({ rol: "estudiante" })





module.exports = {
    addUserProject,
    getProjectNombre,
    getProjectId,
    getProjectLider,
    proyectos,
    deleteProject,
    createProject,

    
}