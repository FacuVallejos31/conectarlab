const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app.js');
const { agregar } = require('./DB/mysql.js'); // Asumiendo que has exportado la función 'agregar' desde el archivo de la base de datos
const { eliminar } = require('./DB/mysql.js'); // Asegúrate de ajustar la ruta a tu archivo


app.use(bodyParser.json());

app.post('/api/docente', (req, res) => {
    const data = req.body;
    agregar('tabla', data)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
});

app.post('/api/escuela', (req, res) => {
    const data = req.body;
    agregar('tabla', data)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
});

// Endpoint para manejar la consulta por ID
app.get('/api/escuela', (req, res) => {
    const id = req.params.id;
    const TABLA = 'escuela';

    db.uno(TABLA, id)
    .then(result => {
        console.log('Resultado de la consulta:', result);
        // Aquí puedes procesar o utilizar el resultado como necesites
    })
    .catch(error => {
        console.error('Error al consultar:', error);
        // Aquí maneja el error de manera adecuada
    });
});

// Eliminar una escuela por ID
app.delete('/:id', async (req, res) => {
    try {
        await eliminar('escuela', req.params.id);
        res.status(200).json({ message: 'Fila eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando la fila' });
    }
});

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto", app.get("port"));
});