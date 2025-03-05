document.addEventListener('DOMContentLoaded', function () {
    const formVenta = document.getElementById('formVenta');
    const submitButton = formVenta.querySelector('button[type="submit"]');

    const fields = formVenta.querySelectorAll('input, select');

    fields.forEach(field => {
        field.addEventListener('input', validateForm);
    });

    formVenta.addEventListener('submit', function (event) {
    });

    function validateForm() {
        let isValid = true;

        const clienteId = document.getElementById('ventaClienteId');
        if (!validateId(clienteId.value.trim())) {
            isValid = false;
            showError(clienteId, 'El ID del Cliente debe tener entre 1 y 10 dígitos y solo contener números');
        } else {
            clearError(clienteId);
        }

        const trabajadorId = document.getElementById('ventaTrabajadorId');
        if (!validateId(trabajadorId.value.trim())) {
            isValid = false;
            showError(trabajadorId, 'El ID del Trabajador debe tener entre 1 y 10 dígitos y solo contener números');
        } else {
            clearError(trabajadorId);
        }

        const iva = document.getElementById('ventaIva');
        if (!validateIva(iva.value.trim())) {
            isValid = false;
            showError(iva, 'El IVA debe ser un número entre 0 y 100');
        } else {
            clearError(iva);
        }

        const productosContainer = document.getElementById('productosContainer');
        const productos = productosContainer.querySelectorAll('.producto');
        if (productos.length === 0) {
            isValid = false;
            showError(productosContainer, 'Debe agregar al menos un producto');
        } else {
            productos.forEach(producto => {
                const productoId = producto.querySelector('.producto-id');
                const productoCantidad = producto.querySelector('.producto-cantidad');
                if (!validateId(productoId.value.trim())) {
                    isValid = false;
                    showError(productoId, 'El ID del Producto debe tener entre 1 y 10 dígitos y solo contener números');
                } else {
                    clearError(productoId);
                }
                if (!validateCantidad(productoCantidad.value.trim())) {
                    isValid = false;
                    showError(productoCantidad, 'La cantidad del Producto debe ser un número entero positivo');
                } else {
                    clearError(productoCantidad);
                }
            });
        }

        const total = document.getElementById('ventaTotal');
        if (!validateTotal(total.value.trim())) {
            isValid = false;
            showError(total, 'El total de la venta debe ser un número positivo');
        } else {
            clearError(total);
        }

        submitButton.disabled = !isValid;

        return isValid;
    }

    function validateId(id) {
        const idPattern = /^[0-9]{1,10}$/;
        return idPattern.test(id);
    }

    function validateIva(iva) {
        const ivaPattern = /^[0-9]{1,2}(\.[0-9]{1,2})?$/;
        return ivaPattern.test(iva) && parseFloat(iva) >= 0 && parseFloat(iva) <= 100;
    }

    function validateCantidad(cantidad) {
        return Number.isInteger(parseFloat(cantidad)) && parseInt(cantidad) > 0;
    }

    function validateTotal(total) {
        return !isNaN(total) && parseFloat(total) > 0;
    }

    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
        input.classList.add('error');
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.remove();
        }
        input.classList.remove('error');
    }
});