document.getElementById('nuevoBtn').addEventListener('click', function () {
    document.getElementById('nuevo').classList.remove('d-none');
    document.getElementById('listado').classList.add('d-none');
    document.getElementById('editarVentaForm').classList.add('d-none'); // Ocultar el formulario de edición
    this.classList.add('active');
    document.getElementById('listadoBtn').classList.remove('active');
  });

document.getElementById('listadoBtn').addEventListener('click', function () {
    document.getElementById('listado').classList.remove('d-none');
    document.getElementById('nuevo').classList.add('d-none');
    document.getElementById('editarVentaForm').classList.add('d-none'); // Ocultar el formulario de edición
    this.classList.add('active');
    document.getElementById('nuevoBtn').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const formVenta = document.getElementById('formVenta');
    const tablaVentas = document.getElementById('tablaVentas');
    const barraBusqueda = document.getElementById('barraBusqueda');
    const editarVentaForm = document.getElementById('editarVentaForm');
    const listadoForm = document.getElementById('listado');

// Crear una nueva venta
formVenta.addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Datos de la venta
    const ventaData = {
      venta_cliente_id: document.getElementById('ventaClienteId').value,
      venta_trabajador_id: document.getElementById('ventaTrabajadorId').value,
      venta_iva: parseFloat(document.getElementById('ventaIva').value),
      venta_total: parseFloat(document.getElementById('ventaTotal').value),
      detalles: JSON.parse(document.getElementById('ventaDetalles').value) // Suponiendo que los detalles se envían como JSON
    };
  
    // Enviar los datos al backend
    fetch('http://localhost:3015/madecor/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ventaData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      mostrarMensaje('Venta creada con éxito.');
      formVenta.reset();
      obtenerVentas(); // Recargar la lista de ventas
    })
    .catch(error => {
      console.error('Error al guardar la venta:', error);
      mostrarMensaje('Error al crear venta.', 'error');
    });
  });

    // Función para obtener y mostrar la lista de ventas
function obtenerVentas(query = '') {
    let url = `http://localhost:3015/madecor/ventas`;
    if (query) {
        url += `?q=${encodeURIComponent(query)}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            tablaVentas.innerHTML = ''; // Limpiar tabla

            if (!data || data.length === 0) {
                tablaVentas.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center">No se encontraron ventas</td>
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
            thead += `${query ? '<th>ACCIONES</th>' : ''}</tr></thead>`;

            // Generar filas de datos
            let tbody = `<tbody>`;
            data.forEach(venta => {
                tbody += `<tr>`;
                encabezados.forEach(encabezado => {
                    tbody += `<td>${venta[encabezado]}</td>`;
                });
                tbody += `
                    ${query ? `<td>
                        <button class="btn btn-primary btn-sm mx-2" onclick="editarVenta(${venta.venta_id})">Editar</button>
                    </td>` : ''}
                </tr>`;
            });
            tbody += `</tbody>`;

            tablaVentas.innerHTML = thead + tbody;
        })
        .catch(error => {
            console.error('Error al obtener ventas:', error);
            mostrarMensaje('Error al obtener las ventas.', 'error');
        });
}

// Función para editar venta
window.editarVenta = function (id) {
    listadoForm.classList.add('d-none');
    editarVentaForm.classList.remove('d-none');
    
    fetch(`http://localhost:3015/madecor/ventas/${id}`)
      .then(response => {
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('No se pudo obtener la venta');
        }
        return response.json();
      })
      .then(data => {
        // Verificar si los datos son correctos
        if (!data) {
          throw new Error('No se encontraron datos de la venta');
        }
        document.getElementById('editarVentaClienteId').value = data.venta_cliente_id || '';
        document.getElementById('editarVentaTrabajadorId').value = data.venta_trabajador_id || '';
        document.getElementById('editarVentaIva').value = data.venta_iva || '';
        document.getElementById('editarVentaTotal').value = data.venta_total || '';
        formEditarVenta.setAttribute('data-venta-id', id);
      })
      .catch(err => {
        console.error('Error al obtener datos de la venta:', err);
        mostrarMensaje('No se pudo cargar los datos de la venta.', 'error');
      });
  };
  
  // Función para guardar los cambios de la venta
  formEditarVenta.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const id = formEditarVenta.getAttribute('data-venta-id');
    const clienteId = document.getElementById('editarVentaClienteId').value;
    const trabajadorId = document.getElementById('editarVentaTrabajadorId').value;
    const iva = parseFloat(document.getElementById('editarVentaIva').value);
    const total = parseFloat(document.getElementById('editarVentaTotal').value);
    
    fetch(`http://localhost:3015/madecor/ventas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        venta_cliente_id: clienteId,
        venta_trabajador_id: trabajadorId,
        venta_iva: iva,
        venta_total: total,
      }),
    })
      .then(response => response.json())
      .then(data => {
        mostrarMensaje('Venta actualizada con éxito.');
        obtenerVentas(); // Recargar la lista de ventas
      })
      .catch(error => {
        console.error('Error al actualizar la venta:', error);
        mostrarMensaje('Error al actualizar venta.', 'error');
      });
  });  


    // Buscar ventas
    barraBusqueda.addEventListener('input', function() {
        const query = barraBusqueda.value.trim();
        obtenerVentas(query);
    });

    // Obtener ventas iniciales
    obtenerVentas();

        // Función para mostrar el mensaje flotante
function mostrarMensaje(mensaje, tipo = 'success') {
    const mensajeFlotante = document.getElementById('mensajeFlotante');
    const mensajeTexto = document.getElementById('mensajeTexto');
    
    // Asignamos el mensaje y el color según el tipo
    mensajeTexto.textContent = mensaje;
    if (tipo === 'error') {
      mensajeFlotante.classList.remove('alert-success');
      mensajeFlotante.classList.add('alert-danger'); // Cambia a rojo para errores
    } else {
      mensajeFlotante.classList.remove('alert-danger');
      mensajeFlotante.classList.add('alert-success'); // Mantén verde para éxito
    }
  
    // Mostrar el mensaje flotante
    mensajeFlotante.style.display = 'block';
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(function () {
      mensajeFlotante.style.display = 'none';
    }, 3000);
  }
});