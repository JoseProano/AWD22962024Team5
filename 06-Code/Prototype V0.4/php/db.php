<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['status' => 'error', 'message' => 'No estás autorizado']);
    exit;
}

$conn = mysqli_connect('localhost', 'admin', 'admin', 'spa_base');

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit;
}

?>
