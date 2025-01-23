const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Ruta para obtener todos los clientes
router.get('/clientes', clienteController.obtenerClientes);

// Ruta para crear un nuevo cliente
router.post('/clientes', clienteController.crearCliente);

// Ruta para obtener un cliente por cédula
router.get('/clientes/:cedula', clienteController.obtenerClientePorCedula);

// Ruta para editar un cliente
router.put('/clientes/:cedula', clienteController.editarCliente);

// Ruta para cambiar el estado de un cliente (activo / inactivo)
router.patch('/clientes/:cedula/estado', clienteController.cambiarEstadoCliente);

module.exports = router;
