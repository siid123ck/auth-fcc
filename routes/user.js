const express = require('express'); 
const { generatePassword } = require('../config/passportUtil');



const router = express.Router();


router.get('/', (req, res)=>{
    res.send('<h1>this is user page </h1>')
})

router.get('/login', (req, res)=>{
    res.send('<h1> this is login page </h1>')
})

router.get('/register', (req, res)=>{
    res.send('<h1> this is register page </h1>')
})
router.post('/register', (req, res)=>{
    const {salt, hash} = generatePassword(req.body.password)
    console.log(`salt: ${salt} and hash: ${hash}`)
    res.send('<h1> this is register page </h1>')
})

module.exports = router;