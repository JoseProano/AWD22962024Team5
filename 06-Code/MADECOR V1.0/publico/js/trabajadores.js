document.getElementById('nuevoBtn').addEventListener('click', function () {
    document.getElementById('nuevo').classList.remove('d-none');
    document.getElementById('listado').classList.add('d-none');
    document.getElementById('editarTrabajadorForm').classList.add('d-none'); // Ocultar el formulario de edición
    this.classList.add('active');
    document.getElementById('listadoBtn').classList.remove('active');
  });
  
  document.getElementById('listadoBtn').addEventListener('click', function () {
    document.getElementById('listado').classList.remove('d-none');
    document.getElementById('nuevo').classList.add('d-none');
    document.getElementById('editarTrabajadorForm').classList.add('d-none'); // Ocultar el formulario de edición
    this.classList.add('active');
    document.getElementById('nuevoBtn').classList.remove('active');
  });

  document.addEventListener('DOMContentLoaded', () => {
    
    const formTrabajador = document.getElementById('formTrabajador');
    const tablaTrabajadores = document.getElementById('tablaTrabajadores');
    const barraBusqueda = document.getElementById('barraBusqueda'); // Barra de búsqueda
    const editarTrabajadorForm = document.getElementById('editarTrabajadorForm');
    const listadoForm = document.getElementById('listado');

    // Obtener permisos disponibles desde el backend para asignar permisos a trabajadores
    function cargarPermisos(selectId) {
    fetch('/madecor/permisos')
        .then((response) => response.json())
        .then((permisos) => {
            const permisoSelect = document.getElementById(selectId);
            permisos.forEach((permiso) => {
                const option = document.createElement('option');
                option.value = permiso.permiso_id;
                option.textContent = permiso.permiso_nombre;
                permisoSelect.appendChild(option);
            });
        })
        .catch((err) => console.error('Error al cargar permisos:', err));
}

cargarPermisos('trabajadorPermiso'); // Para creación

    // Crear un nuevo trabajador
    formTrabajador.addEventListener('submit', function(event) {
        event.preventDefault();

        // Calcular la edad
        const nacimiento = new Date(document.getElementById('usuarioNacimiento').value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        // Datos del trabajador
        const permisoSeleccionado = document.getElementById('trabajadorPermiso');
        const permisoNombre = permisoSeleccionado.options[permisoSeleccionado.selectedIndex].text;
        const permisoId = permisoSeleccionado.value;

        const trabajadorData = {
            usuario_cedula: document.getElementById('usuarioCedula').value,
            usuario_nombre: document.getElementById('usuarioNombre').value,
            usuario_apellido: document.getElementById('usuarioApellido').value,
            usuario_edad: edad,
            usuario_genero: document.getElementById('usuarioGenero').value,
            usuario_email: document.getElementById('usuarioEmail').value,
            usuario_telefono: document.getElementById('usuarioTelefono').value,
            usuario_usuario: document.getElementById('usuarioUsuario').value,
            usuario_contrasena: document.getElementById('usuarioContrasena').value,
            trabajador_perfil: permisoNombre, // Nombre del permiso (Perfil)
            trabajador_permiso_id: permisoId, // ID del permiso
            usuario_tipo: "trabajador", // Tipo de usuario predeterminado (oculto)
        };

        // Enviar los datos al backend
        fetch('/madecor/trabajadores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trabajadorData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            mostrarMensaje('Empleado creado con éxito.');
            formTrabajador.reset();
            obtenerTrabajadores(); // Recargar la lista de trabajadores
        })
        .catch(error => {
            console.error('Error al guardar el trabajador:', error);
            mostrarMensaje('Error al crear empleado.', 'error');
        });
    });

    function obtenerTrabajadores(query = '') {
        fetch(`/madecor/trabajadores?q=${query}`) // Pasar el parámetro q
            .then(response => response.json())
            .then(data => {
                tablaTrabajadores.innerHTML = ''; // Limpiar tabla
    
                // Crear encabezados de la tabla
                const encabezados = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Perfil</th>
                            <th>Email</th>
                            <th>Estado</th>
                            ${query ? '<th>Acciones</th>' : ''} <!-- Mostrar acciones solo si hay búsqueda -->
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                tablaTrabajadores.innerHTML = encabezados;
    
                const tbody = tablaTrabajadores.querySelector('tbody');
    
                if (!data || data.length === 0) {
                    tbody.innerHTML = `
                        <tr>
                            <td colspan="${query ? 7 : 6}" class="text-center">No se encontraron trabajadores</td>
                        </tr>
                    `;
                } else {
                    data.forEach(trabajador => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${trabajador.usuario_id}</td>
                            <td>${trabajador.usuario_cedula}</td>
                            <td>${trabajador.usuario_nombre} ${trabajador.usuario_apellido}</td>
                            <td>${trabajador.trabajador_perfil}</td>
                            <td>${trabajador.usuario_email}</td>
                            <td>${trabajador.usuario_estado}</td>
                            ${query ? `
                                <td>
                                    <button class="btn btn-primary btn-sm mx-2" onclick="editarTrabajador(${trabajador.usuario_cedula})">Editar</button>
                                    <button class="btn ${
                                        trabajador.usuario_estado === 'activo' ? 'btn-danger' : 'btn-success'
                                    } btn-sm" onclick="cambiarEstadoTrabajador(${trabajador.usuario_cedula}, '${trabajador.usuario_estado}')">
                                        ${trabajador.usuario_estado === 'activo' ? 'Eliminar' : 'Deshacer'}
                                    </button>
                                </td>` : ''}
                        `;
                        tbody.appendChild(tr);
                    });
                }
            })
            .catch((err) => console.error('Error al obtener trabajadores:', err));
    }

    // Función para editar trabajador
window.editarTrabajador = function (cedula) {
    // Ocultar el listado y mostrar el formulario de edición
    listadoForm.classList.add('d-none');
    editarTrabajadorForm.classList.remove('d-none');

    // Obtener los datos del trabajador
    fetch(`/madecor/trabajadores/${cedula}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener los datos del trabajador');
            return response.json();
        })
        .then(data => {
            // Rellenar el formulario con los datos del trabajador
            document.getElementById('editarTrabajadorNombre').value = data.usuario_nombre || '';
            document.getElementById('editarTrabajadorApellido').value = data.usuario_apellido || '';
            document.getElementById('editarTrabajadorEmail').value = data.usuario_email || '';
            document.getElementById('editarTrabajadorTelefono').value = data.usuario_telefono || '';
            cargarPermisos('editarTrabajadorPermiso');
            const permisoSelect = document.getElementById('editarTrabajadorPermiso');
            permisoSelect.value = data.trabajador_permiso_id; // Asumir que el ID del permiso está en trabajador_permiso_id

            
            // Almacenar la cédula del trabajador para la actualización
            formEditarTrabajador.setAttribute('data-trabajador-cedula', cedula);
        })
        .catch(err => console.error('Error al obtener datos del trabajador:', err));
};


// Función para guardar los cambios del trabajador
formEditarTrabajador.addEventListener('submit', function (event) {
    event.preventDefault();
    const cedula = formEditarTrabajador.getAttribute('data-trabajador-cedula');
    const nombre = document.getElementById('editarTrabajadorNombre').value;
    const apellido = document.getElementById('editarTrabajadorApellido').value;
    const email = document.getElementById('editarTrabajadorEmail').value;
    const telefono = document.getElementById('editarTrabajadorTelefono').value;
    
    // Obtener el permiso seleccionado y su ID
    const permisoSeleccionado = document.getElementById('editarTrabajadorPermiso');
    const permisoNombre = permisoSeleccionado.options[permisoSeleccionado.selectedIndex].text;
    const permisoId = permisoSeleccionado.value;

    // Realizar la actualización
    fetch(`/madecor/trabajadores/${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_nombre: nombre,
            usuario_apellido: apellido,
            usuario_email: email,
            usuario_telefono: telefono,
            trabajador_perfil: permisoNombre, // Nombre del permiso (Perfil)
            trabajador_permiso_id: permisoId, // ID del permiso
        }),
    })
    .then(response => response.json())
    .then(data => {
        obtenerTrabajadores(); // Recargar la lista de trabajadores
        listadoForm.classList.remove('d-none'); // Mostrar listado de trabajadores
        editarTrabajadorForm.classList.add('d-none'); // Ocultar formulario de edición
        mostrarMensaje('Trabajador actualizado con éxito.'); // Mostrar mensaje de éxito
    })
    .catch(err => {
        console.error('Error al actualizar trabajador:', err);
        mostrarMensaje('Error al actualizar trabajador.', 'error'); // Mostrar mensaje de error
    });
});


// Función para cambiar el estado del trabajador (activo/inactivo)
window.cambiarEstadoTrabajador = function (cedula, estadoActual) {
    const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';

    fetch(`/madecor/trabajadores/${cedula}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
    })
        .then(response => response.json())
        .then(data => {
            obtenerTrabajadores();
            mostrarMensaje(nuevoEstado === 'activo' ? 'Trabajador restaurado.' : 'Trabajador eliminado.');
        })
        .catch(err => {
            console.error('Error al cambiar estado del trabajador:', err);
            mostrarMensaje('Error al cambiar estado del trabajador.', 'error');
        });
};

    // Evento de búsqueda
    barraBusqueda.addEventListener('input', () => {
        const query = barraBusqueda.value.trim(); // Obtener el valor de la barra y eliminar espacios en blanco
        obtenerTrabajadores(query); // Pasar el valor como parámetro
      });

    obtenerTrabajadores(); // Inicializar la lista de trabajadores

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
