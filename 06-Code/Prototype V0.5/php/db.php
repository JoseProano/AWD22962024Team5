<?php
session_start();

// Parámetros de conexión a la base de datos en Railway
$host = 'junction.proxy.rlwy.net';
$port = '26914';
$username = 'root';
$password = 'xtHPdEAalkkUJEonEYAXjbrJgzzuazaD';
$dbname = 'base_MADECOR'; // Nombre de la base de datos

// Conexión con la base de datos en Railway
$conn = mysqli_connect($host, $username, $password, $dbname, $port);

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit;
}

// Si la conexión fue exitosa, puedes proceder con el resto de tu código
?>

