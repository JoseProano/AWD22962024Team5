const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const permisosRoutes = require('./routes/permisosRoutes');
const trabajadorRoutes = require('./routes/trabajadorRoutes'); 
const clienteRoutes = require('./routes/clienteRoutes'); 
const estadisticaRoutes = require('./routes/estadisticaRoutes'); 
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();
const port = 3015;

// Middleware
app.use(bodyParser.json()); // Para parsear JSON
app.use(cors()); // Permitir CORS para las solicitudes de frontend

// Usar las rutas de permisos
app.use('/madecor', permisosRoutes);

// Usar las rutas de trabajador
app.use('/madecor', trabajadorRoutes);

// Usar las rutas de cliente
app.use('/madecor', clienteRoutes);

// Usar las rutas de inicio
app.use('/madecor', estadisticaRoutes);

// Usar las rutas de producto
app.use('/madecor', productoRoutes);

// Usar las rutas de venta
app.use('/madecor', ventaRoutes);

// Usar las rutas de reporte
app.use('/madecor', reporteRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
