const connection = require('../config/db');
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt importado

const crearCliente = (req, res) => {
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
    cliente_pais,
    cliente_direccion,
  } = req.body;

  // Encriptar la contraseña antes de guardarla
  bcrypt.hash(usuario_contrasena, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al encriptar la contraseña: ', err);
      return res.status(500).json({ message: 'Hubo un error al encriptar la contraseña' });
    }

    // Transacción para insertar datos en usuario y cliente
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error al iniciar la transacción: ', err);
        return res.status(500).json({ message: 'Hubo un error al iniciar la transacción' });
      }

      // Insertar en la tabla usuario
      const queryUsuario = `
        INSERT INTO usuario (
          usuario_cedula, usuario_nombre, usuario_apellido, usuario_edad, 
          usuario_genero, usuario_email, usuario_telefono, usuario_usuario, 
          usuario_contrasena  
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          hashedPassword, // Usamos el hash de la contraseña
        ],
        (err, results) => {
          if (err) {
            console.error('Error al insertar en usuario: ', err);
            return connection.rollback(() => {
              res.status(500).json({ message: 'Hubo un error al crear el usuario' });
            });
          }

          const usuarioId = results.insertId;

          // Insertar en la tabla cliente
          const queryCliente = `
            INSERT INTO cliente (
              cliente_id, cliente_pais, cliente_direccion
            ) VALUES (?, ?, ?)
          `;

          connection.query(
            queryCliente,
            [usuarioId, cliente_pais, cliente_direccion],
            (err) => {
              if (err) {
                console.error('Error al insertar en cliente: ', err);
                return connection.rollback(() => {
                  res.status(500).json({ message: 'Hubo un error al crear el cliente' });
                });
              }

              // Confirmar la transacción
              connection.commit((err) => {
                if (err) {
                  console.error('Error al confirmar la transacción: ', err);
                  return connection.rollback(() => {
                    res.status(500).json({ message: 'Hubo un error al guardar los datos' });
                  });
                }
                res.status(201).json({ message: 'Cliente creado exitosamente', clienteId: usuarioId });
              });
            }
          );
        }
      );
    });
  });
};


// Obtener todos los clientes
const obtenerClientes = (req, res) => {
  const { q } = req.query; // Obtener parámetro de búsqueda
  let query = `
    SELECT u.usuario_id, u.usuario_cedula, u.usuario_nombre, u.usuario_apellido, u.usuario_edad,
           u.usuario_email, u.usuario_estado , u.usuario_telefono, c.cliente_pais, c.cliente_direccion
    FROM cliente c
    JOIN usuario u ON c.cliente_id = u.usuario_id
  `;
  const queryParams = [];

  if (q) {
    query += `
      WHERE u.usuario_cedula LIKE ? OR 
            CONCAT(u.usuario_nombre, ' ', u.usuario_apellido) LIKE ?
    `;
    queryParams.push(`%${q}%`, `%${q}%`);
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error al obtener clientes: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener los clientes' });
    }
    res.status(200).json(results);
  });
};

// Obtener un cliente por cédula
const obtenerClientePorCedula = (req, res) => {
  const { cedula } = req.params;
  const query = `
    SELECT u.usuario_id, u.usuario_cedula, u.usuario_nombre, u.usuario_apellido, 
           u.usuario_email, u.usuario_edad, u.usuario_genero, u.usuario_telefono, 
           u.usuario_estado, c.cliente_pais, c.cliente_direccion
    FROM cliente c
    JOIN usuario u ON c.cliente_id = u.usuario_id
    WHERE u.usuario_cedula = ?
  `;

  connection.query(query, [cedula], (err, results) => {
    if (err) {
      console.error('Error al obtener cliente: ', err);
      return res.status(500).json({ message: 'Hubo un error al obtener el cliente' });
    }
    res.status(200).json(results[0]);
  });
};

// Cambiar el estado de un cliente
const cambiarEstadoCliente = (req, res) => {
  const { cedula } = req.params;
  const { estado } = req.body;  // Suponiendo que "estado" es un campo como 'activo' o 'inactivo'

  const query = 'UPDATE usuario SET usuario_estado = ? WHERE usuario_cedula = ?';

  connection.query(query, [estado, cedula], (err) => {
    if (err) {
      console.error('Error al cambiar estado del cliente: ', err);
      return res.status(500).json({ message: 'Hubo un error al cambiar el estado del cliente' });
    }
    res.status(200).json({ message: 'Estado del cliente cambiado exitosamente' });
  });
};

// Editar un cliente
const editarCliente = (req, res) => {
  const { cedula } = req.params;
  const {
    usuario_nombre,
    usuario_apellido,
    usuario_email,
    usuario_telefono,
    cliente_pais,
    cliente_direccion,
  } = req.body;

  // Primero, actualizar los datos del cliente en la tabla usuario
  const queryUsuario = `
    UPDATE usuario 
    SET 
      usuario_nombre = ?, 
      usuario_apellido = ?, 
      usuario_email = ?, 
      usuario_telefono = ?
    WHERE usuario_cedula = ?
  `;

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
        return res.status(500).json({ message: 'Hubo un error al actualizar el cliente' });
      }

      // Luego, actualizar los datos del cliente en la tabla cliente
      const queryCliente = `
        UPDATE cliente
        SET 
          cliente_pais = ?, 
          cliente_direccion = ?
        WHERE cliente_id = (SELECT usuario_id FROM usuario WHERE usuario_cedula = ?)
      `;

      connection.query(
        queryCliente,
        [cliente_pais, cliente_direccion, cedula],
        (err) => {
          if (err) {
            console.error('Error al actualizar el cliente: ', err);
            return res.status(500).json({ message: 'Hubo un error al actualizar el cliente' });
          }

          res.status(200).json({ message: 'Cliente actualizado exitosamente' });
        }
      );
    }
  );
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorCedula,
  cambiarEstadoCliente,
  editarCliente,
};
