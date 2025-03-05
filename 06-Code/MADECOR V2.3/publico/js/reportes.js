document.addEventListener('DOMContentLoaded', () => {
    const tablaReportes = document.getElementById('tablaReportes');
    const barraBusquedaReporte = document.getElementById('barraBusquedaReporte');
    const tipoReporteSelect = document.getElementById('tipoReporteSelect');
    const generarPDFBtn = document.getElementById('generarPDF');
    const pdfViewer = document.getElementById('pdfViewer');

    function obtenerReporte(tipoReporte, query = '') {
        let url = `https://madecor-backend.vercel.app/madecor/reporte/${tipoReporte}`;
        if (query) {
            url += `?q=${encodeURIComponent(query)}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                tablaReportes.innerHTML = '';

                if (!data || data.length === 0) {
                    tablaReportes.innerHTML = `
                        <tr>
                            <td colspan="10" class="text-center">No se encontraron resultados</td>
                        </tr>
                    `;
                    return;
                }

                const encabezados = Object.keys(data[0]);
                let thead = `<thead class="thead-dark"><tr>`;
                encabezados.forEach(encabezado => {
                    thead += `<th>${encabezado.replace(/_/g, ' ').toUpperCase()}</th>`;
                });
                thead += `</tr></thead>`;

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

                tablaReportes.dataset.json = JSON.stringify(data);
                tablaReportes.dataset.headers = JSON.stringify(encabezados);
            })
            .catch(error => {
                console.error('Error al obtener el reporte:', error);
                mostrarMensaje('Error al obtener el reporte.', 'error');
            });
    }

    function generarPDF() {
        const { jsPDF } = window.jspdf;
    
        if (!tablaReportes.dataset.headers) {
            mostrarMensaje('No hay datos ni cabeceras para generar el PDF.', 'error');
            return;
        }
    
        const encabezados = JSON.parse(tablaReportes.dataset.headers);
        let data = [];
    
        if (tablaReportes.dataset.json) {
            data = JSON.parse(tablaReportes.dataset.json);
        }
    
        const doc = new jsPDF('p', 'pt', 'a4');
    
        const tableData = data.map(item =>
            encabezados.map(key => item[key] || '')
        );
    
        doc.setFontSize(16);
        doc.text('Reporte Generado', 40, 40);
    
        const cuerpoTabla = tableData.length > 0 ? tableData : [['No hay datos disponibles']];
    
        doc.autoTable({
            startY: 60,
            head: [encabezados.map(key => key.replace(/_/g, ' ').toUpperCase())],
            body: cuerpoTabla,
            theme: 'grid',
            styles: {
                fontSize: 5,
                cellPadding: 5,
                overflow: 'linebreak', 
            },
            headStyles: {
                fillColor: [52, 58, 64], 
                textColor: [255, 255, 255], 
                fontStyle: 'bold',
            },
            columnStyles: {
                0: { cellWidth: 50 }, 
                1: { cellWidth: 'auto' }, 
            },
            margin: { top: 60, left: 40, right: 40 },
        });
    
        const pdfDataUri = doc.output('datauristring');
    
        pdfViewer.src = pdfDataUri;
    }    

    tipoReporteSelect.addEventListener('change', function () {
        const tipoReporte = tipoReporteSelect.value;
        obtenerReporte(tipoReporte);
    });

    barraBusquedaReporte.addEventListener('input', function () {
        const tipoReporte = tipoReporteSelect.value;
        const query = barraBusquedaReporte.value.trim();
        obtenerReporte(tipoReporte, query);
    });

    generarPDFBtn.addEventListener('click', generarPDF);

    obtenerReporte(tipoReporteSelect.value);
});

function mostrarMensaje(mensaje, tipo = 'success') {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `alert alert-${tipo}`;
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}
