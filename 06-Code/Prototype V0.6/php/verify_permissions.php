<?php
function verify_permissions($permiso) {
    if (!isset($_SESSION['usuario'])) {
        header('Location: login.php');
        exit();
    }

    if (!in_array($permiso, $_SESSION['permisos'])) {
        header('Location: ../index.php');
        exit();
    }
}
?>
