const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisosController');

router.get('/permisos', permisosController.obtenerPermisos);

router.post('/permisos', permisosController.crearPermiso);

router.get('/permisos/:id', permisosController.obtenerPermisoPorId);

router.put('/permisos/:id', permisosController.editarPermiso);

router.patch('/permisos/:id/estado', permisosController.cambiarEstado);

module.exports = router;
