document.getElementById('nuevoBtn').addEventListener('click', function () {
  document.getElementById('nuevo').classList.remove('d-none');
  document.getElementById('listado').classList.add('d-none');
  document.getElementById('editarPermisoForm').classList.add('d-none'); 
  this.classList.add('active');
  document.getElementById('listadoBtn').classList.remove('active');
});

document.getElementById('listadoBtn').addEventListener('click', function () {
  document.getElementById('listado').classList.remove('d-none');
  document.getElementById('nuevo').classList.add('d-none');
  document.getElementById('editarPermisoForm').classList.add('d-none'); 
  this.classList.add('active');
  document.getElementById('nuevoBtn').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const formPermiso = document.getElementById('formPermiso');
    const tablaPermisos = document.getElementById('tablaPermisos');
    const barraBusqueda = document.getElementById('barraBusqueda');
    const editarPermisoForm = document.getElementById('editarPermisoForm');
    const listadoForm = document.getElementById('listado');
     
    function obtenerPermisos(query = '') {
        fetch(`https://madecor-backend.vercel.app/madecor/permisos?q=${query}`) 
            .then(response => response.json())
            .then(data => {
                tablaPermisos.innerHTML = ''; 

                const encabezados = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            ${query ? '<th>Acciones</th>' : ''} 
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                tablaPermisos.innerHTML = encabezados;

                const tbody = tablaPermisos.querySelector('tbody');

                if (data.length === 0) {
                    tbody.innerHTML = `
                        <tr>
                            <td colspan="${query ? 4 : 3}" class="text-center">No se encontraron permisos</td>
                        </tr>
                    `;
                } else {
                    data.forEach(permiso => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${permiso.permiso_id}</td>
                            <td>${permiso.permiso_nombre}</td>
                            <td>${permiso.permiso_descripcion}</td>
                            ${query ? `
                                <td>
                                    <button class="btn btn-primary btn-sm mx-2" onclick="editarPermiso(${permiso.permiso_id})">Editar</button>
                                    <button class="btn ${permiso.permiso_estado === 'activo' ? 'btn-danger' : 'btn-success'} btn-sm" onclick="cambiarEstado(${permiso.permiso_id}, '${permiso.permiso_estado}')">
                                        ${permiso.permiso_estado === 'activo' ? 'Eliminar' : 'Deshacer'}
                                    </button>

                                </td>` : ''}
                        `;
                        tbody.appendChild(tr);
                    });
                }
            })
            .catch(err => console.error('Error al obtener permisos:', err));
    }

formPermiso.addEventListener('submit', function (event) {
  event.preventDefault();

  const permisoNombre = document.getElementById('permisoNombre').value;
  const permisoDescripcion = document.getElementById('permisoDescripcion').value;

  const moduloPermisos = [];
  const checkboxes = document.querySelectorAll('input[name="modulos"]:checked');
  checkboxes.forEach((checkbox) => {
      moduloPermisos.push(checkbox.value);
  });

  fetch('https://madecor-backend.vercel.app/madecor/permisos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          permiso_nombre: permisoNombre,
          permiso_descripcion: permisoDescripcion,
          permiso_detalle: moduloPermisos, 
      }),
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data.message);
      obtenerPermisos(); 
      mostrarMensaje('Permiso creado con éxito.');
  })
  .catch(err => {
      console.error('Error al crear permiso:', err);
      mostrarMensaje('Error al crear permiso.', 'error');
  });
});

    window.editarPermiso = function (id) {
        listadoForm.classList.add('d-none');
        editarPermisoForm.classList.remove('d-none');

        fetch(`https://madecor-backend.vercel.app/madecor/permisos/${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('editarPermisoNombre').value = data.permiso_nombre;
                document.getElementById('editarPermisoDescripcion').value = data.permiso_descripcion;

                const modulos = data.permiso_detalle.modulos || [];
                const checkboxes = document.querySelectorAll('#editarModulos input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                    if (modulos.includes(checkbox.value)) {
                        checkbox.checked = true;
                    }
                });

                formEditarPermiso.setAttribute('data-permiso-id', id);
            })
            .catch(err => console.error('Error al obtener permiso:', err));
    };

formEditarPermiso.addEventListener('submit', function (event) {
    event.preventDefault();
    const permisoId = formEditarPermiso.getAttribute('data-permiso-id');
    const permisoNombre = document.getElementById('editarPermisoNombre').value;
    const permisoDescripcion = document.getElementById('editarPermisoDescripcion').value;
    
    const moduloPermisos = [];
    const checkboxes = document.querySelectorAll('#editarModulos input[name="modulos"]:checked');
    checkboxes.forEach((checkbox) => {
      moduloPermisos.push(checkbox.value);
    });
  
    const permisoDetalle = { modulos: moduloPermisos };
  
    fetch(`https://madecor-backend.vercel.app/madecor/permisos/${permisoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        permiso_nombre: permisoNombre,
        permiso_descripcion: permisoDescripcion,
        permiso_detalle: permisoDetalle,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      obtenerPermisos();
      listadoForm.classList.remove('d-none');
      editarPermisoForm.classList.add('d-none');
      mostrarMensaje('Permiso actualizado con éxito.');
    })
    .catch(err => {
      console.error('Error al editar permiso:', err);
      mostrarMensaje('Error al editar permiso.', 'error');
    });
  });
  
        window.cambiarEstado = function (id, estadoActual) {
            const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
            fetch(`https://madecor-backend.vercel.app/madecor/permisos/${id}/estado`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ estado: nuevoEstado }),
            })
            .then(response => response.json())
            .then(data => {
              obtenerPermisos();
              mostrarMensaje(nuevoEstado === 'activo' ? 'Permiso restaurado.' : 'Permiso eliminado.');
            })
            .catch(err => {
              console.error('Error al cambiar estado:', err);
              mostrarMensaje('Error al cambiar estado.', 'error');
            });
          };
          
    barraBusqueda.addEventListener('input', function () {
        const query = barraBusqueda.value.trim();
        obtenerPermisos(query);
    });

    obtenerPermisos();

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


