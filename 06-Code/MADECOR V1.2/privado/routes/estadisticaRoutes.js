const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticaController'); // Asegúrate de crear este controlador

router.get('/estadisticas', estadisticasController.obtenerEstadisticas);

module.exports = router;
