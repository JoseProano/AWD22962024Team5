const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticaController');

router.get('/estadisticas', estadisticasController.obtenerEstadisticas);

module.exports = router;
