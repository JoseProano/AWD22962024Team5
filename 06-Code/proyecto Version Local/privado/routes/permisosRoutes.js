const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisosController');

// Ruta para obtener todos los permisos
router.get('/permisos', permisosController.obtenerPermisos);

// Ruta para crear un nuevo permiso
router.post('/permisos', permisosController.crearPermiso);

// Ruta para obtener un permiso por ID
router.get('/permisos/:id', permisosController.obtenerPermisoPorId);

// Ruta para editar un permiso
router.put('/permisos/:id', permisosController.editarPermiso);

// Ruta para cambiar el estado de un permiso
router.patch('/permisos/:id/estado', permisosController.cambiarEstado);

module.exports = router;
