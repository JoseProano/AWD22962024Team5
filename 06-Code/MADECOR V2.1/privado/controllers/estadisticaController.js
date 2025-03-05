const pool = require('../config/db');

const obtenerEstadisticas = (req, res) => {
  const queryClientes = 'SELECT COUNT(*) AS totalClientes FROM cliente';
  const queryVentas = 'SELECT COUNT(*) AS totalVentas FROM venta';
  const queryProductos = 'SELECT COUNT(*) AS totalProductos FROM producto';
  const queryEmpleados = 'SELECT COUNT(*) AS totalEmpleados FROM trabajador';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(queryClientes, (errClientes, resultsClientes) => {
      if (errClientes) {
        console.error('Error al obtener total de clientes: ', errClientes);
        connection.release();
        return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
      }

      connection.query(queryVentas, (errVentas, resultsVentas) => {
        if (errVentas) {
          console.error('Error al obtener total de ventas: ', errVentas);
          connection.release();
          return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
        }

        connection.query(queryProductos, (errProductos, resultsProductos) => {
          if (errProductos) {
            console.error('Error al obtener total de productos: ', errProductos);
            connection.release();
            return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
          }

          connection.query(queryEmpleados, (errEmpleados, resultsEmpleados) => {
            if (errEmpleados) {
              console.error('Error al obtener total de empleados: ', errEmpleados);
              connection.release();
              return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
            }

            res.status(200).json({
              totalClientes: resultsClientes[0].totalClientes,
              totalVentas: resultsVentas[0].totalVentas,
              totalProductos: resultsProductos[0].totalProductos,
              totalEmpleados: resultsEmpleados[0].totalEmpleados,
            });

            connection.release();
          });
        });
      });
    });
  });
};

module.exports = {
  obtenerEstadisticas,
};
