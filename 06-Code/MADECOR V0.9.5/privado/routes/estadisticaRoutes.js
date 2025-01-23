const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticaController'); // Asegúrate de crear este controlador

// Ruta para obtener estadísticas generales
router.get('/estadisticas', estadisticasController.obtenerEstadisticas);

module.exports = router;
