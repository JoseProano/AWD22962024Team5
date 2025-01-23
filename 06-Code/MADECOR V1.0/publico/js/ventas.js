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
    this.classList.add('active');
    document.getElementById('nuevoBtn').classList.remove('active');
});

document.addEventListener("DOMContentLoaded", async () => {
  const productosContainer = document.getElementById("productosContainer");
  const addProductBtn = document.getElementById("addProduct");
  const ivaInput = document.getElementById("ventaIva");
  const totalInput = document.getElementById("ventaTotal");
  let productosDisponibles = [];

  // Cargar productos desde la base de datos
  async function cargarProductos() {
    const response = await fetch("/madecor/productos"); // Cambia a tu endpoint real
    productosDisponibles = await response.json();
    actualizarOpcionesProducto();
  }

  // Actualiza las opciones del select de producto
  function actualizarOpcionesProducto() {
    const selects = document.querySelectorAll(".producto_id");
    selects.forEach(select => {
      select.innerHTML = productosDisponibles
        .map(
          producto =>
            `<option value="${producto.producto_id}">${producto.producto_nombre}</option>`
        )
        .join("");
    });
  }

  // Calcula los subtotales y el total general
  function calcularTotales() {
    let total = 0;
    const productos = document.querySelectorAll(".producto");
    productos.forEach(producto => {
      const cantidad = parseFloat(producto.querySelector(".cantidad").value) || 0;
      const precioUnitario = parseFloat(producto.querySelector(".precio_unitario").value) || 0;
      const subtotal = cantidad * precioUnitario;
      producto.querySelector(".subtotal").value = subtotal.toFixed(2);
      total += subtotal;
    });

    // Aplica IVA
    const iva = parseFloat(ivaInput.value) || 0;
    total += (total * iva) / 100;
    totalInput.value = total.toFixed(2);
  }

  // Añade un nuevo producto al formulario
  addProductBtn.addEventListener("click", () => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList.add("producto");
    nuevoProducto.innerHTML = `
      <label for="producto_id">Producto:</label>
      <select name="producto_id" class="producto_id">
        ${productosDisponibles
          .map(
            producto =>
              `<option value="${producto.producto_id}">${producto.producto_nombre}</option>`
          )
          .join("")}
      </select>
      <label for="cantidad">Cantidad:</label>
      <input type="number" name="cantidad" class="cantidad" value="1" required>
      <label for="precio_unitario">Precio Unitario:</label>
      <input type="number" name="precio_unitario" class="precio_unitario" readonly>
      <label for="subtotal">Subtotal:</label>
      <input type="number" name="subtotal" class="subtotal" readonly>
    `;
    productosContainer.appendChild(nuevoProducto);

    // Agrega eventos al nuevo producto
    agregarEventosProducto(nuevoProducto);
  });

  // Agrega eventos a un producto
  function agregarEventosProducto(producto) {
    const selectProducto = producto.querySelector(".producto_id");
    const cantidadInput = producto.querySelector(".cantidad");
    const precioUnitarioInput = producto.querySelector(".precio_unitario");

    // Actualiza precio unitario al seleccionar producto
    selectProducto.addEventListener("change", () => {
      const productoSeleccionado = productosDisponibles.find(p => p.producto_id == selectProducto.value);
      precioUnitarioInput.value = productoSeleccionado ? productoSeleccionado.producto_precio : 0;
      calcularTotales();
    });

    // Calcula totales al cambiar cantidad
    cantidadInput.addEventListener("input", calcularTotales);
  }

  // Inicializa eventos
  cargarProductos();
  // Se añade un producto por defecto para empezar
  addProductBtn.click();
  ivaInput.addEventListener("input", calcularTotales);

  // Maneja el envío del formulario
  document.getElementById("formVenta").addEventListener("submit", async e => {
    e.preventDefault();
    const clienteId = document.getElementById("ventaClienteId").value;
    const trabajadorId = document.getElementById("ventaTrabajadorId").value;
    const iva = parseFloat(ivaInput.value) || 0;
    const total = parseFloat(totalInput.value) || 0;

    const productos = Array.from(document.querySelectorAll(".producto")).map(
      producto => ({
        producto_id: producto.querySelector(".producto_id").value,
        cantidad: parseFloat(producto.querySelector(".cantidad").value) || 0,
        precio_unitario: parseFloat(producto.querySelector(".precio_unitario").value) || 0,
      })
    );

    const response = await fetch("/madecor/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente_id: clienteId,
        trabajador_id: trabajadorId,
        iva,
        total,
        productos,
      }),
    });

    if (response.ok) {
      alert("Venta registrada exitosamente");
    } else {
      alert("Error al registrar la venta");
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const formVenta = document.getElementById('formVenta');
    const tablaVentas = document.getElementById('tablaVentas');
    const barraBusqueda = document.getElementById('barraBusqueda');
    const listadoForm = document.getElementById('listado');

    formVenta.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Validar y recopilar datos
      const clienteId = document.getElementById('ventaClienteId').value;
      const trabajadorId = document.getElementById('ventaTrabajadorId').value;
      const detallesJson = document.getElementById('ventaDetalles').value;
  
      if (!clienteId || !trabajadorId || !detallesJson) {
          mostrarMensaje('Por favor, completa todos los campos.', 'error');
          return;
      }
  
      const detalles = JSON.parse(detallesJson);
  
      if (!Array.isArray(detalles) || detalles.length === 0) {
          mostrarMensaje('Debes agregar al menos un producto en la venta.', 'error');
          return;
      }
  
      const ventaData = {
          venta_cliente_id: clienteId,
          venta_trabajador_id: trabajadorId,
          detalles
      };
  
      // Enviar datos al backend
      fetch('/madecor/ventas', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(ventaData)
      })
      .then(response => response.json())
      .then(data => {
          if (data.message === 'Venta creada exitosamente') {
              mostrarMensaje(data.message);
              formVenta.reset();
              obtenerVentas();
          } else {
              mostrarMensaje(data.message, 'error');
          }
      })
      .catch(error => {
          console.error('Error al guardar la venta:', error);
          mostrarMensaje('Error al crear la venta.', 'error');
      });
  });  

// Función para obtener y mostrar la lista de ventas
function obtenerVentas(query = '') {
  let url = `/madecor/ventas`;
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
                      <button class="btn btn-primary btn-sm mx-2" onclick='generarFactura(${JSON.stringify(venta)})'>Factura</button>
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

// Función para generar la factura en PDF
window.generarFactura = function(venta) {
  console.log('Generando factura para:', venta);

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Datos de la venta
  doc.setFontSize(18);
  doc.text('Factura de Venta', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Cliente: ${venta.cliente_nombre} ${venta.cliente_apellido}`, 20, 40);
  doc.text(`Trabajador: ${venta.trabajador_nombre} ${venta.trabajador_apellido}`, 20, 50);
  doc.text(`Fecha de Creación: ${new Date(venta.venta_fecha_creacion).toLocaleDateString()}`, 20, 60);
  doc.text(`Estado: ${venta.venta_estado}`, 20, 70);

  doc.text(`IVA: ${venta.venta_iva}`, 20, 80);
  doc.text(`Total: ${venta.venta_total}`, 20, 90);

  // Guardar el PDF
  doc.save(`Factura_Venta_${venta.venta_id}.pdf`);
};




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