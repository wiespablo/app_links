//importación del módulo mysql
const mysql = require('mysql');
const { promisify }= require('util');
const { database} = require('./keys');

const pool = mysql.createPool(database);


pool.getConnection((err, connection)=>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONECCIÓN A LA BASE DE DATOS SE PERDIO ');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE VARIAS CONEXIONES');

        }
        if (err.code === 'ENCONNREFUSED') {
            console.error('LA CONEXIÓN A LA BASED DE DATOS FUE RECHAZADA');
        }
    }

    if (connection) connection.release();
    console.log('Base de Datos conectada');
    return;
});
//siugiente linea de codigo permite usar promesas
pool.query = promisify(pool.query);

module.exports = pool;

