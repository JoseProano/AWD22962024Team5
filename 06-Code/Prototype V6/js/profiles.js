document.getElementById('perfil').addEventListener('input', function() {
    const perfil = this.value.toLowerCase();
    const permissions = {
        'administrador': ['Inicio', 'Asignar', 'Cliente', 'Ventas', 'Productos', 'Proveedores', 'Reportes'],
        'ventas': ['Inicio', 'Cliente', 'Ventas', 'Reportes'],
        'bodega': ['Inicio', 'Productos', 'Proveedores', 'Reportes']
    };
    
    const checkboxes = document.querySelectorAll('input[name="permisos[]"]');
    const permissoesParaPerfil = permissions[perfil] || [];
    
    checkboxes.forEach(checkbox => {
        if (permissoesParaPerfil.includes(checkbox.value)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
});


        function showMessage(type, message) {
            const messageBox = document.createElement('div');
            messageBox.className = `message ${type}`;
            messageBox.textContent = message;
            document.getElementById('messageContainer').appendChild(messageBox);

            setTimeout(function() {
                messageBox.style.opacity = 0;
                setTimeout(function() {
                    document.getElementById('messageContainer').removeChild(messageBox);
                }, 300); 
            }, 3000); 
        }

        const form = document.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'save.php', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === 'success') {
                        showMessage('success', response.message);
                        form.reset(); 
                    } else {
                        showMessage('error', response.message);
                    }
                } else {
                    showMessage('error', 'Error en la conexión con el servidor');
                }
            };
            xhr.send(formData);
        });

let isEditing = false;

document.getElementById('newProfileTab').addEventListener('click', function() {
    if (isEditing) {
        document.getElementById('formSection1').style.display = 'none';
        document.getElementById('userTable').style.display = 'block';
        isEditing = false; 
    }
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('listSection').style.display = 'none';
});

document.getElementById('listTab').addEventListener('click', function() {
    if (isEditing) {
        document.getElementById('formSection1').style.display = 'none'; 
        document.getElementById('userTable').style.display = 'block'; 
        isEditing = false; 
    }
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('listSection').style.display = 'block';
    loadUserTable();
});

		function loadUserTable() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_users.php', true);
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
            const tipo = this.getAttribute('data-tipo'); 
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'active.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable();
                } else {
                    showMessage('error', 'Error en la conexión con el servidor');
                }
            };
            xhr.send('id=' + encodeURIComponent(id) + '&tipo=' + encodeURIComponent(tipo)); 
        });
    });

    document.querySelectorAll('.btn-deactivate').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const tipo = this.getAttribute('data-tipo');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable();
                } else {
                    showMessage('error', 'Error en la conexión con el servidor');
                }
            };
            xhr.send('id=' + encodeURIComponent(id) + '&tipo=' + encodeURIComponent(tipo));
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
    isEditing = true; 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'editar/get_users.php?id=' + encodeURIComponent(id), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('formSection1').innerHTML = xhr.responseText;
            document.getElementById('formSection1').style.display = 'block';
            document.getElementById('userTable').style.display = 'none'; 
			
            const editForm = document.getElementById('editForm');
            editForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(editForm);

                const xhrSubmit = new XMLHttpRequest();
                xhrSubmit.open('POST', editForm.action, true);
                xhrSubmit.onload = function() {
                    if (xhrSubmit.status === 200) {
                        const response = JSON.parse(xhrSubmit.responseText);
                        showMessage(response.status, response.message);
                        loadUserTable(); 
                        document.getElementById('formSection1').style.display = 'none';
                        document.getElementById('userTable').style.display = 'block'; 
                        isEditing = false; 
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

