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
    loadUserTable('clientes');
});


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
            const tipo = this.getAttribute('data-tipo');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../php/active.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable('clientes');
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
            xhr.open('POST', '../php/delete.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable('clientes');
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
    xhr.open('GET', 'editar/edit_client.php?id=' + encodeURIComponent(id), true);
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
                        loadUserTable('clientes'); 
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

            const form = document.querySelector('form');
            form.addEventListener('submit', function(e) {
                e.preventDefault(); 

                const xhr = new XMLHttpRequest();
                xhr.open('POST', form.action, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        showMessage(response.status, response.message);
                        if (response.status === 'success') {
                            form.reset(); 
                        }
                    } else {
                        showMessage('error', 'Error en la conexión con el servidor');
                    }
                };

                const formData = new FormData(form);
                const params = new URLSearchParams(formData).toString();
                xhr.send(params);
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