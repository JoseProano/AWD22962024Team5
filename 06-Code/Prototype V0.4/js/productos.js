// Load Providers
    const loadProviders = () => {
        fetch('fetch_providers.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('proveedor_producto').innerHTML = data;
            });
    };


    loadProviders();


    // Mostrar mensajes flotantes
    function showMessage(type, message) {
        const messageBox = document.createElement('div');
        messageBox.className = `message ${type}`;
        messageBox.textContent = message;
        document.getElementById('messageContainer').appendChild(messageBox);

        setTimeout(function() {
            messageBox.style.opacity = 0;
            setTimeout(function() {
                document.getElementById('messageContainer').removeChild(messageBox);
            }, 300); // Tiempo para que el mensaje se desvanezca
        }, 3000); // Tiempo que el mensaje permanecerá visible
    }

    // Enviar formulario mediante AJAX
    const form = document.getElementById('newProductForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío normal del formulario

        const xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    if (response.status === 'success') {
                        form.reset(); // Limpiar el formulario después de un envío exitoso
                    }
                } catch (error) {
                    showMessage('error', 'Respuesta no válida del servidor');
                }
            } else {
                showMessage('error', 'Error en la conexión con el servidor');
            }
        };

        const formData = new FormData(form);
        const params = new URLSearchParams(formData).toString();
        xhr.send(params);
    });


let isEditing = false; // Variable de estado para saber si se está editando

document.getElementById('newProfileTab').addEventListener('click', function() {
    if (isEditing) {
        // Si se está editando, oculta el formulario de edición y muestra la lista
        document.getElementById('formSection1').style.display = 'none'; // Ocultar el formulario de edición
        document.getElementById('userTable').style.display = 'block'; // Mostrar la tabla
        isEditing = false; // Desactivar el estado de edición
    }
    // Mostrar el formulario para nuevo perfil
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('listSection').style.display = 'none';
});

document.getElementById('listTab').addEventListener('click', function() {
    if (isEditing) {
        // Si se está editando, oculta el formulario de edición y muestra la lista
        document.getElementById('formSection1').style.display = 'none'; // Ocultar el formulario de edición
        document.getElementById('userTable').style.display = 'block'; // Mostrar la tabla
        isEditing = false; // Desactivar el estado de edición
    }
    // Mostrar la tabla de usuarios
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('listSection').style.display = 'block';
    loadUserTable('productos');
});


// Cargar la tabla de usuarios mediante AJAX
function loadUserTable(tipo) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_users.php?tipo=' + encodeURIComponent(tipo), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('userTable').innerHTML = xhr.responseText;
            addActionListeners();
        }
    };
    xhr.send();
}

function addActionListeners() {
    document.querySelectorAll('.btn-activate').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const tipo = this.getAttribute('data-tipo'); // Obtener el tipo del atributo 'data-tipo'
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'activar.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable('productos');
                } else {
                    showMessage('error', 'Error en la conexión con el servidor');
                }
            };
            xhr.send('id=' + encodeURIComponent(id) + '&tipo=' + encodeURIComponent(tipo)); // Enviar el tipo en la solicitud
        });
    });

    document.querySelectorAll('.btn-deactivate').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const tipo = this.getAttribute('data-tipo'); // Obtener el tipo del atributo 'data-tipo'
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'eliminar.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable('productos');
                } else {
                    showMessage('error', 'Error en la conexión con el servidor');
                }
            };
            xhr.send('id=' + encodeURIComponent(id) + '&tipo=' + encodeURIComponent(tipo)); // Enviar el tipo en la solicitud
        });
    });
	document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            loadEditForm(id);
        });
    });
}

function loadEditForm(id) {
    isEditing = true; // Activar el estado de edición
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'editar/edit_product.php?id=' + encodeURIComponent(id), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('formSection1').innerHTML = xhr.responseText;
            document.getElementById('formSection1').style.display = 'block';
            document.getElementById('userTable').style.display = 'none'; // Ocultar la tabla

            // Configurar el envío del formulario con AJAX
            const editForm = document.getElementById('editForm');
            editForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar la recarga de la página
                const formData = new FormData(editForm);

                const xhrSubmit = new XMLHttpRequest();
                xhrSubmit.open('POST', editForm.action, true);
                xhrSubmit.onload = function() {
                    if (xhrSubmit.status === 200) {
                        const response = JSON.parse(xhrSubmit.responseText);
                        showMessage(response.status, response.message);
                        loadUserTable('productos'); // Recargar la tabla de usuarios
                        document.getElementById('formSection1').style.display = 'none'; // Ocultar el formulario
                        document.getElementById('userTable').style.display = 'block'; // Mostrar la tabla
                        isEditing = false; // Desactivar el estado de edición
                    } else {
                        showMessage('error', 'Error al actualizar el usuario');
                    }
                };
                xhrSubmit.send(formData);
            });
        } else {
            showMessage('error', 'Error al cargar el formulario de edición');
        }
    };
    xhr.send();
}