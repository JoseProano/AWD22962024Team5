<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

    if ($id > 0) {
        $query = "UPDATE productos SET cantidad = cantidad + 1 WHERE id = $id";
        if (mysqli_query($conn, $query)) {
            echo json_encode(['status' => 'success', 'message' => 'Cantidad del producto actualizada']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar la cantidad']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID de producto no válido']);
    }

    mysqli_close($conn);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
