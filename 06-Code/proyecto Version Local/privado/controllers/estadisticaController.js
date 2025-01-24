const connection = require('../config/db');

// Obtener estadísticas generales
const obtenerEstadisticas = (req, res) => {
  // Consulta para contar el número de registros en las tablas de clientes, ventas, productos y empleados
  const queryClientes = 'SELECT COUNT(*) AS totalClientes FROM cliente';
  const queryVentas = 'SELECT COUNT(*) AS totalVentas FROM venta';
  const queryProductos = 'SELECT COUNT(*) AS totalProductos FROM producto';
  const queryEmpleados = 'SELECT COUNT(*) AS totalEmpleados FROM trabajador';

  // Realizar todas las consultas en paralelo
  connection.query(queryClientes, (errClientes, resultsClientes) => {
    if (errClientes) {
      console.error('Error al obtener total de clientes: ', errClientes);
      return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
    }

    connection.query(queryVentas, (errVentas, resultsVentas) => {
      if (errVentas) {
        console.error('Error al obtener total de ventas: ', errVentas);
        return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
      }

      connection.query(queryProductos, (errProductos, resultsProductos) => {
        if (errProductos) {
          console.error('Error al obtener total de productos: ', errProductos);
          return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
        }

        connection.query(queryEmpleados, (errEmpleados, resultsEmpleados) => {
          if (errEmpleados) {
            console.error('Error al obtener total de empleados: ', errEmpleados);
            return res.status(500).json({ message: 'Hubo un error al obtener estadísticas' });
          }

          // Enviar los resultados al frontend
          res.status(200).json({
            totalClientes: resultsClientes[0].totalClientes,
            totalVentas: resultsVentas[0].totalVentas,
            totalProductos: resultsProductos[0].totalProductos,
            totalEmpleados: resultsEmpleados[0].totalEmpleados,
          });
        });
      });
    });
  });
};

module.exports = {
  obtenerEstadisticas,
};
