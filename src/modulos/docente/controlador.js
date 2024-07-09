const TABLA = 'docente';
const autenticacion = require('../autenticacion');

module.exports = function (dbInyectada){

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql.js');
    }
    function todos(){
        return db.todos(TABLA);
    }
    
    function uno(id){
        return db.uno(TABLA, id);
    }
    
    async function agregar(body){
        const usuario = {
            id: body.id,
            nom_apellido: body.nom_apellido,
            escuela: body.escuela,
            dni: body.dni,
            email: body.email,
            telefono: body.telefono
        }

        const respuesta = await db.agregar(TABLA, usuario);
        console.log('respuesta', respuesta)
        var insertId = 0;
        if (body.id == 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id;
        }

        var respuesta2 = '';
        if(body.usuario || body.password){
            respuesta2 = await autenticacion.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.usuario
            });
        }
        return respuesta2; 
    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar
    }
}