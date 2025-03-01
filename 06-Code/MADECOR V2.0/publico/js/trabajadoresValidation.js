document.addEventListener('DOMContentLoaded', function () {
    const formTrabajador = document.getElementById('formTrabajador');
    const formEditarTrabajador = document.getElementById('formEditarTrabajador');
    const submitButtonTrabajador = formTrabajador.querySelector('button[type="submit"]');
    const submitButtonEditarTrabajador = formEditarTrabajador.querySelector('button[type="submit"]');

    const fieldsTrabajador = formTrabajador.querySelectorAll('input, select');
    const fieldsEditarTrabajador = formEditarTrabajador.querySelectorAll('input, select');

    fieldsTrabajador.forEach(field => {
        field.addEventListener('input', () => validateForm(formTrabajador, submitButtonTrabajador));
    });

    fieldsEditarTrabajador.forEach(field => {
        field.addEventListener('input', () => validateForm(formEditarTrabajador, submitButtonEditarTrabajador));
    });

    formTrabajador.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(formTrabajador, submitButtonTrabajador)) {
        }
    });

    formEditarTrabajador.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(formEditarTrabajador, submitButtonEditarTrabajador)) {
        }
    });

    function validateForm(form, submitButton) {
        let isValid = true;

        // Validar cédula
        const cedula = form.querySelector('[name="usuarioCedula"]');
        if (cedula && !validateCedula(cedula.value.trim())) {
            isValid = false;
            showError(cedula, 'La cédula debe tener entre 7 y 10 dígitos y solo contener números');
        } else {
            clearError(cedula);
        }

        // Validar nombre
        const nombre = form.querySelector('[name="usuarioNombre"]');
        if (!validateName(nombre.value.trim())) {
            isValid = false;
            showError(nombre, 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(nombre);
        }

        // Validar apellido
        const apellido = form.querySelector('[name="usuarioApellido"]');
        if (!validateName(apellido.value.trim())) {
            isValid = false;
            showError(apellido, 'El apellido debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(apellido);
        }

        // Validar fecha de nacimiento
        const nacimiento = form.querySelector('[name="usuarioNacimiento"]');
        if (!validateDate(nacimiento.value.trim())) {
            isValid = false;
            showError(nacimiento, 'La fecha de nacimiento no es válida');
        } else {
            clearError(nacimiento);
        }

        // Validar género
        const genero = form.querySelector('[name="usuarioGenero"]');
        if (genero.value === '') {
            isValid = false;
            showError(genero, 'Debe seleccionar un género');
        } else {
            clearError(genero);
        }

        // Validar correo electrónico
        const email = form.querySelector('[name="usuarioEmail"]');
        if (!validateEmail(email.value.trim())) {
            isValid = false;
            showError(email, 'El correo electrónico no es válido');
        } else {
            clearError(email);
        }

        // Validar teléfono
        const telefono = form.querySelector('[name="usuarioTelefono"]');
        if (!validatePhone(telefono.value.trim())) {
            isValid = false;
            showError(telefono, 'El teléfono debe tener 10 dígitos y solo contener números');
        } else {
            clearError(telefono);
        }

        // Validar usuario
        const usuario = form.querySelector('[name="usuarioUsuario"]');
        if (!validateUsername(usuario.value.trim())) {
            isValid = false;
            showError(usuario, 'El usuario debe tener entre 4 y 20 caracteres y solo contener letras y números');
        } else {
            clearError(usuario);
        }

        // Validar contraseña
        const contrasena = form.querySelector('[name="usuarioContrasena"]');
        if (!validatePassword(contrasena.value.trim())) {
            isValid = false;
            showError(contrasena, 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial');
        } else {
            clearError(contrasena);
        }

        // Desactivar el botón de envío si hay errores
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

    function validateUsername(username) {
        const usernamePattern = /^[a-zA-Z0-9]{4,20}$/;
        return usernamePattern.test(username);
    }

    function validatePassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
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