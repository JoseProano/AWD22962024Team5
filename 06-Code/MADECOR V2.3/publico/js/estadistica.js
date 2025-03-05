  function obtenerEstadisticas() {
    fetch('https://madecor-backend.vercel.app/madecor/estadisticas')
      .then(response => response.json())
      .then(data => {
        document.getElementById('totalClientes').textContent = data.totalClientes;
        document.getElementById('totalVentas').textContent = data.totalVentas;
        document.getElementById('totalProductos').textContent = data.totalProductos;
        document.getElementById('totalEmpleados').textContent = data.totalEmpleados;
      })
      .catch(error => {
        console.error('Error al obtener las estadísticas:', error);
      });
  }

  window.onload = function() {
    obtenerEstadisticas();
  };