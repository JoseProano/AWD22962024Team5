const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.obtenerClientes);

router.post('/clientes', clienteController.crearCliente);

router.get('/clientes/:cedula', clienteController.obtenerClientePorCedula);

router.put('/clientes/:cedula', clienteController.editarCliente);

router.patch('/clientes/:cedula/estado', clienteController.cambiarEstadoCliente);

router.delete('/clientes/:cedula', clienteController.eliminarCliente);

module.exports = router;
