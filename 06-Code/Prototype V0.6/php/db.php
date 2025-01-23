<?php
session_start();

$host = 'junction.proxy.rlwy.net';
$port = '26914';
$username = 'root';
$password = 'xtHPdEAalkkUJEonEYAXjbrJgzzuazaD';
$dbname = 'base_MADECOR'; 

$conn = mysqli_connect($host, $username, $password, $dbname, $port);

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit;
}
?>

