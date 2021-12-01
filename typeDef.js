const { gql } = require('apollo-server-express')

//Nodemon
const typeDefs = gql`
    type Usuario{
        idUsuario: Int
        email: String
        nombre: String
        estado: String  
        rol: String
    }

    type inscripciones{
        idEstudiante : Int
        idInscripcion :String
        estadoInscripcion :String
        faseInscripcion : String
    }
    type lider{
        idLider: Int
        nombreLider:String
    }
    type Proyectos{
        idProyecto: String
        nombreProyecto:String
        lider:[lider]
        inscripciones:[inscripciones]
        estadoProyecto:String
        presupuesto:Int
    }
    type Query{
        usuarios: [Usuario] 
        usuario(idUsuario: Int): Usuario
        getUsuario(idUsuario:Int):Usuario
        getUsuarioNombre(nombre:String):Usuario
        getUsuarioId(idUsuario: Int):Usuario
        getUsuarioRol(rol:String):Usuario
        proyectos:[Proyectos]
        getProject(nombreProyecto:String):Proyectos
        getProjectId(idProyecto:String):Proyectos
        lider:[lider]
    }
    input liderInput{
        idLider: Int
        nombreLider:String        
    }
    input UserInput{
        idUsuario:Int
        nombre: String
        email : String
        clave: String
        estado:String
        rol: String
    }
    input ProjectInput{
        idProyecto: String
        nombreProyecto: String
        objetivosGenerales: String
        faseProyecto : String
        estadoProyecto: String
        lider:String
        presupuesto: Int
    }

    input inscripcionesInput{

        idInscripcion :String
        estadoInscripcion :String
        faseInscripcion : String
    }

    type Mutation{
        createUser(user:UserInput):String
        createProject(project:ProjectInput):String
        activeUser(idUsuario:Int):String
        deleteUser(idUsuario:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(idUsuario:Int, nombreProyecto:String, idInscripcion:String):String
        activeProjet(idProyecto:String):String
    }
`
module.exports = typeDefs

//        createProject(project:ProjectInput,lider:liderInput):String