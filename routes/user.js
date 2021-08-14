const express = require('express'); 
const passport = require('passport'); 
const path = require('path');

const User = require('../models/user')
require('../config/passport'); 


const { generatePassword } = require('../config/passportUtil');

const app = express(); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs')

app.use(passport.initialize())
app.use(passport.session())

const router = express.Router();


router.get('/', (req, res)=>{
    res.render('register.ejs')
})

router.get('/login', (req, res)=>{
 res.render('login.ejs')
})

router.post('/login', (req, res)=>{
    res.send('this is login post route')
})

router.post('/register', (req, res)=>{
    const {salt, hash} = generatePassword(req.body.password)
    const newUser = new User({
        username:req.body.username,
        hash,
        salt
    })

    newUser.save().then(user=>{
        console.log(user)
        res.send(`${user}`)
    })

})

module.exports = router;