document.getElementById('nuevoBtn').addEventListener('click', function () {
    document.getElementById('nuevo').classList.remove('d-none');
    document.getElementById('listado').classList.add('d-none');
    document.getElementById('editarClienteForm').classList.add('d-none'); // Ocultar el formulario de edición
    this.classList.add('active');
    document.getElementById('listadoBtn').classList.remove('active');
  });
  
  document.getElementById('listadoBtn').addEventListener('click', function () {
    document.getElementById('listado').classList.remove('d-none');
    document.getElementById('nuevo').classList.add('d-none');
    document.getElementById('editarClienteForm').classList.add('d-none'); // Ocultar el formulario de edición
    this.classList.add('active');
    document.getElementById('nuevoBtn').classList.remove('active');
  });
  document.addEventListener('DOMContentLoaded', () => {
    
    const formCliente = document.getElementById('formCliente');
    const tablaClientes = document.getElementById('tablaClientes');
    const barraBusqueda = document.getElementById('barraBusqueda');
    const editarClienteForm = document.getElementById('editarClienteForm');
    const listadoForm = document.getElementById('listado');

    // Crear un nuevo cliente
    formCliente.addEventListener('submit', function(event) {
        event.preventDefault();

        // Calcular la edad del cliente
        const nacimiento = new Date(document.getElementById('clienteNacimiento').value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        // La cédula será el nombre de usuario y la contraseña será generada
         // Generar nombre de usuario usando el primer nombre y la inicial del apellido
         const nombre = document.getElementById('clienteNombre').value;
         const apellido = document.getElementById('clienteApellido').value;
         const usuarioGenerado = nombre.toLowerCase() + apellido.charAt(0).toLowerCase(); // Ejemplo: juanp
         const contrasena = document.getElementById('clienteCedula').value;
         

        // Datos del cliente
        const clienteData = {
            usuario_cedula: document.getElementById('clienteCedula').value,
            usuario_nombre: document.getElementById('clienteNombre').value,
            usuario_apellido: document.getElementById('clienteApellido').value,
            usuario_edad: edad,
            usuario_genero: document.getElementById('clienteGenero').value,
            usuario_email: document.getElementById('clienteEmail').value,
            usuario_telefono: document.getElementById('clienteTelefono').value,
            usuario_usuario: usuarioGenerado,
            usuario_contrasena: contrasena, // Contraseña generada a partir de la cédula
            cliente_pais: document.getElementById('clientePais').value,
            cliente_direccion: document.getElementById('clienteDireccion').value,
        };

        // Enviar los datos al backend
        fetch('/madecor/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            mostrarMensaje('Cliente creado con éxito.');
            formCliente.reset();
            obtenerClientes(); // Recargar la lista de clientes
        })
        .catch(error => {
            console.error('Error al guardar el cliente:', error);
            mostrarMensaje('Error al crear cliente.', 'error');
        });
    });

    // Obtener la lista de clientes
function obtenerClientes(query = '') {
    fetch(`/madecor/clientes?q=${query}`)
        .then(response => response.json())
        .then(data => {
            tablaClientes.innerHTML = ''; // Limpiar tabla
    
            const encabezados = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>País</th>
                        <th>Dirección</th>
                        <th>Estado</th>
                        ${query ? '<th>Acciones</th>' : ''}
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            tablaClientes.innerHTML = encabezados;
    
            const tbody = tablaClientes.querySelector('tbody');
    
            if (!data || data.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="${query ? 11 : 10}" class="text-center">No se encontraron clientes</td>
                    </tr>
                `;
            } else {
                data.forEach(cliente => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${cliente.usuario_id}</td>
                        <td>${cliente.usuario_cedula}</td>
                        <td>${cliente.usuario_nombre}</td>
                        <td>${cliente.usuario_apellido}</td>
                        <td>${cliente.usuario_edad}</td>
                        <td>${cliente.usuario_email}</td>
                        <td>${cliente.usuario_telefono}</td>
                        <td>${cliente.cliente_pais}</td>
                        <td>${cliente.cliente_direccion}</td>
                        <td>${cliente.usuario_estado}</td>
                        ${query ? `
                            <td>
                                <button class="btn btn-primary btn-sm mx-2" onclick="editarCliente(${cliente.usuario_cedula})">Editar</button>
                                <button class="btn ${cliente.usuario_estado === 'activo' ? 'btn-danger' : 'btn-success'} btn-sm" onclick="cambiarEstadoCliente(${cliente.usuario_cedula}, '${cliente.usuario_estado}')">
                                    ${cliente.usuario_estado === 'activo' ? 'Eliminar' : 'Deshacer'}
                                </button>
                            </td>` : ''}
                    `;
                    tbody.appendChild(tr);
                });
            }
        })
        .catch((err) => console.error('Error al obtener clientes:', err));
}


    // Función para editar cliente
    window.editarCliente = function (cedula) {
    listadoForm.classList.add('d-none');
    editarClienteForm.classList.remove('d-none');

    fetch(`/madecor/clientes/${cedula}`)
        .then(response => {
            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error('No se pudo obtener el cliente');
            }
            return response.json();
        })
        .then(data => {
            // Verificar si los datos son correctos
            if (!data) {
                throw new Error('No se encontraron datos del cliente');
            }
            document.getElementById('editarClienteNombre').value = data.usuario_nombre || '';
            document.getElementById('editarClienteApellido').value = data.usuario_apellido || '';
            document.getElementById('editarClienteEmail').value = data.usuario_email || '';
            document.getElementById('editarClienteTelefono').value = data.usuario_telefono || '';
            document.getElementById('editarClienteDireccion').value = data.cliente_direccion || '';
            document.getElementById('editarClientePais').value = data.cliente_pais || '';
            formEditarCliente.setAttribute('data-cliente-cedula', cedula);
        })
        .catch(err => {
            console.error('Error al obtener datos del cliente:', err);
            mostrarMensaje('No se pudo cargar los datos del cliente.', 'error');
        });
};


    
    // Función para guardar los cambios del cliente
    formEditarCliente.addEventListener('submit', function (event) {
        event.preventDefault();
        const cedula = formEditarCliente.getAttribute('data-cliente-cedula');
        const nombre = document.getElementById('editarClienteNombre').value;
        const apellido = document.getElementById('editarClienteApellido').value;
        const email = document.getElementById('editarClienteEmail').value;
        const telefono = document.getElementById('editarClienteTelefono').value;
        const direccion = document.getElementById('editarClienteDireccion').value;
        const pais = document.getElementById('editarClientePais').value;


        fetch(`/madecor/clientes/${cedula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario_nombre: nombre,
                usuario_apellido: apellido,
                usuario_email: email,
                usuario_telefono: telefono,
                cliente_pais: pais,
                cliente_direccion: direccion,
            }),
        })
        .then(response => response.json())
        .then(data => {
            obtenerClientes();
            listadoForm.classList.remove('d-none');
            editarClienteForm.classList.add('d-none');
            mostrarMensaje('Cliente actualizado con éxito.');
        })
        .catch(err => {
            console.error('Error al actualizar cliente:', err);
            mostrarMensaje('Error al actualizar cliente.', 'error');
        });
    });

    // Función para cambiar el estado del cliente
    window.cambiarEstadoCliente = function (cedula, estadoActual) {
        const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';

        fetch(`/madecor/clientes/${cedula}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado }),
        })
            .then(response => response.json())
            .then(data => {
                obtenerClientes();
                mostrarMensaje(nuevoEstado === 'activo' ? 'Cliente restaurado.' : 'Cliente eliminado.');
            })
            .catch(err => {
                console.error('Error al cambiar estado del cliente:', err);
                mostrarMensaje('Error al cambiar estado del cliente.', 'error');
            });
    };

    // Evento de búsqueda
    barraBusqueda.addEventListener('input', function () {
        const query = barraBusqueda.value;
        obtenerClientes(query);
    });

    obtenerClientes(); // Inicializar lista de clientes

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
