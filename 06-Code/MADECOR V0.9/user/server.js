const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'NPPIvDgVxdaROcpdRfxddgANDdZgZljk',
    database: 'railway',
    port: 11066,
    connectTimeout: 30000,
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        process.exit(1);
    }
    console.log("Conexión a la base de datos establecida.");
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/login", (req, res) => {
    const { usuario_usuario, usuario_contrasena } = req.body;

    const query = `
        SELECT usuario_nombre, usuario_apellido, usuario_email
        FROM usuario
        WHERE usuario_usuario = ? AND usuario_contrasena = ?
    `;

    db.query(query, [usuario_usuario, usuario_contrasena], (err, results) => {
        if (err) {
            console.error("Error al consultar el usuario:", err);
            return res.status(500).send("Error del servidor.");
        }

        if (results.length > 0) {
            return res.status(200).json({
                message: "Inicio de sesión exitoso.",
                user: results[0],
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
        usuario_contrasena,
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

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
