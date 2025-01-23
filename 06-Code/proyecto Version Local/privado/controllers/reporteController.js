const connection = require('../config/db');

// Reporte de Ventas
const obtenerReporteVentas = (req, res) => {
  const query = req.query.q || '';
  let sql = `
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

  if (query) {
    sql += ` WHERE 
              u_cliente.usuario_nombre LIKE ? OR 
              u_cliente.usuario_apellido LIKE ? OR 
              u_trabajador.usuario_nombre LIKE ? OR 
              u_trabajador.usuario_apellido LIKE ?`;
  }

  const queryParams = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];

  connection.query(sql, query ? queryParams : [], (err, results) => {
    if (err) {
      console.error('Error al obtener reporte de ventas:', err);
      return res.status(500).json({ message: 'Error al obtener reporte de ventas' });
    }
    res.status(200).json(results);
  });
};

// Reporte de Detalles de Ventas
const obtenerReporteDetallesVentas = (req, res) => {
  const query = req.query.q || '';
  let sql = `
    SELECT dv.*, 
           p.producto_nombre, 
           v.venta_fecha_creacion,
           u_cliente.usuario_nombre AS cliente_nombre,
           u_cliente.usuario_apellido AS cliente_apellido
    FROM detalle_venta dv
    JOIN producto p ON dv.detalle_venta_producto_id = p.producto_id
    JOIN venta v ON dv.detalle_venta_venta_id = v.venta_id
    JOIN cliente c ON v.venta_cliente_id = c.cliente_id
    JOIN usuario u_cliente ON c.cliente_id = u_cliente.usuario_id
  `;

  if (query) {
    sql += ` WHERE 
              p.producto_nombre LIKE ? OR 
              u_cliente.usuario_nombre LIKE ? OR 
              u_cliente.usuario_apellido LIKE ?`;
  }

  const queryParams = [`%${query}%`, `%${query}%`, `%${query}%`];

  connection.query(sql, query ? queryParams : [], (err, results) => {
    if (err) {
      console.error('Error al obtener detalles de ventas:', err);
      return res.status(500).json({ message: 'Error al obtener detalles de ventas' });
    }
    res.status(200).json(results);
  });
};

// Reporte de Productos
const obtenerReporteProductos = (req, res) => {
  const query = req.query.q || '';
  let sql = `
    SELECT producto_id, producto_nombre, producto_codigo, producto_descripcion, producto_precio, producto_stock, producto_estado
    FROM producto
  `;

  if (query) {
    sql += ` WHERE 
              producto_nombre LIKE ? OR 
              producto_codigo LIKE ?`;
  }

  const queryParams = [`%${query}%`, `%${query}%`];

  connection.query(sql, query ? queryParams : [], (err, results) => {
    if (err) {
      console.error('Error al obtener reporte de productos:', err);
      return res.status(500).json({ message: 'Error al obtener reporte de productos' });
    }
    res.status(200).json(results);
  });
};


// Reporte de Clientes
const obtenerReporteClientes = (req, res) => {
  const query = req.query.q || '';
  let sql = `
    SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, 
           c.cliente_pais, c.cliente_direccion 
    FROM cliente c
    JOIN usuario u ON c.cliente_id = u.usuario_id
  `;

  if (query) {
    sql += ` WHERE 
              u.usuario_nombre LIKE ? OR 
              u.usuario_apellido LIKE ? OR 
              c.cliente_pais LIKE ?`;
  }

  const queryParams = [`%${query}%`, `%${query}%`, `%${query}%`];

  connection.query(sql, query ? queryParams : [], (err, results) => {
    if (err) {
      console.error('Error al obtener reporte de clientes:', err);
      return res.status(500).json({ message: 'Error al obtener reporte de clientes' });
    }
    res.status(200).json(results);
  });
};

// Reporte de Trabajadores
const obtenerReporteTrabajadores = (req, res) => {
  const query = req.query.q || '';
  let sql = `
    SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, 
           t.trabajador_perfil, p.permiso_nombre 
    FROM trabajador t
    JOIN usuario u ON t.trabajador_id = u.usuario_id
    JOIN permiso p ON t.trabajador_permiso_id = p.permiso_id
  `;

  if (query) {
    sql += ` WHERE 
              u.usuario_nombre LIKE ? OR 
              u.usuario_apellido LIKE ? OR 
              t.trabajador_perfil LIKE ? OR 
              p.permiso_nombre LIKE ?`;
  }

  const queryParams = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];

  connection.query(sql, query ? queryParams : [], (err, results) => {
    if (err) {
      console.error('Error al obtener reporte de trabajadores:', err);
      return res.status(500).json({ message: 'Error al obtener reporte de trabajadores' });
    }
    res.status(200).json(results);
  });
};


module.exports = {
  obtenerReporteVentas,
  obtenerReporteDetallesVentas,
  obtenerReporteProductos,
  obtenerReporteClientes,
  obtenerReporteTrabajadores,
};
