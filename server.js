const express=require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const { notFoundiddleware } = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler'); 

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


app.get('/', (req, res)=>{
    console.log(req.session)
    req.session.viewCount ? req.session.viewCount = req.session.viewCount+1 : req.session.viewCount=1;
    res.send(`<h1>You visited  express application ${req.session.viewCount} times</h1>`)
})
 
 
app.use(notFoundiddleware); 
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(4000, ()=>console.log(`App is running on server ${PORT}`)) 