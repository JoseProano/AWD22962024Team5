document.addEventListener('DOMContentLoaded', () => {
    const tablaReportes = document.getElementById('tablaReportes');
    const barraBusquedaReporte = document.getElementById('barraBusquedaReporte');
    const tipoReporteSelect = document.getElementById('tipoReporteSelect');
    const generarPDFBtn = document.getElementById('generarPDF');
    const pdfViewer = document.getElementById('pdfViewer');

    // Función para obtener y mostrar el reporte seleccionado
    function obtenerReporte(tipoReporte, query = '') {
        let url = `http://localhost:3000/madecor/reporte/${tipoReporte}`;
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

                // Almacenar datos para generar PDF
                tablaReportes.dataset.json = JSON.stringify(data);
                tablaReportes.dataset.headers = JSON.stringify(encabezados);
            })
            .catch(error => {
                console.error('Error al obtener el reporte:', error);
                mostrarMensaje('Error al obtener el reporte.', 'error');
            });
    }

    // Función para generar y mostrar el PDF en el visor
    function generarPDF() {
        const { jsPDF } = window.jspdf;
    
        // Validar que las cabeceras existan
        if (!tablaReportes.dataset.headers) {
            mostrarMensaje('No hay datos ni cabeceras para generar el PDF.', 'error');
            return;
        }
    
        const encabezados = JSON.parse(tablaReportes.dataset.headers);
        let data = [];
    
        // Verificar si hay datos almacenados
        if (tablaReportes.dataset.json) {
            data = JSON.parse(tablaReportes.dataset.json);
        }
    
        // Inicializar jsPDF
        const doc = new jsPDF('p', 'pt', 'a4');
    
        // Preparar datos para la tabla
        const tableData = data.map(item =>
            encabezados.map(key => item[key] || '')
        );
    
        // Agregar título
        doc.setFontSize(16);
        doc.text('Reporte Generado', 40, 40);
    
        // Si no hay datos, incluir solo las cabeceras
        const cuerpoTabla = tableData.length > 0 ? tableData : [['No hay datos disponibles']];
    
        // Usar autoTable con ajustes de diseño
        doc.autoTable({
            startY: 60,
            head: [encabezados.map(key => key.replace(/_/g, ' ').toUpperCase())],
            body: cuerpoTabla,
            theme: 'grid',
            styles: {
                fontSize: 5,
                cellPadding: 5,
                overflow: 'linebreak', // Ajuste automático del texto
            },
            headStyles: {
                fillColor: [52, 58, 64], // Gris oscuro
                textColor: [255, 255, 255], // Blanco
                fontStyle: 'bold',
            },
            columnStyles: {
                0: { cellWidth: 50 }, // Ancho máximo para la primera columna
                1: { cellWidth: 'auto' }, // Ajuste dinámico para otras columnas
            },
            margin: { top: 60, left: 40, right: 40 },
        });
    
        // Generar el PDF en base64
        const pdfDataUri = doc.output('datauristring');
    
        // Mostrar el PDF en el visor
        pdfViewer.src = pdfDataUri;
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

    // Evento para generar y mostrar PDF
    generarPDFBtn.addEventListener('click', generarPDF);

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
