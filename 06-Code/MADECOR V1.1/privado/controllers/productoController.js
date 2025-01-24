const connection = require('../config/db');
const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const crearProducto = (req, res) => {
  const {
    producto_nombre,
    producto_descripcion,
    producto_codigo,
    producto_stock,
    producto_precio,
  } = req.body;

  const producto_imagen = req.file ? `/images/${req.file.filename}` : null;

  const query = `
    INSERT INTO producto (
      producto_nombre,
      producto_descripcion,
      producto_codigo,
      producto_stock,
      producto_precio,
      producto_imagen
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      producto_nombre,
      producto_descripcion,
      producto_codigo,
      producto_stock,
      producto_precio,
      producto_imagen,
    ],
    (err, results) => {
      if (err) {
        console.error('Error al insertar el producto: ', err);
        return res.status(500).json({ message: 'Hubo un error al crear el producto' });
      }
      res.status(201).json({ message: 'Producto creado exitosamente', productoId: results.insertId });
    }
  );
};

const obtenerProductos = (req, res) => {
  const { q } = req.query; 
  let query = `
    SELECT producto_id, producto_nombre, producto_descripcion, producto_codigo, 
           producto_stock, producto_precio, producto_imagen, producto_estado, producto_fecha_creacion
    FROM producto
  `;
  const queryParams = [];

  if (q) {
    query += ` WHERE producto_nombre LIKE ? OR producto_codigo LIKE ?`;
    queryParams.push(`%${q}%`, `%${q}%`);
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error al obtener productos: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener los productos' });
    }
    res.status(200).json(results);
  });
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT producto_id, producto_nombre, producto_descripcion, producto_codigo, 
           producto_stock, producto_precio, producto_imagen, producto_estado, producto_fecha_creacion
    FROM producto
    WHERE producto_id = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener el producto' });
    }
    res.status(200).json(results[0]);
  });
};

const cambiarEstadoProducto = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; 

  const query = 'UPDATE producto SET producto_estado = ? WHERE producto_id = ?';

  connection.query(query, [estado, id], (err) => {
    if (err) {
      console.error('Error al cambiar estado del producto: ', err);
      return res.status(500).json({ message: 'Hubo un error al cambiar el estado del producto' });
    }
    res.status(200).json({ message: 'Estado del producto cambiado exitosamente' });
  });
};

const editarProducto = (req, res) => {
  const { id } = req.params;
  const {
    producto_nombre,
    producto_descripcion,
    producto_codigo,
    producto_stock,
    producto_precio,
  } = req.body;

  const producto_imagen = req.file ? `images/${req.file.filename}` : req.body.producto_imagen;

  const query = `
    UPDATE producto
    SET 
      producto_nombre = ?,
      producto_descripcion = ?,
      producto_codigo = ?,
      producto_stock = ?,
      producto_precio = ?,
      producto_imagen = ?
    WHERE producto_id = ?
  `;

  connection.query(
    query,
    [
      producto_nombre,
      producto_descripcion,
      producto_codigo,
      producto_stock,
      producto_precio,
      producto_imagen,
      id,
    ],
    (err) => {
      if (err) {
        console.error('Error al actualizar el producto: ', err);
        return res.status(500).json({ message: 'Hubo un error al actualizar el producto' });
      }
      res.status(200).json({ message: 'Producto actualizado exitosamente' });
    }
  );
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  cambiarEstadoProducto,
  editarProducto,
  upload,
};