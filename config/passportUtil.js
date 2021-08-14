const crypto = require('crypto'); 

const generatePassword = (password)=> {
    const salt = crypto.randomBytes(32).toString('hex'); 
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex'); 
    return {salt, hash}
}

const validatePassword = (password, salt, hash)=>{
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex'); 
    return verifyHash===hash;
}

module.exports = {generatePassword, validatePassword};
