  // Función para obtener las estadísticas
  function obtenerEstadisticas() {
    fetch('http://localhost:3000/madecor/estadisticas')
      .then(response => response.json())
      .then(data => {
        // Actualizar los elementos con las estadísticas
        document.getElementById('totalClientes').textContent = data.totalClientes;
        document.getElementById('totalVentas').textContent = data.totalVentas;
        document.getElementById('totalProductos').textContent = data.totalProductos;
        document.getElementById('totalEmpleados').textContent = data.totalEmpleados;
      })
      .catch(error => {
        console.error('Error al obtener las estadísticas:', error);
      });
  }

  // Llamar a la función para obtener las estadísticas al cargar la página
  window.onload = function() {
    obtenerEstadisticas();
  };