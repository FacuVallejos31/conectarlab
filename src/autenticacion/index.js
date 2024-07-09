const jwt = require ('jsonwebtoken');
config = require ('../config.js');


function asignarToken(data){
    return jwt.sign(data, secret);//token
}

module.exports = {
    asignarToken 
}