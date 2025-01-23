const express = require('express');
const router = express.Router();
const trabajadoresController = require('../controllers/trabajadorController');

// Ruta para obtener todos los trabajadores
router.get('/trabajadores', trabajadoresController.obtenerTrabajadores);

// Ruta para crear un nuevo trabajador
router.post('/trabajadores', trabajadoresController.crearTrabajador);

// Ruta para obtener un trabajador por cédula
router.get('/trabajadores/:cedula', trabajadoresController.obtenerTrabajadorPorCedula);

// Ruta para editar un trabajador
router.put('/trabajadores/:cedula', trabajadoresController.editarTrabajador);

// Ruta para cambiar el estado de un trabajador (activo / inactivo)
router.patch('/trabajadores/:cedula/estado', trabajadoresController.cambiarEstadoTrabajador);

module.exports = router;
