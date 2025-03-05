const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'yamanote.proxy.rlwy.net',
  user: 'root',
  password: 'LiuUfasRZmAuMAXDKuvUBnOfwhZlxDwN',
  database: 'railway',
  port: 45233,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
  connection.release(); 
});

module.exports = pool;
