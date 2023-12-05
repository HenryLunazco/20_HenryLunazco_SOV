const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'ejemplo',
    port: '3306'
});

connection.connect((err) => {
    if (!err) {
        console.log("Conexion Exitosa");
    }else{
        console.log("No se a conectado");
    }
})

module.exports = connection