const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/productos', productoController.obtenerProductos);

router.post('/productos', productoController.upload.single('productoImagen'), productoController.crearProducto);

router.get('/productos/:id', productoController.obtenerProductoPorId);

router.put('/productos/:id', productoController.upload.single('productoImagen'), productoController.editarProducto);

router.patch('/productos/:id/estado', productoController.cambiarEstadoProducto);

router.delete('/productos/:id', productoController.eliminarProducto);

module.exports = router;
