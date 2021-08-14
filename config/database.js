const mongoose = require('mongoose');
const dotenv = require('dotenv')


 
dotenv.config();
const db = process.env.LOCAL_DATABASE; 
const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}


mongoose.connect(db, dbOptions)
const dbConnection = mongoose.connection;

dbConnection.on('error', ()=>console.log(error)); 
dbConnection.once('open', ()=>console.log('database connected'))

module.exports=dbConnection;

