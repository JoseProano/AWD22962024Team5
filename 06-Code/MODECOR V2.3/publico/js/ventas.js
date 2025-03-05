document.getElementById('nuevoBtn').addEventListener('click', function () {
    document.getElementById('nuevo').classList.remove('d-none');
    document.getElementById('listado').classList.add('d-none');
    document.getElementById('editarVentaForm').classList.add('d-none');
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

  async function cargarProductos() {
    const response = await fetch("https://madecor-backend.vercel.app/madecor/productos"); 
    productosDisponibles = await response.json();
    actualizarOpcionesProducto();
  }

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

    const iva = parseFloat(ivaInput.value) || 0;
    total += (total * iva) / 100;
    totalInput.value = total.toFixed(2);
  }

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

    agregarEventosProducto(nuevoProducto);
  });

  function agregarEventosProducto(producto) {
    const selectProducto = producto.querySelector(".producto_id");
    const cantidadInput = producto.querySelector(".cantidad");
    const precioUnitarioInput = producto.querySelector(".precio_unitario");

    selectProducto.addEventListener("change", () => {
      const productoSeleccionado = productosDisponibles.find(p => p.producto_id == selectProducto.value);
      precioUnitarioInput.value = productoSeleccionado ? productoSeleccionado.producto_precio : 0;
      calcularTotales();
    });

    cantidadInput.addEventListener("input", calcularTotales);
  }

  cargarProductos();
  addProductBtn.click();
  ivaInput.addEventListener("input", calcularTotales);

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

    const response = await fetch("https://madecor-backend.vercel.app/madecor/ventas", {
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
  
      fetch('https://madecor-backend.vercel.app/madecor/ventas', {
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

function obtenerVentas(query = '') {
  let url = `https://madecor-backend.vercel.app/madecor/ventas`;
  if (query) {
      url += `?q=${encodeURIComponent(query)}`;
  }

  fetch(url)
      .then(response => response.json())
      .then(data => {
          tablaVentas.innerHTML = '';

          if (!data || data.length === 0) {
              tablaVentas.innerHTML = `
                  <tr>
                      <td colspan="7" class="text-center">No se encontraron ventas</td>
                  </tr>
              `;
              return;
          }

          const encabezados = Object.keys(data[0]);
          let thead = `<thead class="thead-dark"><tr>`;
          encabezados.forEach(encabezado => {
              thead += `<th>${encabezado.replace(/_/g, ' ').toUpperCase()}</th>`;
          });
          thead += `${query ? '<th>ACCIONES</th>' : ''}</tr></thead>`;

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

window.generarFactura = function(venta) {
  console.log('Generando factura para:', venta);

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Factura de Venta', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Cliente: ${venta.cliente_nombre} ${venta.cliente_apellido}`, 20, 40);
  doc.text(`Trabajador: ${venta.trabajador_nombre} ${venta.trabajador_apellido}`, 20, 50);
  doc.text(`Fecha de Creación: ${new Date(venta.venta_fecha_creacion).toLocaleDateString()}`, 20, 60);
  doc.text(`Estado: ${venta.venta_estado}`, 20, 70);

  doc.text(`IVA: ${venta.venta_iva}`, 20, 80);
  doc.text(`Total: ${venta.venta_total}`, 20, 90);

  doc.save(`Factura_Venta_${venta.venta_id}.pdf`);
};

    barraBusqueda.addEventListener('input', function() {
        const query = barraBusqueda.value.trim();
        obtenerVentas(query);
    });

    obtenerVentas();

function mostrarMensaje(mensaje, tipo = 'success') {
    const mensajeFlotante = document.getElementById('mensajeFlotante');
    const mensajeTexto = document.getElementById('mensajeTexto');
    
    mensajeTexto.textContent = mensaje;
    if (tipo === 'error') {
      mensajeFlotante.classList.remove('alert-success');
      mensajeFlotante.classList.add('alert-danger'); 
    } else {
      mensajeFlotante.classList.remove('alert-danger');
      mensajeFlotante.classList.add('alert-success'); 
    }
  
    mensajeFlotante.style.display = 'block';
    
    setTimeout(function () {
      mensajeFlotante.style.display = 'none';
    }, 3000);
  }
});