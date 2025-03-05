document.addEventListener('DOMContentLoaded', function () {
    const formProducto = document.getElementById('formProducto');
    const formEditarProducto = document.getElementById('editarProductoForm');
    const submitButtonProducto = formProducto.querySelector('button[type="submit"]');
    const submitButtonEditarProducto = formEditarProducto.querySelector('button[type="submit"]');

    const fieldsProducto = formProducto.querySelectorAll('input, textarea');
    const fieldsEditarProducto = formEditarProducto.querySelectorAll('input, textarea');

    fieldsProducto.forEach(field => {
        field.addEventListener('input', () => validateForm(formProducto, submitButtonProducto));
    });

    fieldsEditarProducto.forEach(field => {
        field.addEventListener('input', () => validateForm(formEditarProducto, submitButtonEditarProducto));
    });

    formProducto.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(formProducto, submitButtonProducto)) {
            alert('Producto registrado correctamente');
            formProducto.submit();
        }
    });

    formEditarProducto.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(formEditarProducto, submitButtonEditarProducto)) {
            alert('Producto editado correctamente');
            formEditarProducto.submit();
        }
    });

    function validateForm(form, submitButton) {
        let isValid = true;

        // Validar nombre del producto
        const nombre = form.querySelector('[name="producto_nombre"], [id="editarProductoNombre"]');
        if (!validateName(nombre.value.trim())) {
            isValid = false;
            showError(nombre, 'El nombre del producto debe tener entre 2 y 50 caracteres y solo contener letras y espacios');
        } else {
            clearError(nombre);
        }

        // Validar código del producto
        const codigo = form.querySelector('[name="producto_codigo"], [id="editarProductoCodigo"]');
        if (!validateCode(codigo.value.trim())) {
            isValid = false;
            showError(codigo, 'El código del producto debe tener entre 2 y 20 caracteres y solo contener letras y números');
        } else {
            clearError(codigo);
        }

        // Validar precio del producto
        const precio = form.querySelector('[name="producto_precio"], [id="editarProductoPrecio"]');
        if (!validatePrice(precio.value.trim())) {
            isValid = false;
            showError(precio, 'El precio del producto debe ser un número positivo');
        } else {
            clearError(precio);
        }

        // Validar stock del producto
        const stock = form.querySelector('[name="producto_stock"], [id="editarProductoStock"]');
        if (!validateStock(stock.value.trim())) {
            isValid = false;
            showError(stock, 'El stock del producto debe ser un número entero positivo');
        } else {
            clearError(stock);
        }

        // Validar descripción del producto
        const descripcion = form.querySelector('[name="producto_descripcion"], [id="editarProductoDescripcion"]');
        if (!validateDescription(descripcion.value.trim())) {
            isValid = false;
            showError(descripcion, 'La descripción del producto debe tener entre 10 y 200 caracteres');
        } else {
            clearError(descripcion);
        }

        // Validar imagen del producto
        const imagen = form.querySelector('[name="productoImagen"], [name="editarProductoImagen"]');
        if (imagen && !validateImage(imagen.files[0])) {
            isValid = false;
            showError(imagen, 'La imagen del producto debe ser un archivo de imagen válido (jpg, jpeg, png)');
        } else {
            clearError(imagen);
        }

        // Desactivar el botón de envío si hay errores
        submitButton.disabled = !isValid;

        return isValid;
    }

    function validateName(name) {
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return namePattern.test(name);
    }

    function validateCode(code) {
        const codePattern = /^[a-zA-Z0-9]{2,20}$/;
        return codePattern.test(code);
    }

    function validatePrice(price) {
        return !isNaN(price) && parseFloat(price) > 0;
    }

    function validateStock(stock) {
        return Number.isInteger(parseFloat(stock)) && parseInt(stock) > 0;
    }

    function validateDescription(description) {
        return description.length >= 10 && description.length <= 200;
    }

    function validateImage(file) {
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
        return file && validExtensions.includes(file.type);
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