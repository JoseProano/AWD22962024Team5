document.addEventListener('DOMContentLoaded', function () {
    const formPermiso = document.getElementById('formPermiso');
    const formEditarPermiso = document.getElementById('formEditarPermiso');
    const submitButtonPermiso = formPermiso.querySelector('button[type="submit"]');
    const submitButtonEditarPermiso = formEditarPermiso.querySelector('button[type="submit"]');

    const fieldsPermiso = formPermiso.querySelectorAll('input, textarea');
    const fieldsEditarPermiso = formEditarPermiso.querySelectorAll('input, textarea');

    fieldsPermiso.forEach(field => {
        field.addEventListener('input', () => validateForm(formPermiso, submitButtonPermiso));
    });

    fieldsEditarPermiso.forEach(field => {
        field.addEventListener('input', () => validateForm(formEditarPermiso, submitButtonEditarPermiso));
    });

    formPermiso.addEventListener('submit', function (event) {
    });

    formEditarPermiso.addEventListener('submit', function (event) {
    });

    function validateForm(form, submitButton) {
        let isValid = true;

        const nombre = form.querySelector('[id="permisoNombre"], [id="editarPermisoNombre"]');
        if (!validateName(nombre.value.trim())) {
            isValid = false;
            showError(nombre, 'El nombre del permiso debe tener entre 2 y 50 caracteres y solo contener letras y espacios');
        } else {
            clearError(nombre);
        }

        const descripcion = form.querySelector('[id="permisoDescripcion"], [id="editarPermisoDescripcion"]');
        if (!validateDescription(descripcion.value.trim())) {
            isValid = false;
            showError(descripcion, 'La descripción del permiso debe tener entre 10 y 200 caracteres');
        } else {
            clearError(descripcion);
        }

        const modulos = form.querySelectorAll('input[name="modulos"]:checked');
        if (modulos.length === 0) {
            isValid = false;
            showError(form.querySelector('input[name="modulos"]'), 'Debe seleccionar al menos un módulo');
        } else {
            clearError(form.querySelector('input[name="modulos"]'));
        }

        submitButton.disabled = !isValid;

        return isValid;
    }

    function validateName(name) {
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return namePattern.test(name);
    }

    function validateDescription(description) {
        return description.length >= 10 && description.length <= 200;
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