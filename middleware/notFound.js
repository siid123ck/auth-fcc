
const notFoundiddleware = (req, res, next)=>{
    const errObj = new Error('This rout is not defined')
    next(errObj)
}

module.exports = {notFoundiddleware}