const form = document.getElementById('registrationForm');
const fields = {
    fullName: {
        element: document.getElementById('fullName'),
        errorElement: document.getElementById('fullNameError'),
        validate: value => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) || 'El nombre completo solo puede contener letras y espacios.'
    },
    username: {
        element: document.getElementById('username'),
        errorElement: document.getElementById('usernameError'),
        validate: value => value.trim().length >= 5 || 'El nombre de usuario debe tener al menos 5 caracteres.'
    },
    email: {
        element: document.getElementById('email'),
        errorElement: document.getElementById('emailError'),
        validate: value => /\S+@\S+\.\S+/.test(value) || 'El correo electrónico no es válido.'
    },
    password: {
        element: document.getElementById('password'),
        errorElement: document.getElementById('passwordError'),
        validate: value => value.length >= 6 || 'La contraseña debe tener al menos 6 caracteres.'
    },
    phone: {
        element: document.getElementById('phone'),
        errorElement: document.getElementById('phoneError'),
        validate: value => /^\+593(2[0-7]\d{6}|9\d{8})$/.test(value) || 'El número debe iniciar con +593 y ser un número válido de Ecuador.'
    },
    address: {
        element: document.getElementById('address'),
        errorElement: document.getElementById('addressError'),
        validate: value => value.trim() !== '' || 'La dirección es obligatoria.'
    }
};

const validateField = (field) => {
    const { element, errorElement, validate } = field;
    const value = element.value;
    const errorMessage = validate(value);
    if (errorMessage !== true) {
        errorElement.textContent = errorMessage;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
};

Object.values(fields).forEach(field => {
    field.element.addEventListener('input', () => validateField(field));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = Object.values(fields).every(validateField);
    if (isValid) {
        document.getElementById('successMessage').textContent = "¡Cliente registrado con éxito!";
        form.reset();
        Object.values(fields).forEach(field => field.errorElement.textContent = '');
    }
});