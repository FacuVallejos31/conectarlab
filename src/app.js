const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const escuela = require('./modulos/escuela/rutas.js')
const docente = require('./modulos/docente/rutas.js')
const error = require('./red/errors.js');
//const autenticacion = require('./modulos/autenticacion/rutas.js');



const app = express ();

var corsOpcions = {
    origin: '*',
    optionsSuccessStatus: 200
}

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

//Configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/escuela', escuela);
app.use('/api/docente', docente);

app.use(error);


module.exports = app; 