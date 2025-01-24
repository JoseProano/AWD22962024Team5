const express = require('express');
const router = express.Router();
const trabajadoresController = require('../controllers/trabajadorController');

router.get('/trabajadores', trabajadoresController.obtenerTrabajadores);

router.post('/trabajadores', trabajadoresController.crearTrabajador);

router.get('/trabajadores/:cedula', trabajadoresController.obtenerTrabajadorPorCedula);

router.put('/trabajadores/:cedula', trabajadoresController.editarTrabajador);

router.patch('/trabajadores/:cedula/estado', trabajadoresController.cambiarEstadoTrabajador);

module.exports = router;
