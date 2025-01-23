<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Registro de Cliente</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
<?php include 'generateMenu.php'; ?>
<header class="main-header">
    <div class="logo-container">
        <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Logo MADECOR" class="team-photo"></a>
        <div class="company-info">
            <h1>MADECOR</h1>
            <p class="slogan">Materiales Educativos, Mobiliario Infantil y Juguetes</p>
        </div>
    </div>
</header>
<div class="top-menu">
    <?php generateMenu('../txt/menu.txt'); ?>
</div>
<div class="container">
    <div class="side-menu">
        <h3>Navegación</h3>
        <?php generateMenu('../txt/sideCustomer.txt'); ?>
    </div>
    <main class="content">
        <section id="registration">
            <h2>Registro de Cliente</h2>
            <form id="registrationForm">
                <label for="fullName">Nombre Completo:</label>
                <input type="text" id="fullName" name="fullName" required>

                <label for="username">Nombre de Usuario:</label>
                <input type="text" id="username" name="username" required>

                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>

                <label for="phone">Número de Teléfono:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

                <label for="address">Dirección:</label>
                <input type="text" id="address" name="address" required>

                <button type="submit">Registrar</button>
                <button type="reset">Restablecer</button>
            </form>
            <div id="successMessage"></div>
        </section>
    </main>
</div>
<footer class="footer">
    <div class="footer-content">
        <p>© 2025 MADECOR | Todos los derechos reservados</p>
        <p><a href="#">Términos y Condiciones</a> | <a href="#">Política de Privacidad</a></p>
        <div class="social-links-footer">
            <a href="https://www.facebook.com/darwin.panchez/" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/epciclon/" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://x.com/NexxuzHD?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i class="fab fa-twitter"></i></a>
        </div>
    </div>
</footer>
<script>
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();

        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        let valid = true;
        let message = "";

        if (!nameRegex.test(fullName)) {
            valid = false;
            message += "El nombre completo solo debe contener letras y espacios.\n";
        }

        if (!usernameRegex.test(username)) {
            valid = false;
            message += "El nombre de usuario solo debe contener letras, números y guiones bajos.\n";
        }

        if (!phoneRegex.test(phone)) {
            valid = false;
            message += "El número de teléfono debe contener exactamente 10 dígitos.\n";
        }

        if (!valid) {
            alert(message);
        } else {
            document.getElementById('successMessage').textContent = "¡Cliente registrado con éxito!";
            this.reset();
        }
    });
</script>
</body>
</html>
