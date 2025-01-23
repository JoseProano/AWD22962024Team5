<?php
session_start();
session_destroy(); // Destruye todas las sesiones activas
header("Location: ../../admin/php/login.php"); // Redirige a la página de inicio de sesión
exit();
?>
