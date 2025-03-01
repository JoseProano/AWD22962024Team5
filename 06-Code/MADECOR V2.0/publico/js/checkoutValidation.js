document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const submitButton = form.querySelector('button[type="submit"]');

    const fields = [name, surname, email, phone, address];

    fields.forEach(field => {
        field.addEventListener('input', validateForm);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Formulario enviado correctamente');
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar nombre
        if (!validateName(name.value.trim())) {
            isValid = false;
            showError(name, 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(name);
        }

        // Validar apellido
        if (!validateName(surname.value.trim())) {
            isValid = false;
            showError(surname, 'El apellido debe tener entre 2 y 50 caracteres y solo contener letras');
        } else {
            clearError(surname);
        }

        // Validar correo electrónico
        if (!validateEmail(email.value.trim())) {
            isValid = false;
            showError(email, 'El correo electrónico no es válido');
        } else {
            clearError(email);
        }

        // Validar teléfono
        if (!validatePhone(phone.value.trim())) {
            isValid = false;
            showError(phone, 'El teléfono debe tener 10 dígitos y solo contener números');
        } else {
            clearError(phone);
        }

        // Validar dirección
        if (!validateAddress(address.value.trim())) {
            isValid = false;
            showError(address, 'La dirección debe tener entre 5 y 100 caracteres');
        } else {
            clearError(address);
        }

        // Desactivar el botón de envío si hay errores
        submitButton.disabled = !isValid;

        return isValid;
    }

    function validateName(name) {
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return namePattern.test(name);
    }

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
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