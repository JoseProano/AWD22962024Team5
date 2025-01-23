document.getElementById('nuevoProductoBtn').addEventListener('click', function () {
    document.getElementById('nuevoProducto').classList.remove('d-none');
    document.getElementById('listadoProductos').classList.add('d-none');
    document.getElementById('editarProductoForm').classList.add('d-none');
    this.classList.add('active');
    document.getElementById('listadoProductoBtn').classList.remove('active');
});

document.getElementById('listadoProductoBtn').addEventListener('click', function () {
    document.getElementById('listadoProductos').classList.remove('d-none');
    document.getElementById('nuevoProducto').classList.add('d-none');
    document.getElementById('editarProductoForm').classList.add('d-none');
    this.classList.add('active');
    document.getElementById('nuevoProductoBtn').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const formProducto = document.getElementById('formProducto');
    const tablaProductos = document.getElementById('tablaProductos');
    const barraBusquedaProducto = document.getElementById('barraBusquedaProducto');
    const editarProductoForm = document.getElementById('editarProductoForm');
    const listadoProductos = document.getElementById('listadoProductos');

    // Crear un nuevo producto
    formProducto.addEventListener('submit', function(event) {
        event.preventDefault();

        const productoData = {
            producto_nombre: document.getElementById('productoNombre').value,
            producto_codigo: document.getElementById('productoCodigo').value,
            producto_precio: parseFloat(document.getElementById('productoPrecio').value),
            producto_stock: parseInt(document.getElementById('productoStock').value, 10),
            producto_descripcion: document.getElementById('productoDescripcion').value,
            producto_imagen: document.getElementById('productoImagen').value,
        };

        fetch('http://localhost:3015/madecor/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje('Producto creado con éxito.');
            formProducto.reset();
            obtenerProductos();
        })
        .catch(error => {
            console.error('Error al guardar el producto:', error);
            mostrarMensaje('Error al crear producto.', 'error');
        });
    });

    // Obtener la lista de productos
    function obtenerProductos(query = '') {
        fetch(`http://localhost:3015/madecor/productos?q=${query}`)
            .then(response => response.json())
            .then(data => {
                tablaProductos.innerHTML = '';

                const encabezados = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            ${query ? '<th>Acciones</th>' : ''}
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                tablaProductos.innerHTML = encabezados;

                const tbody = tablaProductos.querySelector('tbody');

                if (!data || data.length === 0) {
                    tbody.innerHTML = `
                        <tr>
                            <td colspan="7" class="text-center">No se encontraron productos</td>
                        </tr>
                    `;
                } else {
                    data.forEach(producto => {
                        const precio = parseFloat(producto.producto_precio);
                        const precioFormateado = isNaN(precio) ? "N/A" : precio.toFixed(2);
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${producto.producto_id}</td>
                            <td>${producto.producto_nombre}</td>
                            <td>${producto.producto_codigo}</td>
                            <td>${precioFormateado}</td>
                            <td>${producto.producto_stock}</td>
                            <td>${producto.producto_descripcion}</td>
                            <td>${producto.producto_estado}</td>
                            ${query ? `
                            <td>
                                <button class="btn btn-primary btn-sm mx-2" onclick="editarProducto(${producto.producto_id})">Editar</button>
                                <button class="btn ${producto.producto_estado === 'activo' ? 'btn-danger' : 'btn-success'} btn-sm" onclick="cambiarEstadoProducto(${producto.producto_id}, '${producto.producto_estado}')">
                                    ${producto.producto_estado === 'activo' ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>` : ''}
                        `;
                        tbody.appendChild(tr);
                    });
                }
            })
            .catch(err => console.error('Error al obtener productos:', err));
    }

    // Función para editar producto
    window.editarProducto = function (id) {
        listadoProductos.classList.add('d-none');
        editarProductoForm.classList.remove('d-none');

        fetch(`http://localhost:3015/madecor/productos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener el producto');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('editarProductoNombre').value = data.producto_nombre || '';
                document.getElementById('editarProductoCodigo').value = data.producto_codigo || '';
                document.getElementById('editarProductoPrecio').value = data.producto_precio || '';
                document.getElementById('editarProductoStock').value = data.producto_stock || '';
                document.getElementById('editarProductoDescripcion').value = data.producto_descripcion || '';
                document.getElementById('editarProductoImagen').value = data.producto_imagen || '';
                editarProductoForm.setAttribute('data-producto-id', id);
            })
            .catch(err => {
                console.error('Error al obtener datos del producto:', err);
                mostrarMensaje('No se pudo cargar los datos del producto.', 'error');
            });
    };

    // Función para guardar los cambios del producto
    editarProductoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = editarProductoForm.getAttribute('data-producto-id');
        const productoData = {
            producto_nombre: document.getElementById('editarProductoNombre').value,
            producto_codigo: document.getElementById('editarProductoCodigo').value,
            producto_precio: parseFloat(document.getElementById('editarProductoPrecio').value),
            producto_stock: parseInt(document.getElementById('editarProductoStock').value, 10),
            producto_descripcion: document.getElementById('editarProductoDescripcion').value,
            producto_imagen: document.getElementById('editarProductoImagen').value,
        };

        fetch(`http://localhost:3015/madecor/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoData),
        })
        .then(response => response.json())
        .then(data => {
            obtenerProductos();
            listadoProductos.classList.remove('d-none');
            editarProductoForm.classList.add('d-none');
            mostrarMensaje('Producto actualizado con éxito.');
        })
        .catch(err => {
            console.error('Error al actualizar producto:', err);
            mostrarMensaje('Error al actualizar producto.', 'error');
        });
    });

    // Función para cambiar el estado del producto
    window.cambiarEstadoProducto = function (id, estadoActual) {
        const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';

        fetch(`http://localhost:3015/madecor/productos/${id}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado }),
        })
            .then(response => response.json())
            .then(data => {
                obtenerProductos();
                mostrarMensaje(nuevoEstado === 'activo' ? 'Producto activado.' : 'Producto desactivado.');
            })
            .catch(err => {
                console.error('Error al cambiar estado del producto:', err);
                mostrarMensaje('Error al cambiar estado del producto.', 'error');
            });
    };

    // Evento de búsqueda
    barraBusquedaProducto.addEventListener('input', function () {
        const query = barraBusquedaProducto.value;
        obtenerProductos(query);
    });

    obtenerProductos();

    // Función para mostrar el mensaje flotante
function mostrarMensaje(mensaje, tipo = 'success') {
    const mensajeFlotante = document.getElementById('mensajeFlotante');
    const mensajeTexto = document.getElementById('mensajeTexto');
    
    // Asignar el mensaje y el estilo según el tipo
    mensajeTexto.textContent = mensaje;
    if (tipo === 'error') {
        mensajeFlotante.classList.remove('alert-success');
        mensajeFlotante.classList.add('alert-danger'); // Color rojo para errores
    } else {
        mensajeFlotante.classList.remove('alert-danger');
        mensajeFlotante.classList.add('alert-success'); // Color verde para éxito
    }
    
    // Mostrar el mensaje flotante
    mensajeFlotante.style.display = 'block';
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeFlotante.style.display = 'none';
    }, 3000);
}

// Inicializar la lista de productos al cargar la página
obtenerProductos();
});