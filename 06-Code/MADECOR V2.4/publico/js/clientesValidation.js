document.addEventListener('DOMContentLoaded', function () {
    const formCliente = document.getElementById('formCliente');
    const formEditarCliente = document.getElementById('formEditarCliente');
    const submitButtonCliente = formCliente.querySelector('button[type="submit"]');
    const submitButtonEditarCliente = formEditarCliente.querySelector('button[type="submit"]');

    const fieldsCliente = formCliente.querySelectorAll('input, select');
    const fieldsEditarCliente = formEditarCliente.querySelectorAll('input, select');

    fieldsCliente.forEach(field => {
        field.addEventListener('input', () => validateForm(formCliente, submitButtonCliente));
    });

    fieldsEditarCliente.forEach(field => {
        field.addEventListener('input', () => validateForm(formEditarCliente, submitButtonEditarCliente));
    });

    formCliente.addEventListener('submit', function (event) {
    });

    formEditarCliente.addEventListener('submit', function (event) {
    });

    function validateForm(form, submitButton) {
        let isValid = true;

        const cedula = form.querySelector('[name="clienteCedula"]');
        if (cedula && !validateCedula(cedula.value.trim())) {
            isValid = false;
            showError(cedula, 'La cédula debe tener entre 7 y 10 dígitos y solo contener números');
        } else {
            clearError(cedula);
        }

        const nombre = form.querySelector('[name="clienteNombre"]');
        if (!validateName(nombre.value.trim())) {
            isValid = false;
            showError(nombre, 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(nombre);
        }

        const apellido = form.querySelector('[name="clienteApellido"]');
        if (!validateName(apellido.value.trim())) {
            isValid = false;
            showError(apellido, 'El apellido debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(apellido);
        }

        const nacimiento = form.querySelector('[name="clienteNacimiento"]');
        if (!validateDate(nacimiento.value.trim())) {
            isValid = false;
            showError(nacimiento, 'La fecha de nacimiento no es válida');
        } else {
            clearError(nacimiento);
        }

        const genero = form.querySelector('[name="clienteGenero"]');
        if (genero.value === '') {
            isValid = false;
            showError(genero, 'Debe seleccionar un género');
        } else {
            clearError(genero);
        }

        const email = form.querySelector('[name="clienteEmail"]');
        if (!validateEmail(email.value.trim())) {
            isValid = false;
            showError(email, 'El correo electrónico no es válido');
        } else {
            clearError(email);
        }

        const telefono = form.querySelector('[name="clienteTelefono"]');
        if (!validatePhone(telefono.value.trim())) {
            isValid = false;
            showError(telefono, 'El teléfono debe tener 10 dígitos y solo contener números');
        } else {
            clearError(telefono);
        }

        const pais = form.querySelector('[name="clientePais"]');
        if (!validateCountry(pais.value.trim())) {
            isValid = false;
            showError(pais, 'El país debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(pais);
        }

        const direccion = form.querySelector('[name="clienteDireccion"]');
        if (!validateAddress(direccion.value.trim())) {
            isValid = false;
            showError(direccion, 'La dirección debe tener entre 5 y 100 caracteres');
        } else {
            clearError(direccion);
        }

        submitButton.disabled = !isValid;

        return isValid;
    }

    function validateCedula(cedula) {
        const cedulaPattern = /^[0-9]{7,10}$/;
        return cedulaPattern.test(cedula);
    }

    function validateName(name) {
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return namePattern.test(name);
    }

    function validateDate(date) {
        return !isNaN(Date.parse(date));
    }

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    }

    function validateCountry(country) {
        const countryPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return countryPattern.test(country);
    }

    function validateAddress(address) {
        return address.length >= 5 && address.length <= 100;
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