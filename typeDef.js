const { gql } = require('apollo-server-express')

//Nodemon
const typeDefs = gql`
    type Usuario{
        _id:String!
        idUsuario:Int!
        email:String!
        nombre:String!
        estado:String! 
        rol:String!
    }
    type lider{
        _id: String
        idUsuario:String
    }
    type inscripciones{
        _id:String
        idEstudiante: Int
        idInscripcion: String
        estadoInscripcion: String
        faseInscripcion:String
    }

    type avances{
        _id:String
        idEstudiante: Int
        idAvance: String
        descripcion: String
        observaciones:String
    }
    type Proyectos{
        _id:String!
        idProyecto:String!
        nombreProyecto:String!
        objetivosGenerales:String!
        lider:Usuario!
        inscripciones:[inscripciones]!
        avances:[avances]!
        faseProyecto:String!
        estadoProyecto:String!
        presupuesto:Float!
    }
    type Query{
        usuarios: [Usuario]
        Usuarios: [Usuario]
        getUsuarioNombre(nombre:String):Usuario
        getUsuarioId(idUsuario: Int):Usuario


        getUsuariorol(rol:String):String

        getrol(rol:String):Usuario



        rolProject(rol:String):Usuario
        rolEstudiante(rol:String):String
        proyectos:[Proyectos]
        getProjectNombre(nombreProyecto:String):Proyectos
        getProjectId(idProyecto:String):[Proyectos]
        getProjectLider(Usuario:String):Proyectos
        lider(rol:String!):Usuario
        estudiante(rol:String):Usuario
        rol:[Usuario]
    }
    input camposAvances{
        _id:String
        idEstudiante: Int
        idAvance: String
        descripcion: String
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
        lider:String
        estadoProyecto:String
        faseProyecto:String
        presupuesto:Float
    }

    input inscripcionesInput{
         _id: String,
        idUsuario: Int,
        nombre: String,
        idInscripcion: String,
        estadoInscripcion: String,
        faseInscripcion: String
    }

    type Mutation{
        createUser(user:UserInput):String
        createProject(project:ProjectInput):String
        activeUser(idUsuario:Int):String
        deleteUser(idUsuario:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(idUsuario:Int, nombreProyecto:String, idInscripcion:String):String
        activeProjet(idProyecto:String):String
        cambiarFase(idProyecto:String):String
        updateFase(_id:String):String
        autenticar(usuario:String, clave:String):String

        crearInscripcion(
            _id:String!
            idUsuario: Int
            idInscripcion: String
            estadoInscripcion: String):Proyectos

        crearAvance(
            _id:String
            idUsuario: Int
            idAvance: String
            descripcion: String
            observaciones:String):Proyectos

        crearObservacionAvance(
            _id:String
            idAvance: String
            observaciones:String):Proyectos


        editarUsuario(
             _id:String!
            idUsuario:Int!
            nombre:String!
            email:String!
            estado:String!
            rol:String!
        ):Usuario

        editarProyecto(
            _id: String!
            idProyecto: String!
            nombreProyecto: String!
            objetivosGenerales: String!
            presupuesto: Float!
        ):Proyectos

        modificarInscripcion(
            _id: String
            idEstudiante:Int
            idInscripcion:String
            estadoInscripcion:String
            estadoInscripcion:String):Proyectos

        editarAvances(idProyecto:String!, idAvance:String, campos: camposAvances):Proyectos

    }
`
module.exports = typeDefs
