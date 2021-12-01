const { __DirectiveLocation } = require('graphql')
const Project = require('../model/proyectoModel')
const User = require('../model/usuarioModel')


const addUserProject = async (idUsuario, nombreProyecto, idInscripcion) => {
    const user = await User.findOne({ idUsuario })
    const existe = idUsuario
    if (user && user.estado === "activo") {
        const project = await Project.findOne({ nombre: nombreProyecto })
        //console.log(project.activo)
        if (project && project.activo) {
            //console.log("Primer if")
            console.log(idUsuario, existe, user._id)
            if (project.inscripciones.find(i => i == user._id)){
            //if (project.inscripciones.find(existe == user.idUsuario)) {
                console.log(i, user._id, "Segundo if")
                return "El usuario ya pertenece al proyecto indicado"
                
            } else {
                await Project.updateOne({ nombre: nombreProyecto },
                    {
                        $push: {
                            inscripciones: [user._id,
                                "Id Estudiante: " + user.idUsuario,
                                "Nombre estudiante: " + user.nombre,
                                "Id inscripcion: " + "101AAA",
                                "Estado: " + "inactivo",
                                "fase: " + "nula"]
                        }
                    })
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

const proyectos = async () => await Project.find({}).populate("inscripciones")

const getProject = async (nombreProyecto) => await Project.findOne({ nombreProyecto })

const getProjectId= async (idProyecto) => await Project.findOne({idProyecto})


module.exports = {
    addUserProject,
    getProject,
    getProjectId,
    proyectos,
    deleteProject,
    createProject
    
}