const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/ventas', ventaController.obtenerVentas);

router.post('/ventas', ventaController.crearVenta);

router.get('/ventas/:id', ventaController.obtenerVentaPorId);

router.put('/ventas/:id', ventaController.editarVenta); 

router.delete('/ventas/:id', ventaController.eliminarVenta);

module.exports = router;
