const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
    user: 'root',
    password: 'LiuUfasRZmAuMAXDKuvUBnOfwhZlxDwN',
    database: 'railway',
    port: 45233,
    connectTimeout: 30000,
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
