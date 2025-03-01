const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require("path");
const db = require('./config/db');
const { OAuth2Client } = require("google-auth-library");
const permisosRoutes = require('./routes/permisosRoutes');
const trabajadorRoutes = require('./routes/trabajadorRoutes'); 
const clienteRoutes = require('./routes/clienteRoutes'); 
const estadisticaRoutes = require('./routes/estadisticaRoutes'); 
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json()); 

// Configurar CORS para permitir solicitudes desde el dominio del frontend
app.use(cors({
  origin: 'https://madecor-frontend.vercel.app', // Cambia esto al dominio de tu frontend
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://madecor-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/madecor', permisosRoutes);

app.use('/madecor', trabajadorRoutes);

app.use('/madecor', clienteRoutes);

app.use('/madecor', estadisticaRoutes);

app.use('/madecor', productoRoutes);

app.use('/madecor', ventaRoutes);

app.use('/madecor', reporteRoutes);

app.post("/login", (req, res) => {
  const { usuario_usuario, usuario_contrasena } = req.body;

  const queryUsuario = `
    SELECT usuario_nombre, usuario_apellido, usuario_email, usuario_tipo, usuario_id, usuario_contrasena
    FROM usuario
    WHERE usuario_usuario = ?
  `;

  db.query(queryUsuario, [usuario_usuario], (err, results) => {
    if (err) {
      console.error("Error al consultar el usuario:", err);
      return res.status(500).send("Error del servidor.");
    }

    if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(usuario_contrasena, user.usuario_contrasena, (err, match) => {
        if (err) {
          console.error("Error al comparar contraseñas:", err);
          return res.status(500).send("Error al verificar la contraseña.");
        }

        if (match) {
          if (user.usuario_tipo === "trabajador") {
            const queryPermisos = `
              SELECT p.permiso_detalle
              FROM trabajador t
              JOIN permiso p ON t.trabajador_permiso_id = p.permiso_id
              WHERE t.trabajador_id = ?
            `;

            db.query(queryPermisos, [user.usuario_id], (err, permisos) => {
              if (err) {
                console.error("Error al consultar los permisos:", err);
                return res.status(500).send("Error al obtener permisos.");
              }

              let modulos = [];
              permisos.forEach(p => {
                if (Array.isArray(p.permiso_detalle)) {
                  modulos = [...modulos, ...p.permiso_detalle];
                } else {
                  modulos.push(p.permiso_detalle);
                }
              });

              return res.status(200).json({
                message: "Inicio de sesión exitoso.",
                user,
                modulos, 
              });
            });
          } else {
            return res.status(200).json({
              message: "Inicio de sesión exitoso.",
              user,
            });
          }
        } else {
          return res.status(401).send("Usuario o contraseña incorrectos.");
        }
      });
    } else {
      return res.status(401).send("Usuario o contraseña incorrectos.");
    }
  });
});

app.post("/register", (req, res) => {
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
    } = req.body;

    if (
        !usuario_cedula || 
        !usuario_nombre || 
        !usuario_apellido || 
        !usuario_edad || 
        !usuario_genero || 
        !usuario_email || 
        !usuario_telefono || 
        !usuario_usuario || 
        !usuario_contrasena
    ) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    bcrypt.hash(usuario_contrasena, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).json({ message: 'Hubo un error al encriptar la contraseña' });
        }

        const query = `
            INSERT INTO usuario (usuario_cedula, usuario_nombre, usuario_apellido, usuario_edad, usuario_genero, usuario_email, usuario_telefono, usuario_usuario, usuario_contrasena)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [
            usuario_cedula,
            usuario_nombre,
            usuario_apellido,
            usuario_edad,
            usuario_genero,
            usuario_email,
            usuario_telefono,
            usuario_usuario,
            hashedPassword, 
        ], (err, result) => {
            if (err) {
                console.error("Error al registrar el usuario:", err);

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "El usuario ya existe. Verifica la cédula, correo o nombre de usuario." });
                }

                return res.status(500).json({ message: "Error del servidor al registrar el usuario." });
            }

            res.status(201).json({
                message: "Usuario registrado exitosamente.",
                user: {
                    usuario_id: result.insertId,
                    usuario_cedula,
                    usuario_nombre,
                    usuario_apellido,
                    usuario_email,
                    usuario_usuario
                }
            });
        });
    });
});


app.get("/productos", (req, res) => {
    const query = "SELECT * FROM producto WHERE producto_estado = 'activo'";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener los productos:", err);
            return res.status(500).json({ message: "Error al obtener los productos." });
        }
        res.status(200).json(results);
    });
});

const client = new OAuth2Client("884062258219-hpioso37i4e708l49isbosh1oa8ubmv6.apps.googleusercontent.com");
app.post("/google-login", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "884062258219-hpioso37i4e708l49isbosh1oa8ubmv6.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();

        const email = payload.email;
        const givenName = payload.given_name;
        const familyName = payload.family_name;

        const queryCheckUser = "SELECT * FROM usuario WHERE usuario_email = ?";
        db.query(queryCheckUser, [email], (err, results) => {
            if (err) {
                console.error("Error al verificar usuario:", err);
                return res.status(500).json({ message: "Error del servidor al verificar el usuario." });
            }
            if (results.length > 0) {
                res.status(200).json({
                    isNewUser: false,
                    name: results[0].usuario_nombre,
                    email: results[0].usuario_email,
                });
            } else {
                res.status(200).json({
                    isNewUser: true,
                    usuario_nombre: givenName,
                    usuario_apellido: familyName,
                    usuario_email: email,
                });
            }
        });
    } catch (error) {
        console.error("Error al verificar el token de Google:", error);
        res.status(401).json({ message: "Token inválido." });
    }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
