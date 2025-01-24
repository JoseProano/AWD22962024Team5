const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/ventas', ventaController.obtenerVentas);

router.post('/ventas', ventaController.crearVenta);

router.get('/ventas/:id', ventaController.obtenerVentaPorId);

module.exports = router;
