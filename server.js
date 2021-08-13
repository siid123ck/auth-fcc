const express=require('express')

const app = express(); 

const middleware1 = (req, res, next)=>{
    console.log('This is middleware 1'); 
    next()
}
const notFoundiddleware = (req, res, next)=>{
    console.log('This is not found middleware '); 
    const errObj = new Error('This rout is not defined')
    next(errObj)
}

const errorHandler = (err, req, res, next)=>{
    res.send(`<h1>${err}</h1>`)
}

app.use(middleware1);
app.get('/', (req, res)=>{
    res.end('This is express application')
})
 
app.use(notFoundiddleware); 
app.use(errorHandler)
app.listen(4000, ()=>console.log('App is running on server')) 