const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para obtener todos los productos
router.get('/productos', productoController.obtenerProductos);

// Ruta para crear un nuevo producto
router.post('/productos', productoController.upload.single('productoImagen'), productoController.crearProducto);

// Ruta para obtener un producto por ID
router.get('/productos/:id', productoController.obtenerProductoPorId);

// Ruta para editar un producto
router.put('/productos/:id', productoController.upload.single('editarProductoImagen'), productoController.editarProducto);

// Ruta para cambiar el estado de un producto (activo / inactivo)
router.patch('/productos/:id/estado', productoController.cambiarEstadoProducto);

module.exports = router;
