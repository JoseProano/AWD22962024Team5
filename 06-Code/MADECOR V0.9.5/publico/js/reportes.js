document.addEventListener('DOMContentLoaded', () => {
    const tablaReportes = document.getElementById('tablaReportes');
    const barraBusquedaReporte = document.getElementById('barraBusquedaReporte');
    const tipoReporteSelect = document.getElementById('tipoReporteSelect');

    // Función para obtener y mostrar el reporte seleccionado
    function obtenerReporte(tipoReporte, query = '') {
        let url = `http://localhost:3015/madecor/reporte/${tipoReporte}`;
        if (query) {
            url += `?q=${encodeURIComponent(query)}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                tablaReportes.innerHTML = ''; // Limpiar tabla

                if (!data || data.length === 0) {
                    tablaReportes.innerHTML = `
                        <tr>
                            <td colspan="10" class="text-center">No se encontraron resultados</td>
                        </tr>
                    `;
                    return;
                }

                // Generar encabezados dinámicamente
                const encabezados = Object.keys(data[0]);
                let thead = `<thead class="thead-dark"><tr>`;
                encabezados.forEach(encabezado => {
                    thead += `<th>${encabezado.replace(/_/g, ' ').toUpperCase()}</th>`;
                });
                thead += `</tr></thead>`;

                // Generar filas de datos
                let tbody = `<tbody>`;
                data.forEach(item => {
                    tbody += `<tr>`;
                    encabezados.forEach(encabezado => {
                        tbody += `<td>${item[encabezado]}</td>`;
                    });
                    tbody += `</tr>`;
                });
                tbody += `</tbody>`;

                tablaReportes.innerHTML = thead + tbody;
            })
            .catch(error => {
                console.error('Error al obtener el reporte:', error);
                mostrarMensaje('Error al obtener el reporte.', 'error');
            });
    }

    // Evento para cambiar el tipo de reporte
    tipoReporteSelect.addEventListener('change', function () {
        const tipoReporte = tipoReporteSelect.value;
        obtenerReporte(tipoReporte);
    });

    // Evento para buscar en el reporte
    barraBusquedaReporte.addEventListener('input', function () {
        const tipoReporte = tipoReporteSelect.value;
        const query = barraBusquedaReporte.value.trim();
        obtenerReporte(tipoReporte, query);
    });

    // Inicializar con el reporte por defecto
    obtenerReporte(tipoReporteSelect.value);
});

// Función para mostrar mensajes temporales
function mostrarMensaje(mensaje, tipo = 'success') {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `alert alert-${tipo}`;
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}
