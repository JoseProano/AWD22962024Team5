document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar usuario
        const usuario = document.getElementById('usuario');
        if (!validateLength(usuario.value.trim(), 4, 20)) {
            isValid = false;
        }

        // Validar contraseña
        const contrasena = document.getElementById('contrasena');
        if (!validateLength(contrasena.value.trim(), 8, 50)) {
            isValid = false;
        }

        return isValid;
    }

    function validateLength(value, min, max) {
        return value.length >= min && value.length <= max;
    }
});