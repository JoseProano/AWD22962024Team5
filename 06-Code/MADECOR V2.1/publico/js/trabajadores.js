document.getElementById('nuevoBtn').addEventListener('click', function () {
    document.getElementById('nuevo').classList.remove('d-none');
    document.getElementById('listado').classList.add('d-none');
    document.getElementById('editarTrabajadorForm').classList.add('d-none'); 
    this.classList.add('active');
    document.getElementById('listadoBtn').classList.remove('active');
  });
  
  document.getElementById('listadoBtn').addEventListener('click', function () {
    document.getElementById('listado').classList.remove('d-none');
    document.getElementById('nuevo').classList.add('d-none');
    document.getElementById('editarTrabajadorForm').classList.add('d-none'); 
    this.classList.add('active');
    document.getElementById('nuevoBtn').classList.remove('active');
  });

  document.addEventListener('DOMContentLoaded', () => {
    
    const formTrabajador = document.getElementById('formTrabajador');
    const tablaTrabajadores = document.getElementById('tablaTrabajadores');
    const barraBusqueda = document.getElementById('barraBusqueda'); 
    const editarTrabajadorForm = document.getElementById('editarTrabajadorForm');
    const listadoForm = document.getElementById('listado');

    function cargarPermisos(selectId) {
    fetch('https://madecor-backend.vercel.app/madecor/permisos')
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

cargarPermisos('trabajadorPermiso'); 

    formTrabajador.addEventListener('submit', function(event) {
        event.preventDefault();

        const nacimiento = new Date(document.getElementById('usuarioNacimiento').value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

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
            trabajador_perfil: permisoNombre,
            trabajador_permiso_id: permisoId, 
            usuario_tipo: "trabajador", 
        };

        fetch('https://madecor-backend.vercel.app/madecor/trabajadores', {
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
            obtenerTrabajadores(); 
        })
        .catch(error => {
            console.error('Error al guardar el trabajador:', error);
            mostrarMensaje('Error al crear empleado.', 'error');
        });
    });

    function obtenerTrabajadores(query = '') {
        fetch(`https://madecor-backend.vercel.app/madecor/trabajadores?q=${query}`)
            .then(response => response.json())
            .then(data => {
                tablaTrabajadores.innerHTML = ''; 
    
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

window.editarTrabajador = function (cedula) {
    listadoForm.classList.add('d-none');
    editarTrabajadorForm.classList.remove('d-none');

    fetch(`https://madecor-backend.vercel.app/madecor/trabajadores/${cedula}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener los datos del trabajador');
            return response.json();
        })
        .then(data => {
            document.getElementById('editarTrabajadorNombre').value = data.usuario_nombre || '';
            document.getElementById('editarTrabajadorApellido').value = data.usuario_apellido || '';
            document.getElementById('editarTrabajadorEmail').value = data.usuario_email || '';
            document.getElementById('editarTrabajadorTelefono').value = data.usuario_telefono || '';
            cargarPermisos('editarTrabajadorPermiso');
            const permisoSelect = document.getElementById('editarTrabajadorPermiso');
            permisoSelect.value = data.trabajador_permiso_id; 

            formEditarTrabajador.setAttribute('data-trabajador-cedula', cedula);
        })
        .catch(err => console.error('Error al obtener datos del trabajador:', err));
};

formEditarTrabajador.addEventListener('submit', function (event) {
    event.preventDefault();
    const cedula = formEditarTrabajador.getAttribute('data-trabajador-cedula');
    const nombre = document.getElementById('editarTrabajadorNombre').value;
    const apellido = document.getElementById('editarTrabajadorApellido').value;
    const email = document.getElementById('editarTrabajadorEmail').value;
    const telefono = document.getElementById('editarTrabajadorTelefono').value;
    
    const permisoSeleccionado = document.getElementById('editarTrabajadorPermiso');
    const permisoNombre = permisoSeleccionado.options[permisoSeleccionado.selectedIndex].text;
    const permisoId = permisoSeleccionado.value;

    fetch(`https://madecor-backend.vercel.app/madecor/trabajadores/${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_nombre: nombre,
            usuario_apellido: apellido,
            usuario_email: email,
            usuario_telefono: telefono,
            trabajador_perfil: permisoNombre, 
            trabajador_permiso_id: permisoId, 
        }),
    })
    .then(response => response.json())
    .then(data => {
        obtenerTrabajadores(); 
        listadoForm.classList.remove('d-none'); 
        editarTrabajadorForm.classList.add('d-none'); 
        mostrarMensaje('Trabajador actualizado con éxito.'); 
    })
    .catch(err => {
        console.error('Error al actualizar trabajador:', err);
        mostrarMensaje('Error al actualizar trabajador.', 'error'); 
    });
});

window.cambiarEstadoTrabajador = function (cedula, estadoActual) {
    const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';

    fetch(`https://madecor-backend.vercel.app/madecor/trabajadores/${cedula}/estado`, {
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

    barraBusqueda.addEventListener('input', () => {
        const query = barraBusqueda.value.trim(); 
        obtenerTrabajadores(query); 
      });

    obtenerTrabajadores(); 

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
