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

app.use(express.json());
app.use(express.urlencoded({extended:true}))


const notFoundiddleware = (req, res, next)=>{
    console.log('This is not found middleware '); 
    const errObj = new Error('This rout is not defined')
    next(errObj)
}

const errorHandler = (err, req, res, next)=>{
    res.send(`<h1>${err}</h1>`)
}

app.get('/', (req, res)=>{
    res.end('This is express application')
})
 
app.use(notFoundiddleware); 
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(4000, ()=>console.log(`App is running on server ${PORT}`)) 