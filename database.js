const express=require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv')


const MongoStore = require('connect-mongo')(session);


const app = express();  

 
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

const sessionStore = new MongoStore({
mongooseConnection: dbConnection, 
collection:'sessions'
})

app.use(session({ 
    secret:"something", 
    resave:false,
    saveUninitialized:true, 
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

