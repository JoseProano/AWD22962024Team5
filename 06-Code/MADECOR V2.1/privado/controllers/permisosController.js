const pool = require('../config/db');

const crearPermiso = (req, res) => {
  const { permiso_nombre, permiso_descripcion, permiso_detalle } = req.body;

  const query = 'INSERT INTO permiso (permiso_nombre, permiso_descripcion, permiso_detalle) VALUES (?, ?, ?)';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [permiso_nombre, permiso_descripcion, JSON.stringify(permiso_detalle)], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error al crear el permiso: ', err);
        return res.status(500).json({ message: 'Hubo un error al guardar el permiso' });
      }
      res.status(201).json({ message: 'Permiso creado exitosamente', permisoId: results.insertId });
    });
  });
};

const obtenerPermisos = (req, res) => {
  const { q } = req.query; 
  let query = 'SELECT * FROM permiso';
  const queryParams = [];

  if (q) {
    query += ' WHERE permiso_id LIKE ? OR permiso_nombre LIKE ?';
    queryParams.push(`%${q}%`, `%${q}%`);
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, queryParams, (err, results) => {
      connection.release();
      if (err) {
        console.error('Error al obtener permisos: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener los permisos' });
      }
      res.status(200).json(results);
    });
  });
};

const obtenerPermisoPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM permiso WHERE permiso_id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error al obtener permiso: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener el permiso' });
      }
      res.status(200).json(results[0]);
    });
  });
};

const editarPermiso = (req, res) => {
  const { id } = req.params;
  const { permiso_nombre, permiso_descripcion, permiso_detalle } = req.body;

  const query = 'UPDATE permiso SET permiso_nombre = ?, permiso_descripcion = ?, permiso_detalle = ? WHERE permiso_id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [permiso_nombre, permiso_descripcion, JSON.stringify(permiso_detalle), id], (err) => {
      connection.release();
      if (err) {
        console.error('Error al editar el permiso: ', err);
        return res.status(500).json({ message: 'Hubo un error al editar el permiso' });
      }
      res.status(200).json({ message: 'Permiso editado exitosamente' });
    });
  });
};

const cambiarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const query = 'UPDATE permiso SET permiso_estado = ? WHERE permiso_id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [estado, id], (err) => {
      connection.release();
      if (err) {
        console.error('Error al cambiar estado del permiso: ', err);
        return res.status(500).json({ message: 'Hubo un error al cambiar el estado del permiso' });
      }
      res.status(200).json({ message: 'Estado del permiso cambiado exitosamente' });
    });
  });
};

const eliminarPermiso = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM permiso WHERE permiso_id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [id], (err) => {
      connection.release();
      if (err) {
        console.error('Error al eliminar el permiso: ', err);
        return res.status(500).json({ message: 'Hubo un error al eliminar el permiso' });
      }
      res.status(200).json({ message: 'Permiso eliminado exitosamente' });
    });
  });
};

module.exports = { 
  crearPermiso, 
  obtenerPermisos, 
  obtenerPermisoPorId, 
  editarPermiso, 
  cambiarEstado,
  eliminarPermiso,
};
