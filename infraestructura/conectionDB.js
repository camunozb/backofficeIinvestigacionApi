const mongoose = require('mongoose')

const urlDB ='mongodb+srv://futuretech:futuretech@cluster0.mxh1i.mongodb.net/FTech-desarrollo?retryWrites=true&w=majority'

mongoose.connect(urlDB);
const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("conectado a la bd")
})
