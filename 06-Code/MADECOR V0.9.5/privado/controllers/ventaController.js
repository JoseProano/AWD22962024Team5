const connection = require('../config/db');

// Crear una nueva venta
const crearVenta = (req, res) => {
    const {
      venta_cliente_id,
      venta_trabajador_id,
      venta_iva,
      venta_total,
      detalles,
    } = req.body;
  
    // Transacción para insertar datos en venta y detalle_venta
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error al iniciar la transacción: ', err);
        return res.status(500).json({ message: 'Hubo un error al iniciar la transacción' });
      }
  
      // Insertar en la tabla venta
      const queryVenta = `
        INSERT INTO venta (
          venta_cliente_id, venta_trabajador_id, venta_iva, 
          venta_total
        ) VALUES (?, ?, ?, ?)
      `;
  
      connection.query(
        queryVenta,
        [venta_cliente_id, venta_trabajador_id, venta_iva, venta_total],
        (err, results) => {
          if (err) {
            console.error('Error al insertar en venta: ', err);
            return connection.rollback(() => {
              res.status(500).json({ message: 'Hubo un error al crear la venta' });
            });
          }
  
          const ventaId = results.insertId;
  
          // Asegúrate de que 'detalles' sea un array antes de utilizar 'map'
          if (!Array.isArray(detalles)) {
            console.error('Detalles no es un array');
            return connection.rollback(() => {
              res.status(500).json({ message: 'Formato inválido para detalles' });
            });
          }
  
          // Insertar en la tabla detalle_venta
          const detalleVentas = detalles.map(detalle => [
            ventaId,
            detalle.producto_id,
            detalle.cantidad,
            detalle.precio_unitario,
            detalle.cantidad * detalle.precio_unitario // subtotal
          ]);
  
          const queryDetalleVenta = `
            INSERT INTO detalle_venta (
              detalle_venta_venta_id, detalle_venta_producto_id, 
              detalle_venta_cantidad, detalle_venta_precio_unitario, 
              detalle_venta_subtotal
            ) VALUES ?
          `;
  
          connection.query(
            queryDetalleVenta,
            [detalleVentas],
            (err) => {
              if (err) {
                console.error('Error al insertar en detalle_venta: ', err);
                return connection.rollback(() => {
                  res.status(500).json({ message: 'Hubo un error al crear los detalles de la venta' });
                });
              }
  
              // Confirmar la transacción
              connection.commit((err) => {
                if (err) {
                  console.error('Error al confirmar la transacción: ', err);
                  return connection.rollback(() => {
                    res.status(500).json({ message: 'Hubo un error al guardar los datos' });
                  });
                }
                res.status(201).json({ message: 'Venta creada exitosamente', ventaId });
              });
            }
          );
        }
      );
    });
  };  

// Obtener todas las ventas
const obtenerVentas = (req, res) => {
  const { q } = req.query; // Obtener parámetro de búsqueda
  let query = `
    SELECT v.*, 
           u_cliente.usuario_nombre AS cliente_nombre, 
           u_cliente.usuario_apellido AS cliente_apellido,
           u_trabajador.usuario_nombre AS trabajador_nombre, 
           u_trabajador.usuario_apellido AS trabajador_apellido
    FROM venta v
    JOIN cliente c ON v.venta_cliente_id = c.cliente_id
    JOIN usuario u_cliente ON c.cliente_id = u_cliente.usuario_id
    JOIN trabajador t ON v.venta_trabajador_id = t.trabajador_id
    JOIN usuario u_trabajador ON t.trabajador_id = u_trabajador.usuario_id
  `;
  const queryParams = [];

  if (q) {
    query += `
      WHERE u_cliente.usuario_nombre LIKE ? OR 
            u_cliente.usuario_apellido LIKE ? OR
            u_trabajador.usuario_nombre LIKE ? OR
            u_trabajador.usuario_apellido LIKE ?
    `;
    queryParams.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error al obtener ventas: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener las ventas' });
    }
    res.status(200).json(results);
  });
};

// Obtener una venta por ID
const obtenerVentaPorId = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT v.*, 
           u_cliente.usuario_nombre AS cliente_nombre, 
           u_cliente.usuario_apellido AS cliente_apellido,
           u_trabajador.usuario_nombre AS trabajador_nombre, 
           u_trabajador.usuario_apellido AS trabajador_apellido
    FROM venta v
    JOIN cliente c ON v.venta_cliente_id = c.cliente_id
    JOIN usuario u_cliente ON c.cliente_id = u_cliente.usuario_id
    JOIN trabajador t ON v.venta_trabajador_id = t.trabajador_id
    JOIN usuario u_trabajador ON t.trabajador_id = u_trabajador.usuario_id
    WHERE v.venta_id = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener la venta: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la venta' });
    }
    res.status(200).json(results[0]);
  });
};

// Editar una venta
const editarVenta = (req, res) => {
  const { id } = req.params;
  const {
    venta_cliente_id,
    venta_trabajador_id,
    venta_iva,
    venta_total,
  } = req.body;

  const queryVenta = `
    UPDATE venta
    SET 
      venta_cliente_id = ?, 
      venta_trabajador_id = ?, 
      venta_iva = ?, 
      venta_total = ?
    WHERE venta_id = ?
  `;

  connection.query(
    queryVenta,
    [venta_cliente_id, venta_trabajador_id, venta_iva, venta_total, id],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar la venta: ', err);
        return res.status(500).json({ message: 'Hubo un error al actualizar la venta' });
      }

      res.status(200).json({ message: 'Venta actualizada exitosamente' });
    }
  );
};

module.exports = {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  editarVenta,
};
