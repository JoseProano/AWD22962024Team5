<?php
session_start();
include 'db.php';

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit;
}
date_default_timezone_set('America/Guayaquil');
$fecha_actual = date('Y-m-d H:i:s'); 

$id = intval($_POST['id']);
$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : 'perfiles'; 
$usuario_nombre = isset($_SESSION['usuario']) ? $_SESSION['usuario'] : '';

function register_change($usuario_nombre, $descripcion, $tipo_cambio, $tabla_afectada, $id_cambiado, $conn) {
    $descripcion = mysqli_real_escape_string($conn, $descripcion);
    $sql = "INSERT INTO cambios (usuario_id, descripcion, tipo_cambio, tabla_afectada, id_cambiado) 
            VALUES ('$usuario_nombre', '$descripcion', '$tipo_cambio', '$tabla_afectada', $id_cambiado)";
    mysqli_query($conn, $sql);
}

switch ($tipo) {
    case 'perfiles':
        $query = "UPDATE perfiles SET estado = 'inactivo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'perfiles';
        $sql_get = "SELECT nombre, apellido, cedula FROM perfiles WHERE id = $id";
        break;
    
    case 'clientes':
        $query = "UPDATE clientes SET estado = 'inactivo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'clientes';
        $sql_get = "SELECT nombre, apellido, cedula FROM clientes WHERE id = $id";
        break;

    case 'proveedores':
        $query = "UPDATE proveedores SET estado = 'inactivo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'proveedores';
        $sql_get = "SELECT nombre_empresa, web FROM proveedores WHERE id = $id";
        break;

    case 'productos':
        $query = "UPDATE productos SET estado = 'inactivo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'productos';
        $sql_get = "SELECT nombre, codigo FROM productos WHERE id = $id";
        break;
		
    default:
        echo json_encode(['status' => 'error', 'message' => 'Tipo no válido']);
        exit;
}

if (mysqli_query($conn, $query)) {
    $result_get = mysqli_query($conn, $sql_get);
    $row = mysqli_fetch_assoc($result_get);

    switch ($tipo) {
        case 'perfiles':
            $descripcion = "Perfil desactivado: {$row['nombre']} {$row['apellido']} (Cédula: {$row['cedula']})";
            break;

        case 'clientes':
            $descripcion = "Cliente desactivado: {$row['nombre']} {$row['apellido']} (Cédula: {$row['cedula']})";
            break;

        case 'proveedores':
            $descripcion = "Proveedor desactivado: {$row['nombre_empresa']} (Web: {$row['web']})";
            break;

        case 'productos':
            $descripcion = "Producto desactivado: {$row['nombre']} (Código: {$row['codigo']})";
            break;

    }

    register_change($usuario_nombre, $descripcion, 'Inactivo', $tabla_afectada, $id, $conn);

    echo json_encode(['status' => 'success', 'message' => 'Registro desactivado correctamente']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al desactivar el registro']);
}

mysqli_close($conn);
?>
