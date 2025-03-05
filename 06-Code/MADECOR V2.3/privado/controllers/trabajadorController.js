const pool = require('../config/db');
const bcrypt = require('bcrypt');

const crearTrabajador = (req, res) => {
  const {
    usuario_cedula,
    usuario_nombre,
    usuario_apellido,
    usuario_edad,
    usuario_genero,
    usuario_email,
    usuario_telefono,
    usuario_usuario,
    usuario_contrasena,
    trabajador_perfil,
    trabajador_permiso_id,
    usuario_tipo, 
  } = req.body;

  bcrypt.hash(usuario_contrasena, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al encriptar la contraseña: ', err);
      return res.status(500).json({ message: 'Hubo un error al encriptar la contraseña' });
    }

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener la conexión: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
      }

      connection.beginTransaction((err) => {
        if (err) {
          console.error('Error al iniciar la transacción: ', err);
          connection.release();
          return res.status(500).json({ message: 'Hubo un error al iniciar la transacción' });
        }

        const queryUsuario = `
          INSERT INTO usuario (
            usuario_cedula, usuario_nombre, usuario_apellido, usuario_edad, 
            usuario_genero, usuario_email, usuario_telefono, usuario_usuario, 
            usuario_contrasena, usuario_tipo  
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
          queryUsuario,
          [
            usuario_cedula,
            usuario_nombre,
            usuario_apellido,
            usuario_edad,
            usuario_genero,
            usuario_email,
            usuario_telefono,
            usuario_usuario,
            hashedPassword,  
            usuario_tipo,  
          ],
          (err, results) => {
            if (err) {
              console.error('Error al insertar en usuario: ', err);
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ message: 'Hubo un error al crear el usuario' });
              });
            }

            const usuarioId = results.insertId;

            const queryTrabajador = `
              INSERT INTO trabajador (
                trabajador_id, trabajador_perfil, trabajador_permiso_id
              ) VALUES (?, ?, ?)
            `;

            connection.query(
              queryTrabajador,
              [usuarioId, trabajador_perfil, trabajador_permiso_id],
              (err) => {
                if (err) {
                  console.error('Error al insertar en trabajador: ', err);
                  return connection.rollback(() => {
                    connection.release();
                    res.status(500).json({ message: 'Hubo un error al crear el trabajador' });
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    console.error('Error al confirmar la transacción: ', err);
                    return connection.rollback(() => {
                      connection.release();
                      res.status(500).json({ message: 'Hubo un error al guardar los datos' });
                    });
                  }
                  connection.release();
                  res.status(201).json({ message: 'Trabajador creado exitosamente', trabajadorId: usuarioId });
                });
              }
            );
          }
        );
      });
    });
  });
};

const obtenerTrabajadores = (req, res) => {
  const { q } = req.query; 
  let query = `
    SELECT u.usuario_id, u.usuario_cedula, u.usuario_nombre, u.usuario_apellido, 
           u.usuario_email, u.usuario_estado, t.trabajador_perfil, p.permiso_nombre, p.permiso_detalle
    FROM trabajador t
    JOIN usuario u ON t.trabajador_id = u.usuario_id
    JOIN permiso p ON t.trabajador_permiso_id = p.permiso_id
  `;
  const queryParams = [];

  if (q) {
    query += `
      WHERE u.usuario_cedula LIKE ? OR 
            CONCAT(u.usuario_nombre, ' ', u.usuario_apellido) LIKE ?
    `;
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
        console.error('Error al obtener trabajadores: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener los trabajadores' });
      }
      res.status(200).json(results);
    });
  });
};

const obtenerTrabajadorPorCedula = (req, res) => {
  const { cedula } = req.params;
  const query = `
    SELECT u.usuario_id, u.usuario_cedula, u.usuario_nombre, u.usuario_apellido, 
           u.usuario_email, u.usuario_edad, u.usuario_genero, u.usuario_telefono, 
           u.usuario_estado, t.trabajador_perfil, p.permiso_nombre, p.permiso_detalle
    FROM trabajador t
    JOIN usuario u ON t.trabajador_id = u.usuario_id
    JOIN permiso p ON t.trabajador_permiso_id = p.permiso_id
    WHERE u.usuario_cedula = ?
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [cedula], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error al obtener trabajador: ', err);
        return res.status(500).json({ message: 'Hubo un error al obtener el trabajador' });
      }
      res.status(200).json(results[0]);
    });
  });
};

const cambiarEstadoTrabajador = (req, res) => {
  const { cedula } = req.params;
  const { estado } = req.body;  

  const query = 'UPDATE usuario SET usuario_estado = ? WHERE usuario_cedula = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(query, [estado, cedula], (err) => {
      connection.release();
      if (err) {
        console.error('Error al cambiar estado del trabajador: ', err);
        return res.status(500).json({ message: 'Hubo un error al cambiar el estado del trabajador' });
      }
      res.status(200).json({ message: 'Estado del trabajador cambiado exitosamente' });
    });
  });
};

const editarTrabajador = (req, res) => {
  const { cedula } = req.params;
  const {
    usuario_nombre,
    usuario_apellido,
    usuario_email,
    usuario_telefono,
    trabajador_perfil,
    trabajador_permiso_id,
  } = req.body;

  const queryUsuario = `
    UPDATE usuario 
    SET 
      usuario_nombre = ?, 
      usuario_apellido = ?, 
      usuario_email = ?, 
      usuario_telefono = ?
    WHERE usuario_cedula = ?
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(
      queryUsuario,
      [
        usuario_nombre,
        usuario_apellido,
        usuario_email,
        usuario_telefono,
        cedula,
      ],
      (err, results) => {
        if (err) {
          console.error('Error al actualizar el usuario: ', err);
          connection.release();
          return res.status(500).json({ message: 'Hubo un error al actualizar el trabajador' });
        }

        const queryTrabajador = `
          UPDATE trabajador
          SET 
            trabajador_perfil = ?, 
            trabajador_permiso_id = ?
          WHERE trabajador_id = (SELECT usuario_id FROM usuario WHERE usuario_cedula = ?)
        `;

        connection.query(
          queryTrabajador,
          [trabajador_perfil, trabajador_permiso_id, cedula],
          (err) => {
            connection.release();
            if (err) {
              console.error('Error al actualizar el trabajador: ', err);
              return res.status(500).json({ message: 'Hubo un error al actualizar el trabajador' });
            }

            res.status(200).json({ message: 'Trabajador actualizado exitosamente' });
          }
        );
      }
    );
  });
};

const eliminarTrabajador = (req, res) => {
  const { cedula } = req.params;

  const queryEliminarTrabajador = `
    DELETE FROM trabajador 
    WHERE trabajador_id = (SELECT usuario_id FROM usuario WHERE usuario_cedula = ?)
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener la conexión' });
    }

    connection.query(queryEliminarTrabajador, [cedula], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error al eliminar el trabajador: ', err);
        return res.status(500).json({ message: 'Hubo un error al eliminar el trabajador' });
      }

      if (results.affectedRows === 0) {
        connection.release();
        return res.status(404).json({ message: 'Trabajador no encontrado' });
      }

      const queryEliminarUsuario = `
        DELETE FROM usuario 
        WHERE usuario_cedula = ?
      `;

      connection.query(queryEliminarUsuario, [cedula], (err) => {
        connection.release();
        if (err) {
          console.error('Error al eliminar el usuario: ', err);
          return res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
        }

        res.status(200).json({ message: 'Trabajador eliminado exitosamente' });
      });
    });
  });
};

module.exports = {
  crearTrabajador,
  obtenerTrabajadores,
  obtenerTrabajadorPorCedula,
  cambiarEstadoTrabajador,
  editarTrabajador, 
  eliminarTrabajador,
};

