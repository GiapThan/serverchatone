const api = require('express').Router()
const AuthController = require('./controllers/authControllers')

api.post('/user/sign', AuthController.sign)



api.get('/keepserver', (req,res) =>{
    res.json('okkk')
})

module.exports = api
