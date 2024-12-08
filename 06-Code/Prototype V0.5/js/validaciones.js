document.addEventListener('DOMContentLoaded', () => {
    function showError(input, message) {
        let error = input.parentElement.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('invalid');
    }

    function clearError(input) {
        let error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.textContent = '';
        }
        input.classList.remove('invalid');
    }

    function isAdult(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    }

    function toggleSubmitButton(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const allValid = form.querySelectorAll('.invalid').length === 0;
        submitButton.disabled = !allValid;
    }

    function validatePerfilForm(form) {
        const nombre = form.querySelector('#nombre');
        const apellido = form.querySelector('#apellido');
        const email = form.querySelector('#email');
        const genero = form.querySelector('#genero');
        const fechaNacimiento = form.querySelector('#fecha_nacimiento');
        const cedula = form.querySelector('#cedula');
        const usuario = form.querySelector('#usuario');
        const contraseña = form.querySelector('#contraseña');
        const perfil = form.querySelector('#perfil');

        // Validar Nombre
        nombre.addEventListener('input', () => {
            if (nombre.value.trim() === '') {
                showError(nombre, 'El nombre es obligatorio. Debe contener solo letras y espacios.');
            } else if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(nombre.value.trim())) {
                showError(nombre, 'El nombre solo debe contener letras y espacios.');
            } else {
                clearError(nombre);
            }
            toggleSubmitButton(form);
        });

        // Validar Apellido
        apellido.addEventListener('input', () => {
            if (apellido.value.trim() === '') {
                showError(apellido, 'El apellido es obligatorio. Debe contener solo letras y espacios.');
            } else if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(apellido.value.trim())) {
                showError(apellido, 'El apellido solo debe contener letras y espacios.');
            } else {
                clearError(apellido);
            }
            toggleSubmitButton(form);
        });

        // Validar Email
        email.addEventListener('input', () => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                showError(email, 'Ingresa un email válido en formato: ejemplo@dominio.com.');
            } else {
                clearError(email);
            }
            toggleSubmitButton(form);
        });

        // Validar Género
        genero.addEventListener('change', () => {
            if (genero.value === '') {
                showError(genero, 'Selecciona un género.');
            } else {
                clearError(genero);
            }
            toggleSubmitButton(form);
        });

        // Validar Fecha de Nacimiento
        fechaNacimiento.addEventListener('change', () => {
            if (!isAdult(fechaNacimiento.value)) {
                showError(fechaNacimiento, 'Debes ser mayor de 18 años. Ingresa una fecha válida.');
            } else {
                clearError(fechaNacimiento);
            }
            toggleSubmitButton(form);
        });

        // Validar Cédula
cedula.addEventListener('input', () => {
    validarCedula();
    toggleSubmitButton(form);
});

function validarCedula() {
    const cedula = document.getElementById("cedula");
    const valorCedula = cedula.value.trim();
    const regexNumeros = /^\d{10}$/;

    if (valorCedula === '') {
        showError(cedula, 'La cédula es obligatoria. Debe contener solo números.');
    } else if (!regexNumeros.test(valorCedula)) {
        showError(cedula, 'La cédula debe tener exactamente 10 dígitos.');
    } else {
        // Algoritmo de validación de cédula
        var digito_region = valorCedula.substring(0, 2);
        if (digito_region >= 1 && digito_region <= 24) {
            var ultimo_digito = valorCedula.substring(9, 10);
            var pares = parseInt(valorCedula.substring(1, 2)) + parseInt(valorCedula.substring(3, 4)) + parseInt(valorCedula.substring(5, 6)) + parseInt(valorCedula.substring(7, 8));
            var numero1 = parseInt(valorCedula.substring(0, 1)) * 2; if (numero1 > 9) { numero1 -= 9; }
            var numero3 = parseInt(valorCedula.substring(2, 3)) * 2; if (numero3 > 9) { numero3 -= 9; }
            var numero5 = parseInt(valorCedula.substring(4, 5)) * 2; if (numero5 > 9) { numero5 -= 9; }
            var numero7 = parseInt(valorCedula.substring(6, 7)) * 2; if (numero7 > 9) { numero7 -= 9; }
            var numero9 = parseInt(valorCedula.substring(8, 9)) * 2; if (numero9 > 9) { numero9 -= 9; }
            var impares = numero1 + numero3 + numero5 + numero7 + numero9;
            var suma_total = pares + impares;
            var primer_digito_suma = String(suma_total).substring(0, 1);
            var decena = (parseInt(primer_digito_suma) + 1) * 10;
            var digito_validador = decena - suma_total;
            if (digito_validador == 10) { digito_validador = 0; }

            if (digito_validador == ultimo_digito) {
                clearError(cedula);
            } else {
                showError(cedula, 'Error: Cédula no válida.');
            }
        } else {
            showError(cedula, 'Error: Esta cédula no pertenece a ninguna región.');
        }
    }
}


        // Validar Usuario
        usuario.addEventListener('input', () => {
            if (usuario.value.trim() === '') {
                showError(usuario, 'El nombre de usuario es obligatorio. Debe contener entre 4 y 20 caracteres.');
            } else if (!/^[\w\d]{4,20}$/.test(usuario.value.trim())) {
                showError(usuario, 'El usuario solo debe contener letras, números y guiones bajos, entre 4 y 20 caracteres.');
            } else {
                clearError(usuario);
            }
            toggleSubmitButton(form);
        });

        // Validar Contraseña
        contraseña.addEventListener('input', () => {
            if (contraseña.value.trim() === '') {
                showError(contraseña, 'La contraseña es obligatoria.');
            } else if (contraseña.value.length < 6) {
                showError(contraseña, 'La contraseña debe tener al menos 6 caracteres.');
            } else if (!/[A-Z]/.test(contraseña.value)) {
                showError(contraseña, 'La contraseña debe contener al menos una letra mayúscula.');
            } else if (!/[0-9]/.test(contraseña.value)) {
                showError(contraseña, 'La contraseña debe contener al menos un número.');
            } else {
                clearError(contraseña);
            }
            toggleSubmitButton(form);
        });

        // Validar Perfil
        perfil.addEventListener('input', () => {
            if (perfil.value.trim() === '') {
                showError(perfil, 'El perfil es obligatorio.');
            } else {
                clearError(perfil);
            }
            toggleSubmitButton(form);
        });
    }

    // Validaciones para el formulario de Registro Nuevo Cliente (tipo: cliente)
    function validateClienteForm(form) {
        const nombre = form.querySelector('#nombre');
        const apellido = form.querySelector('#apellido');
        const cedula = form.querySelector('#cedula');
        const numero = form.querySelector('#numero');
        const email = form.querySelector('#email');
        const fechaNacimiento = form.querySelector('#fecha_nacimiento');
        const genero = form.querySelector('#genero');
        const locacion = form.querySelector('#locacion');

        // Validar Nombre
        nombre.addEventListener('input', () => {
            if (nombre.value.trim() === '') {
                showError(nombre, 'El nombre es obligatorio. Debe contener solo letras y espacios.');
            } else if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(nombre.value.trim())) {
                showError(nombre, 'El nombre solo debe contener letras y espacios.');
            } else {
                clearError(nombre);
            }
            toggleSubmitButton(form);
        });

        // Validar Apellido
        apellido.addEventListener('input', () => {
            if (apellido.value.trim() === '') {
                showError(apellido, 'El apellido es obligatorio. Debe contener solo letras y espacios.');
            } else if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(apellido.value.trim())) {
                showError(apellido, 'El apellido solo debe contener letras y espacios.');
            } else {
                clearError(apellido);
            }
            toggleSubmitButton(form);
        });

        // Validar Cédula
cedula.addEventListener('input', () => {
    validarCedula();
    toggleSubmitButton(form);
});

function validarCedula() {
    const cedula = document.getElementById("cedula");
    const valorCedula = cedula.value.trim();
    const regexNumeros = /^\d{10}$/;

    if (valorCedula === '') {
        showError(cedula, 'La cédula es obligatoria. Debe contener solo números.');
    } else if (!regexNumeros.test(valorCedula)) {
        showError(cedula, 'La cédula debe tener exactamente 10 dígitos.');
    } else {
        // Algoritmo de validación de cédula
        var digito_region = valorCedula.substring(0, 2);
        if (digito_region >= 1 && digito_region <= 24) {
            var ultimo_digito = valorCedula.substring(9, 10);
            var pares = parseInt(valorCedula.substring(1, 2)) + parseInt(valorCedula.substring(3, 4)) + parseInt(valorCedula.substring(5, 6)) + parseInt(valorCedula.substring(7, 8));
            var numero1 = parseInt(valorCedula.substring(0, 1)) * 2; if (numero1 > 9) { numero1 -= 9; }
            var numero3 = parseInt(valorCedula.substring(2, 3)) * 2; if (numero3 > 9) { numero3 -= 9; }
            var numero5 = parseInt(valorCedula.substring(4, 5)) * 2; if (numero5 > 9) { numero5 -= 9; }
            var numero7 = parseInt(valorCedula.substring(6, 7)) * 2; if (numero7 > 9) { numero7 -= 9; }
            var numero9 = parseInt(valorCedula.substring(8, 9)) * 2; if (numero9 > 9) { numero9 -= 9; }
            var impares = numero1 + numero3 + numero5 + numero7 + numero9;
            var suma_total = pares + impares;
            var primer_digito_suma = String(suma_total).substring(0, 1);
            var decena = (parseInt(primer_digito_suma) + 1) * 10;
            var digito_validador = decena - suma_total;
            if (digito_validador == 10) { digito_validador = 0; }

            if (digito_validador == ultimo_digito) {
                clearError(cedula);
            } else {
                showError(cedula, 'Error: Cédula no válida.');
            }
        } else {
            showError(cedula, 'Error: Esta cédula no pertenece a ninguna región.');
        }
    }
}


        // Validar Número de Teléfono
numero.addEventListener('input', () => {
    const numeroPattern = /^09\d{8}$/; 
    if (!numeroPattern.test(numero.value.trim())) {
        showError(numero, 'El número de teléfono debe comenzar con 09 y tener exactamente 10 dígitos.');
    } else {
        clearError(numero);
    }
    toggleSubmitButton(form);
});


        // Validar Email (opcional, pero si se ingresa)
        email.addEventListener('input', () => {
            if (email.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    showError(email, 'Ingresa un email válido en formato: ejemplo@dominio.com.');
                } else {
                    clearError(email);
                }
            } else {
                clearError(email);
            }
            toggleSubmitButton(form);
        });

        // Validar Fecha de Nacimiento
        fechaNacimiento.addEventListener('change', () => {
            if (!isAdult(fechaNacimiento.value)) {
                showError(fechaNacimiento, 'Debes ser mayor de 18 años. Ingresa una fecha válida.');
            } else {
                clearError(fechaNacimiento);
            }
            toggleSubmitButton(form);
        });

        // Validar Género
        genero.addEventListener('change', () => {
            if (genero.value === '') {
                showError(genero, 'Selecciona un género.');
            } else {
                clearError(genero);
            }
            toggleSubmitButton(form);
        });

        // Validar Locación
        locacion.addEventListener('input', () => {
            if (locacion.value.trim() === '') {
                showError(locacion, 'La locación es obligatoria.');
            } else {
                clearError(locacion);
            }
            toggleSubmitButton(form);
        });
    }

    // Validaciones para el formulario de Registro Nuevo Producto (tipo: producto)
    function validateProductoForm(form) {
        const nombreProducto = form.querySelector('#nombre_producto');
        const proveedorProducto = form.querySelector('#proveedor_producto');
        const precioCompra = form.querySelector('#precio_compra');
        const precioProducto = form.querySelector('#precio_producto');
        const cantidadProducto = form.querySelector('#cantidad_producto');
        const marcaProducto = form.querySelector('#marca_producto');
        const categoriaProducto = form.querySelector('#categoria_producto');

        // Validar Nombre del Producto
        nombreProducto.addEventListener('input', () => {
            if (nombreProducto.value.trim() === '') {
                showError(nombreProducto, 'El nombre del producto es obligatorio.');
            } else {
                clearError(nombreProducto);
            }
            toggleSubmitButton(form);
        });

        // Validar Proveedor
        proveedorProducto.addEventListener('change', () => {
            if (proveedorProducto.value === '') {
                showError(proveedorProducto, 'Selecciona un proveedor.');
            } else {
                clearError(proveedorProducto);
            }
            toggleSubmitButton(form);
        });

        // Validar Precio de Compra
        precioCompra.addEventListener('input', () => {
            if (precioCompra.value === '' || parseFloat(precioCompra.value) <= 0) {
                showError(precioCompra, 'El precio de compra debe ser mayor a 0.');
            } else {
                clearError(precioCompra);
            }
            toggleSubmitButton(form);
        });

        // Validar Precio de Venta
        precioProducto.addEventListener('input', () => {
            if (precioProducto.value === '' || parseFloat(precioProducto.value) <= 0) {
                showError(precioProducto, 'El precio de venta debe ser mayor a 0.');
            } else {
                clearError(precioProducto);
            }
            toggleSubmitButton(form);
        });

        // Validar Cantidad/Stock
        cantidadProducto.addEventListener('input', () => {
            if (cantidadProducto.value === '' || parseInt(cantidadProducto.value) < 0) {
                showError(cantidadProducto, 'La cantidad debe ser 0 o mayor.');
            } else {
                clearError(cantidadProducto);
            }
            toggleSubmitButton(form);
        });

        // Validar Marca
        marcaProducto.addEventListener('input', () => {
            if (marcaProducto.value.trim() === '') {
                showError(marcaProducto, 'La marca es obligatoria.');
            } else {
                clearError(marcaProducto);
            }
            toggleSubmitButton(form);
        });

        // Validar Código del Producto
        categoriaProducto.addEventListener('input', () => {
            if (categoriaProducto.value.trim() === '') {
                showError(categoriaProducto, 'El código del producto es obligatorio.');
            } else {
                clearError(categoriaProducto);
            }
            toggleSubmitButton(form);
        });
    }

    // Validaciones para el formulario de Registro Nuevo Proveedor (tipo: proveedor)
function validateProveedorForm(form) {
    const nombreEmpresa = form.querySelector('#nombre_empresa');
    const emailProveedor = form.querySelector('#email_proveedor');
    const numeroProveedor = form.querySelector('#numero_proveedor');
    const webProveedor = form.querySelector('#web_proveedor');

    // Validar Nombre de la Empresa (Obligatorio)
    nombreEmpresa.addEventListener('input', () => {
        if (nombreEmpresa.value.trim() === '') {
            showError(nombreEmpresa, 'El nombre de la empresa es obligatorio.');
        } else {
            clearError(nombreEmpresa);
        }
        toggleSubmitButton(form);
    });

    // Validar Email del Proveedor (Obligatorio)
    emailProveedor.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailProveedor.value.trim() === '') {
            showError(emailProveedor, 'El email del proveedor es obligatorio.');
        } else if (!emailPattern.test(emailProveedor.value)) {
            showError(emailProveedor, 'Ingresa un email válido.');
        } else {
            clearError(emailProveedor);
        }
        toggleSubmitButton(form);
    });

    // Validar Número del Proveedor (Obligatorio)
numeroProveedor.addEventListener('input', () => {
    const numeroPattern = /^09\d{8}$/; 
    if (numeroProveedor.value.trim() === '') {
        showError(numeroProveedor, 'El número del proveedor es obligatorio.');
    } else if (!numeroPattern.test(numeroProveedor.value.trim())) {
        showError(numeroProveedor, 'El número debe comenzar con 09 y tener exactamente 10 dígitos.');
    } else {
        clearError(numeroProveedor);
    }
    toggleSubmitButton(form);
});


    // Validar Web del Proveedor (Obligatorio)
    webProveedor.addEventListener('input', () => {
        const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.+)*$/;
        if (webProveedor.value.trim() === '') {
            showError(webProveedor, 'La web del proveedor es obligatoria.');
        } else if (!urlPattern.test(webProveedor.value)) {
            showError(webProveedor, 'Ingresa una URL válida.');
        } else {
            clearError(webProveedor);
        }
        toggleSubmitButton(form);
    });
}


    // Validaciones para el formulario de Registro Nuevo Servicio (tipo: servicio)
    function validateServicioForm(form) {
        const nombreServicio = form.querySelector('#nombre_servicio');
        const productoServicio = form.querySelector('#producto_servicio');
        const cantidadProductoServicio = form.querySelector('#cantidad_producto_servicio');
        const descripcionServicio = form.querySelector('#descripcion_servicio');
        const costoServicio = form.querySelector('#costo_servicio');
        const totalCostoServicio = form.querySelector('#total_costo_servicio');

        // Validar Nombre del Servicio
        nombreServicio.addEventListener('input', () => {
            if (nombreServicio.value.trim() === '') {
                showError(nombreServicio, 'El nombre del servicio es obligatorio.');
            } else {
                clearError(nombreServicio);
            }
            toggleSubmitButton(form);
        });

        // Validar Producto del Servicio
        productoServicio.addEventListener('change', () => {
            if (productoServicio.value === '') {
                showError(productoServicio, 'Selecciona un producto.');
            } else {
                clearError(productoServicio);
            }
            toggleSubmitButton(form);
        });

        // Validar Cantidad del Producto del Servicio
        cantidadProductoServicio.addEventListener('input', () => {
            if (cantidadProductoServicio.value === '' || parseInt(cantidadProductoServicio.value) < 1) {
                showError(cantidadProductoServicio, 'La cantidad debe ser al menos 1.');
            } else {
                clearError(cantidadProductoServicio);
            }
            toggleSubmitButton(form);
        });

        // Validar Descripción del Servicio
        descripcionServicio.addEventListener('input', () => {
            if (descripcionServicio.value.trim() === '') {
                showError(descripcionServicio, 'La descripción es obligatoria.');
            } else {
                clearError(descripcionServicio);
            }
            toggleSubmitButton(form);
        });

        // Validar Costo del Servicio
        costoServicio.addEventListener('input', () => {
            if (costoServicio.value === '' || parseFloat(costoServicio.value) <= 0) {
                showError(costoServicio, 'El costo debe ser mayor a 0.');
            } else {
                clearError(costoServicio);
                // Actualizar el costo total automáticamente
                totalCostoServicio.value = parseFloat(costoServicio.value).toFixed(2);
            }
            toggleSubmitButton(form);
        });
    }

    // Validaciones para el formulario de Registro de Venta (tipo: venta)
function validateVentaForm(form) {
    const searchCliente = form.querySelector('#search_cliente');
    const nombreCliente = form.querySelector('#nombre_cliente');
    const apellidoCliente = form.querySelector('#apellido_cliente');
    const cedulaCliente = form.querySelector('#cedula_cliente');
    const numeroCliente = form.querySelector('#numero_cliente');
    const emailCliente = form.querySelector('#email_cliente');
    const locacionCliente = form.querySelector('#locacion_cliente');
    const productoVenta = form.querySelector('#producto_venta');
    const cantidadProductoVenta = form.querySelector('#cantidad_producto_venta');
    const servicioVenta = form.querySelector('#servicio_venta');
    const cantidadServicioVenta = form.querySelector('#cantidad_servicio_venta');
    const ivaVenta = form.querySelector('#iva_venta');
    const totalVenta = form.querySelector('#total_venta');
    const metodoPago = form.querySelector('#metodo_pago');
    const montoEntregado = form.querySelector('#monto_entregado');
    const cambio = form.querySelector('#cambio');
    const vendedorVenta = form.querySelector('#vendedor_venta');

    // Validar Método de Pago y mostrar campos adicionales si es necesario
    metodoPago.addEventListener('change', () => {
        if (metodoPago.value === 'efectivo') {
            document.getElementById('efectivoFields').style.display = 'block';
        } else {
            document.getElementById('efectivoFields').style.display = 'none';
            montoEntregado.value = '';
            cambio.value = '';
            clearError(montoEntregado);
        }
        toggleSubmitButton(form);
    });

    // Validar Monto Entregado y calcular Cambio
    montoEntregado.addEventListener('input', () => {
        updateTotal();
        const total = parseFloat(totalVenta.value) || 0;
        const entregado = parseFloat(montoEntregado.value) || 0;
        if (entregado < total) {
            showError(montoEntregado, 'El monto entregado debe ser igual o mayor al total.');
            cambio.value = '';
        } else {
            clearError(montoEntregado);
            cambio.value = (entregado - total).toFixed(2);
        }
        toggleSubmitButton(form);
    });

    // Evento para actualizar el total al cambiar el IVA
ivaVenta.addEventListener('input', () => {
    if (parseFloat(ivaVenta.value) >= 0) {
        clearError(ivaVenta);
        calcularTotalVenta(); // Recalcular el total al cambiar el IVA
    } else {
        showError(ivaVenta, 'El IVA debe ser 0 o mayor.');
    }
    toggleSubmitButton(form);
});

    // Función para calcular el total de la venta
function calcularTotalVenta() {
    let total = 0;

    // Sumar productos
    const productosJson = form.querySelector('#productos_json').value;
    if (productosJson) {
        const productos = JSON.parse(productosJson);
        productos.forEach(prod => {
            total += parseFloat(prod.costo) * parseInt(prod.cantidad, 10);
        });
    }

    // Sumar servicios
    const serviciosJson = form.querySelector('#servicios_json').value;
    if (serviciosJson) {
        const servicios = JSON.parse(serviciosJson);
        servicios.forEach(serv => {
            total += parseFloat(serv.costo) * parseInt(serv.cantidad, 10);
        });
    }

    // Aplicar IVA
    const iva = parseFloat(ivaVenta.value) || 0;
    total += (total * iva) / 100;

    // Actualizar campo del total
    totalVenta.value = total.toFixed(2);

    // Verificar si se debe actualizar el cambio
    const entregado = parseFloat(montoEntregado.value) || 0;
    if (entregado >= total) {
        cambio.value = (entregado - total).toFixed(2);
    } else {
        cambio.value = '';
    }
}

    // Actualizar el total y otros campos según sea necesario
    function updateTotal() {
        const total = calcularTotalVenta();
        totalVenta.value = total.toFixed(2);
        // Actualizar cambio si el monto entregado ya está presente
        const entregado = parseFloat(montoEntregado.value) || 0;
        if (entregado >= total) {
            cambio.value = (entregado - total).toFixed(2);
        }
    }

    // Actualizar el total al agregar productos o servicios
form.addEventListener('productosActualizados', calcularTotalVenta);
form.addEventListener('serviciosActualizados', calcularTotalVenta);

// También asegurarse de que el total se actualice cuando se modifiquen productos o servicios
form.querySelectorAll('input').forEach(input => {
    if (input.id.startsWith('producto_') || input.id.startsWith('servicio_')) {
        input.addEventListener('input', calcularTotalVenta);
    }
});

// Ejecutar la función de cálculo al cargar la página para que el total se establezca correctamente
document.addEventListener('DOMContentLoaded', calcularTotalVenta);
}


    // Agregar validaciones según el tipo de formulario
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const tipo = form.querySelector('input[name="tipo"]');
        if (tipo) {
            switch (tipo.value) {
                case 'perfil':
                    validatePerfilForm(form);
                    break;
                case 'cliente':
                    validateClienteForm(form);
                    break;
                case 'producto':
                    validateProductoForm(form);
                    break;
                case 'proveedor':
                    validateProveedorForm(form);
                    break;
                case 'servicio':
                    validateServicioForm(form);
                    break;
                case 'venta':
                    validateVentaForm(form);
                    break;
                default:
                    console.warn(`No se encontraron validaciones para el tipo: ${tipo.value}`);
            }
        }
    });

    // Estilos para indicar campos inválidos y mensajes de error
    const style = document.createElement('style');
    style.innerHTML = `
        .invalid {
            border: 2px solid red;
        }
        .error-message {
            color: red;
            font-size: 0.9em;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
});
