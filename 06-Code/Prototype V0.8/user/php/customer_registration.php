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
    <main class="content">
        <section id="registration">
            <form id="registrationForm" action="../../admin/php/save.php" method="POST">
            <input type="hidden" name="tipo" value="perfil">
                <h1 align="center">Registro Nuevo Usuario</h1>

                <div class="form-group">
                    <label for="nombre">Nombres</label>
                    <input type="text" id="nombre" name="nombre" required>
                </div>

                <div class="form-group">
                    <label for="apellido">Apellidos</label>
                    <input type="text" id="apellido" name="apellido" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="genero">Género</label>
                    <select id="genero" name="genero" required>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required>
                </div>

                <div class="form-group">
                    <label for="cedula">Cédula</label>
                    <input type="text" id="cedula" name="cedula" required>
                </div>

                <div class="form-group">
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario" name="usuario" required>
                </div>

                <div class="form-group">
                    <label for="contraseña">Contraseña</label>
                    <input type="password" id="contraseña" name="contraseña" required>
                </div>

                <input type="hidden" id="perfil" name="perfil" value="cliente">
                <input type="hidden" name="permisos[]" value="Usuario">

                <div class="form-group">
                    <button type="submit" id="submitForm">Guardar Usuario</button>
                    <button type="reset">Restablecer</button>
                </div>
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

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
<script src="../../admin/js/validations.js"></script>
<script>
document.getElementById('submitForm').addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    fetch('../../admin/php/save.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            const successMessage = document.getElementById('successMessage');
            if (data.status === 'success') {
                successMessage.style.color = 'green';
                successMessage.textContent = data.message;
                form.reset(); 
            } else {
                successMessage.style.color = 'red';
                successMessage.textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const successMessage = document.getElementById('successMessage');
            successMessage.style.color = 'red';
            successMessage.textContent = 'Ocurrió un error inesperado. Intente nuevamente.';
        });
});
</script>
</body>
</html>
