document.getElementById('nuevoBtn').addEventListener('click', function () {
  document.getElementById('nuevo').classList.remove('d-none');
  document.getElementById('listado').classList.add('d-none');
  document.getElementById('editarPermisoForm').classList.add('d-none'); // Ocultar el formulario de edición
  this.classList.add('active');
  document.getElementById('listadoBtn').classList.remove('active');
});

document.getElementById('listadoBtn').addEventListener('click', function () {
  document.getElementById('listado').classList.remove('d-none');
  document.getElementById('nuevo').classList.add('d-none');
  document.getElementById('editarPermisoForm').classList.add('d-none'); // Ocultar el formulario de edición
  this.classList.add('active');
  document.getElementById('nuevoBtn').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const formPermiso = document.getElementById('formPermiso');
    const tablaPermisos = document.getElementById('tablaPermisos');
    const barraBusqueda = document.getElementById('barraBusqueda'); // Barra de búsqueda
    const editarPermisoForm = document.getElementById('editarPermisoForm');
    const listadoForm = document.getElementById('listado');
     
    

    // Obtener y mostrar los permisos
    function obtenerPermisos(query = '') {
        fetch(`http://localhost:3000/madecor/permisos?q=${query}`) // Pasar query como parámetro
            .then(response => response.json())
            .then(data => {
                tablaPermisos.innerHTML = ''; // Limpiar tabla

                // Crear encabezados de la tabla
                const encabezados = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            ${query ? '<th>Acciones</th>' : ''} <!-- Mostrar acciones solo si hay búsqueda -->
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

   // Crear un nuevo permiso
formPermiso.addEventListener('submit', function (event) {
  event.preventDefault();

  const permisoNombre = document.getElementById('permisoNombre').value;
  const permisoDescripcion = document.getElementById('permisoDescripcion').value;

  // Recoger los módulos seleccionados
  const moduloPermisos = [];
  const checkboxes = document.querySelectorAll('input[name="modulos"]:checked');
  checkboxes.forEach((checkbox) => {
      moduloPermisos.push(checkbox.value);
  });

  // Enviar el array directamente
  fetch('http://localhost:3000/madecor/permisos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          permiso_nombre: permisoNombre,
          permiso_descripcion: permisoDescripcion,
          permiso_detalle: moduloPermisos,  // Aquí enviamos el array directamente
      }),
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data.message);
      obtenerPermisos(); // Recargar lista de permisos
      mostrarMensaje('Permiso creado con éxito.');
  })
  .catch(err => {
      console.error('Error al crear permiso:', err);
      mostrarMensaje('Error al crear permiso.', 'error');
  });
});


    // Función para editar permiso
    window.editarPermiso = function (id) {
        // Primero, ocultamos el listado y mostramos el formulario de edición
        listadoForm.classList.add('d-none');
        editarPermisoForm.classList.remove('d-none');

        // Hacer fetch para obtener los datos del permiso a editar
        fetch(`http://localhost:3000/madecor/permisos/${id}`)
            .then(response => response.json())
            .then(data => {
                // Rellenamos el formulario de edición con los datos del permiso
                document.getElementById('editarPermisoNombre').value = data.permiso_nombre;
                document.getElementById('editarPermisoDescripcion').value = data.permiso_descripcion;

                // Marcar los checkboxes de los módulos seleccionados
                const modulos = data.permiso_detalle.modulos || [];
                const checkboxes = document.querySelectorAll('#editarModulos input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                    if (modulos.includes(checkbox.value)) {
                        checkbox.checked = true;
                    }
                });

                // Almacenar el id del permiso para usarlo en la actualización
                formEditarPermiso.setAttribute('data-permiso-id', id);
            })
            .catch(err => console.error('Error al obtener permiso:', err));
    };

    // Actualizar permiso
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
  
    fetch(`http://localhost:3000/madecor/permisos/${permisoId}`, {
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
  
    
        // Cambiar estado del permiso (eliminar/deshacer)
        window.cambiarEstado = function (id, estadoActual) {
            const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
            fetch(`http://localhost:3000/madecor/permisos/${id}/estado`, {
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
          

    // Evento de búsqueda
    barraBusqueda.addEventListener('input', function () {
        const query = barraBusqueda.value.trim();
        obtenerPermisos(query);
    });

    obtenerPermisos(); // Inicializar la lista de permisos

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


