document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');
    const submitButton = form.querySelector('button[type="submit"]');

    const fields = form.querySelectorAll('input, select');

    fields.forEach(field => {
        field.addEventListener('input', validateForm);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Formulario enviado correctamente');
            form.submit();
        }
    });

    function validateForm() {
        let isValid = true;

        const cedula = document.getElementById('cedula');
        if (!validateCedula(cedula.value.trim())) {
            isValid = false;
            showError(cedula, 'La cédula debe tener entre 7 y 10 dígitos y solo contener números');
        } else {
            clearError(cedula);
        }

        const nombre = document.getElementById('nombre');
        if (!validateName(nombre.value.trim())) {
            isValid = false;
            showError(nombre, 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(nombre);
        }

        const apellido = document.getElementById('apellido');
        if (!validateName(apellido.value.trim())) {
            isValid = false;
            showError(apellido, 'El apellido debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(apellido);
        }

        const edad = document.getElementById('edad');
        if (!validateAge(edad.value.trim())) {
            isValid = false;
            showError(edad, 'La edad debe ser un número entre 1 y 120');
        } else {
            clearError(edad);
        }

        const genero = document.getElementById('genero');
        if (genero.value === '') {
            isValid = false;
            showError(genero, 'Debe seleccionar un género');
        } else {
            clearError(genero);
        }

        const email = document.getElementById('email');
        if (!validateEmail(email.value.trim())) {
            isValid = false;
            showError(email, 'El correo electrónico no es válido');
        } else {
            clearError(email);
        }

        const telefono = document.getElementById('telefono');
        if (!validatePhone(telefono.value.trim())) {
            isValid = false;
            showError(telefono, 'El teléfono debe tener 10 dígitos y solo contener números');
        } else {
            clearError(telefono);
        }

        const usuario = document.getElementById('usuario');
        if (!validateUsername(usuario.value.trim())) {
            isValid = false;
            showError(usuario, 'El usuario debe tener entre 4 y 20 caracteres y solo contener letras y números');
        } else {
            clearError(usuario);
        }

        const contrasena = document.getElementById('contrasena');
        if (!validatePassword(contrasena.value.trim())) {
            isValid = false;
            showError(contrasena, 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial');
        } else {
            clearError(contrasena);
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

    function validateAge(age) {
        const agePattern = /^[1-9][0-9]?$|^120$/;
        return agePattern.test(age);
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