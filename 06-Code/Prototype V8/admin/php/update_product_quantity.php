<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $producto_id = $_POST['id'];
    $cantidad = (int) $_POST['cantidad'];
    $accion = $_POST['accion'];

    if ($accion === 'reduce') {
        $query = "UPDATE productos SET cantidad = cantidad - ? WHERE id = ?";
    } elseif ($accion === 'increase') {
        $query = "UPDATE productos SET cantidad = cantidad + ? WHERE id = ?";
    }

    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $cantidad, $producto_id);

    if ($stmt->execute()) {
        echo "Cantidad actualizada correctamente.";
    } else {
        echo "Error al actualizar la cantidad.";
    }

    $stmt->close();
    $conn->close();
}
?>
