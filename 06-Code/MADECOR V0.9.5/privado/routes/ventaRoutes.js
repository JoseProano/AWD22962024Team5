const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Ruta para obtener todas las ventas
router.get('/ventas', ventaController.obtenerVentas);

// Ruta para crear una nueva venta
router.post('/ventas', ventaController.crearVenta);

// Ruta para obtener una venta por ID
router.get('/ventas/:id', ventaController.obtenerVentaPorId);

// Ruta para editar una venta
router.put('/ventas/:id', ventaController.editarVenta);

module.exports = router;
