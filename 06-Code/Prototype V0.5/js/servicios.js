function calcularTotal() {
    const costoServicio = parseFloat(document.getElementById('costo_servicio').value) || 0;
    const productos = productosSeleccionados;

    let costoProductosTotal = 0;
    productos.forEach(producto => {
        const costoProducto = parseFloat(producto.costo) || 0;
        costoProductosTotal += costoProducto * producto.cantidad;
    });

    const costoTotal = costoServicio + costoProductosTotal;
    document.getElementById('total_costo_servicio').value = costoTotal.toFixed(2);
}

const verificarStock = (productoId, cantidad) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'check_stock.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const stockDisponible = parseInt(xhr.responseText, 10);
                if (isNaN(stockDisponible)) {
                    reject('Error al consultar el stock.');
                } else {
                    resolve(stockDisponible);
                }
            } else {
                reject('Error en la solicitud.');
            }
        };
        xhr.send(`id=${encodeURIComponent(productoId)}`);

    });
};

// Cargar productos para el servicio
const loadProducts = () => {
    fetch('fetch_products.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('producto_servicio').innerHTML = data;
        });
};

loadProducts();

// Añadir producto al servicio
const addProductBtn = document.getElementById('addProduct');
const addedProductsList = document.getElementById('addedProductsList');
const productosJsonInput = document.getElementById('productos_json');
let productosSeleccionados = [];

addProductBtn.addEventListener('click', () => {
    const productoSelect = document.getElementById('producto_servicio');
    const cantidadInput = document.getElementById('cantidad_producto_servicio');

    const productoId = productoSelect.value;
    const productoNombre = productoSelect.options[productoSelect.selectedIndex].text;
    const cantidad = parseInt(cantidadInput.value, 10);

    if (productoId && cantidad > 0) {
        verificarStock(productoId, cantidad)
            .then(stockDisponible => {
                if (stockDisponible < cantidad) {
                    showMessage('error', 'No hay suficiente stock para este producto.');
                } else {
                    const productoExistente = productosSeleccionados.find(p => p.id === productoId);

                    if (productoExistente) {
                        productoExistente.cantidad = cantidad;
                    } else {
                        const costoProducto = parseFloat(productoSelect.options[productoSelect.selectedIndex].getAttribute('data-costo'));
                        productosSeleccionados.push({ id: productoId, nombre: productoNombre, cantidad: cantidad, costo: costoProducto });
                    }

                    actualizarListaProductos();
                    productosJsonInput.value = JSON.stringify(productosSeleccionados);
                    calcularTotal(); 
                }
            })
            .catch(error => showMessage('error', error));
    }
});

function actualizarListaProductos() {
    addedProductsList.innerHTML = '';
    productosSeleccionados.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - Cantidad: ${producto.cantidad} - Costo: ${(producto.costo * producto.cantidad).toFixed(2)} <button class="removeProduct">Eliminar</button>`;
        addedProductsList.appendChild(li);
    });
}

addedProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('removeProduct')) {
        const li = e.target.closest('li');
        const productoNombre = li.textContent.split(' - ')[0];
        const producto = productosSeleccionados.find(p => p.nombre === productoNombre);

        if (producto) {
            productosSeleccionados = productosSeleccionados.filter(p => p.nombre !== productoNombre);
            productosJsonInput.value = JSON.stringify(productosSeleccionados);

            li.remove();
            calcularTotal(); 
        }
    }
});

document.getElementById('costo_servicio').addEventListener('input', calcularTotal);

  
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
    loadUserTable('servicios');
});	 

function loadUserTable(tipo) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_users.php?tipo=' + encodeURIComponent(tipo), true); 
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('userTable').innerHTML = xhr.responseText;
            addActionListeners();
        } else {
            showMessage('error', 'Error al cargar los datos');
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
            xhr.open('POST', 'activar.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable('servicios');
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
            xhr.open('POST', 'eliminar.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showMessage(response.status, response.message);
                    loadUserTable('servicios');
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
    xhr.open('GET', 'editar/edit_service.php?id=' + encodeURIComponent(id), true); 
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
                        loadUserTable('servicios'); 
                        document.getElementById('formSection1').style.display = 'none'; 
                        document.getElementById('userTable').style.display = 'block'; 
                        isEditing = false; 
                    } else {
                        showMessage('error', 'Error al actualizar el servicio');
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


function showMessage(type, message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'message ' + type;
    messageBox.textContent = message;
    document.getElementById('messageContainer').appendChild(messageBox);

    setTimeout(function() {
        messageBox.style.opacity = 0;
        setTimeout(function() {
            document.getElementById('messageContainer').removeChild(messageBox);
        }, 300); 
    }, 3000); 
}

const form = document.getElementById('newServiceForm');
form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                showMessage(response.status, response.message);
                if (response.status === 'success') {
                    form.reset();
                    loadProducts(); 
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