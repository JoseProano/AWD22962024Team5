const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/productos', productoController.obtenerProductos);

router.post('/productos', productoController.upload.single('productoImagen'), productoController.crearProducto);

router.get('/productos/:id', productoController.obtenerProductoPorId);

router.put('/productos/:id', productoController.upload.single('editarProductoImagen'), productoController.editarProducto);

router.patch('/productos/:id/estado', productoController.cambiarEstadoProducto);

module.exports = router;
