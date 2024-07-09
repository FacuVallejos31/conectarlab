const TABLA = 'escuela';



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
            nom_escuela: body.nom_escuela,
            nom_localidad: body.nom_localidad,
            nom_director: body.nom_director,
            grado: body.grado,
            turno: body.turno,
            cant_alu: body.cant_alu,
            telefono: body.telefono,
            email: body.email,
            fe_visita: body.fe_visita,
            horario: body.horario,
            cue: body.cue
        }

        const respuesta = await db.agregar(TABLA, usuario);
        console.log('respuesta', respuesta)
        var insertId = 0;
        if (body.id == 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id;
        }
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