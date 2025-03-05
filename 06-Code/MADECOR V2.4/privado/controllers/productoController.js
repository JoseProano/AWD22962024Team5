const pool = require('../config/db');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo no es una imagen válido'), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadImageToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'productos',
        public_id: fileName.split('.')[0],
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

const crearProducto = async (req, res) => {
  const { producto_nombre, producto_descripcion, producto_codigo, producto_stock, producto_precio } = req.body;
  let producto_imagen = null;

  if (req.file) {
    try {
      producto_imagen = await uploadImageToCloudinary(req.file.buffer, req.file.originalname);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return res.status(500).json({ message: 'Error al subir la imagen' });
    }
  }

  const query = `
    INSERT INTO producto (
      producto_nombre,
      producto_descripcion,
      producto_codigo,
      producto_stock,
      producto_precio,
      producto_imagen
    ) VALUES (?, ?, ?, ?, ?, ?);
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(
      query,
      [producto_nombre, producto_descripcion, producto_codigo, producto_stock, producto_precio, producto_imagen],
      (err, results) => {
        connection.release();
        if (err) {
          console.error('Error al insertar el producto:', err);
          return res.status(500).json({ message: 'Hubo un error al crear el producto' });
        }
        res.status(201).json({ message: 'Producto creado exitosamente', productoId: results.insertId });
      }
    );
  });
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

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, queryParams, (err, results) => {
      connection.release();
      if (err) {
        console.error('Error al obtener productos: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener los productos' });
      }
      res.status(200).json(results);
    });
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

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error al obtener el producto: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener el producto' });
      }
      res.status(200).json(results[0]);
    });
  });
};

const cambiarEstadoProducto = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; 

  const query = 'UPDATE producto SET producto_estado = ? WHERE producto_id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [estado, id], (err) => {
      connection.release();
      if (err) {
        console.error('Error al cambiar estado del producto: ', err);
        return res.status(500).json({ message: 'Hubo un error al cambiar el estado del producto' });
      }
      res.status(200).json({ message: 'Estado del producto cambiado exitosamente' });
    });
  });
};

const editarProducto = async (req, res) => {
  const { id } = req.params;
  const { producto_nombre, producto_descripcion, producto_codigo, producto_stock, producto_precio } = req.body;
  let producto_imagen = req.body.producto_imagen;

  if (req.file) {
    try {
      producto_imagen = await uploadImageToCloudinary(req.file.buffer, req.file.originalname);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return res.status(500).json({ message: 'Error al subir la imagen' });
    }
  }

  const query = `
    UPDATE producto
    SET 
      producto_nombre = ?,
      producto_descripcion = ?,
      producto_codigo = ?,
      producto_stock = ?,
      producto_precio = ?,
      producto_imagen = ?
    WHERE producto_id = ?;
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(
      query,
      [producto_nombre, producto_descripcion, producto_codigo, producto_stock, producto_precio, producto_imagen, id],
      (err) => {
        connection.release();
        if (err) {
          console.error('Error al actualizar el producto:', err);
          return res.status(500).json({ message: 'Hubo un error al actualizar el producto' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
      }
    );
  });
};

const eliminarProducto = (req, res) => {
  const { id } = req.params;

  const obtenerImagenQuery = 'SELECT producto_imagen FROM producto WHERE producto_id = ?';
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(obtenerImagenQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error al obtener la imagen del producto: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener el producto' });
      }

      if (results.length === 0) {
        connection.release();
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      const productoImagen = results[0].producto_imagen;

      const eliminarQuery = 'DELETE FROM producto WHERE producto_id = ?';
      connection.query(eliminarQuery, [id], (err) => {
        if (err) {
          connection.release();
          console.error('Error al eliminar el producto: ', err);
          return res.status(500).json({ message: 'Hubo un error al eliminar el producto' });
        }

        if (productoImagen) {
          const imagePath = path.join(__dirname, '../publico', productoImagen);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('Error al eliminar la imagen del producto: ', err);
            }
          });
        }

        connection.release();
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
      });
    });
  });
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  cambiarEstadoProducto,
  editarProducto,
  eliminarProducto,
  upload,
};
