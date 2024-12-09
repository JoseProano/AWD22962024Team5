<?php
session_start();
include 'db.php';

if (isset($_POST['id'])) {
    $producto_id = intval($_POST['id']); 

    $stmt = $conn->prepare("SELECT cantidad FROM productos WHERE id = ?");
    $stmt->bind_param('i', $producto_id);
    $stmt->execute();
    $stmt->bind_result($cantidad);
    $stmt->fetch();
    $stmt->close();

    echo $cantidad !== null ? $cantidad : '0';
} else {
    echo '0';
}

mysqli_close($conn);
?>
