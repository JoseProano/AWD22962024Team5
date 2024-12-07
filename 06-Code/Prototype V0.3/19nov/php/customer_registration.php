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
                <div id="fullNameError" class="error"></div>

                <label for="username">Nombre de Usuario:</label>
                <input type="text" id="username" name="username" required minlength="5">
                <div id="usernameError" class="error"></div>

                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>
                <div id="emailError" class="error"></div>

                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required minlength="6">
                <div id="passwordError" class="error"></div>

                <label for="phone">Número de Teléfono:</label>
                <input type="tel" id="phone" name="phone" placeholder="+593XXXXXXXXX" required>
                <div id="phoneError" class="error"></div>

                <label for="address">Dirección:</label>
                <input type="text" id="address" name="address" required>
                <div id="addressError" class="error"></div>

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
<script src="../js/customer_validation.js"></script>
</body>
</html>