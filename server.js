const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const { notFoundiddleware } = require('./middleware/notFound');
require('./database'); 


const app = express();  

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/session', (req, res)=>{
    console.log(req.session)
    res.send('<h1>This is session application<h1>') 
})
 
app.use(notFoundiddleware); 
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(4000, ()=>console.log(`App is running on server ${PORT}`)) 