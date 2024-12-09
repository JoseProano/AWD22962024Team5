<?php

include_once($_SERVER['DOCUMENT_ROOT'] . '/WEBP/admin/php/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula_cliente = $_POST['cedula_cliente'];       
    $productos = $_POST['productos'];         
    $iva = $_POST['iva'];                     
    $total_pagar = $_POST['total_pagar'];     
    $metodo = $_POST['metodo'];               
    $vendedor = $_POST['vendedor'];           
    $estado = $_POST['estado'];               
    $fecha_creacion = $_POST['fecha_creacion']; 


    $productos_json = json_encode($productos); 

    if ($productos_json === false) {
        echo "Error al convertir los productos a JSON.";
        exit;
    }

    $query = $conn->prepare("INSERT INTO ventas (cedula_cliente, productos, iva, total_pagar, metodo, vendedor, estado, fecha_creacion) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    $query->bind_param("ssssddss", $cedula_cliente, $productos_json, $iva, $total_pagar, $metodo, $vendedor, $estado, $fecha_creacion);

    if ($query->execute()) {
        echo "Formulario enviado correctamente.";
    } else {
        echo "Error al enviar el formulario: " . $query->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Contacto</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/contactStyle.css">
    <script>
        function validateName() {
            const name = document.getElementById('name').value;
            const errorName = document.getElementById('error-name');
            const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; 
            if (!regex.test(name)) {
                errorName.textContent = 'El nombre solo puede contener letras y espacios.';
                return false;
            } else {
                errorName.textContent = '';
            }
            return true;
        }

        function validateEmail() {
            const email = document.getElementById('email').value;
            const errorEmail = document.getElementById('error-email');
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
            if (!regex.test(email)) {
                errorEmail.textContent = 'Por favor ingresa un correo electrónico válido.';
                return false;
            } else {
                errorEmail.textContent = '';
            }
            return true;
        }

        function validatePhone() {
            const phone = document.getElementById('phone').value;
            const errorPhone = document.getElementById('error-phone');
            const regex = /^\d{10}$/;
            if (!regex.test(phone)) {
                errorPhone.textContent = 'El teléfono debe contener solo números y un máximo de 10 dígitos.';
                return false;
            } else {
                errorPhone.textContent = '';
            }
            return true;
        }

        function validateForm(event) {
            let valid = true;
            if (!validateName()) valid = false;
            if (!validateEmail()) valid = false;
            if (!validatePhone()) valid = false;

            if (!valid) {
                event.preventDefault(); 
            }
        }
    </script>
</head>
<body>
<header class="main-header">
    <div class="logo-container">
        <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Logo MADECOR" class="team-photo"></a>
        <div class="company-info">
            <h1>MADECOR</h1>
            <p class="slogan">Materiales Educativos, Mobiliario Infantil y Juguetes</p>
        </div>
    </div>

    <div class="login-icon">
        <a href="../admin/php/login.php" title="Login">
            <i class="fa fa-sign-in" aria-hidden="true"></i>
        </a>
    </div>
</header>

<div class="contact-form-container">
    <h2>Formulario de Contacto</h2>
    <p class="intro-text">¡Déjanos tus datos y te contactaremos para completar tu pedido de manera correcta y rápida!</p>
    <form action="contactForm.php" method="POST" onsubmit="validateForm(event)">
        <label for="cedula_cliente">Cédula del Cliente:</label>
        <input type="text" id="cedula" name="cedula_cliente" required onblur="validateCedula()">
        <p id="error-cedula" class="error-message"></p>

        <label for="productos">Productos/Servicios:</label>
        <textarea id="productos" name="productos" required></textarea>

        <label for="iva">IVA:</label>
        <input type="number" id="iva" name="iva" required step="0.01">

        <label for="total_pagar">Total a Pagar:</label>
        <input type="number" id="total_pagar" name="total_pagar" required step="0.01">

        <label for="metodo">Método de Pago:</label>
        <select id="metodo" name="metodo" required>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
        </select>

        <label for="vendedor">Vendedor:</label>
        <input type="text" id="vendedor" name="vendedor" required>

        <label for="estado">Estado:</label>
        <select id="estado" name="estado" required>
            <option value="pendiente">Activo</option>

        </select>

        <label for="fecha_creacion">Fecha de Creación:</label>
        <input type="date" id="fecha_creacion" name="fecha_creacion" required>

        <button type="submit">Enviar</button>
    </form>
</div>

<footer class="footer">
    <p>© 2025 MADECOR | Todos los derechos reservados</p>
</footer>

</body>
</html>
