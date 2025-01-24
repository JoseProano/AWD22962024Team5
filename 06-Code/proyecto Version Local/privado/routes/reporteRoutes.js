const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/reporte/ventas', reporteController.obtenerReporteVentas);
router.get('/reporte/detalles-ventas', reporteController.obtenerReporteDetallesVentas);
router.get('/reporte/productos', reporteController.obtenerReporteProductos);
router.get('/reporte/clientes', reporteController.obtenerReporteClientes);
router.get('/reporte/trabajadores', reporteController.obtenerReporteTrabajadores);

module.exports = router;
