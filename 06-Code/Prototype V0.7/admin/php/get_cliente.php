<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['cedula']) && !empty($_POST['cedula'])) {
        $cedula = $_POST['cedula'];
        $query = "SELECT * FROM clientes WHERE cedula = ? AND estado = 'activo'";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $cedula);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $cliente = $result->fetch_assoc();
            echo json_encode(['success' => true, 'cliente' => $cliente]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Cliente no encontrado o no está activo']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Cédula no proporcionada']);
    }
}

$conn->close();
?>
