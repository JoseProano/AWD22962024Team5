<?php
session_start();
include 'db.php';

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit;
}

$id = intval($_POST['id']);
$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : 'perfiles'; // Valor por defecto
$usuario_nombre = isset($_SESSION['usuario']) ? $_SESSION['usuario'] : '';

// Establecer la zona horaria a América/Guayaquil
date_default_timezone_set('America/Guayaquil');
$fecha_actual = date('Y-m-d H:i:s'); // Obtén la fecha y hora actual en formato SQL

// Función para registrar cambios
function registrar_cambio($usuario_nombre, $descripcion, $tipo_cambio, $tabla_afectada, $id_cambiado, $conn) {
    $descripcion = mysqli_real_escape_string($conn, $descripcion);
    $sql = "INSERT INTO cambios (usuario_id, descripcion, tipo_cambio, tabla_afectada, id_cambiado) 
            VALUES ('$usuario_nombre', '$descripcion', '$tipo_cambio', '$tabla_afectada', $id_cambiado)";
    mysqli_query($conn, $sql);
}

// Crear la consulta de actualización y la descripción del cambio
switch ($tipo) {
    case 'perfiles':
        $query = "UPDATE perfiles SET estado = 'activo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'perfiles';
        $sql_get = "SELECT nombre, apellido, cedula FROM perfiles WHERE id = $id";
        break;
    
    case 'clientes':
        $query = "UPDATE clientes SET estado = 'activo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'clientes';
        $sql_get = "SELECT nombre, apellido, cedula FROM clientes WHERE id = $id";
        break;

    case 'proveedores':
        $query = "UPDATE proveedores SET estado = 'activo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'proveedores';
        $sql_get = "SELECT nombre_empresa, web FROM proveedores WHERE id = $id";
        break;

    case 'productos':
        $query = "UPDATE productos SET estado = 'activo', fecha_creacion = '$fecha_actual' WHERE id = $id";
        $tabla_afectada = 'productos';
        $sql_get = "SELECT nombre, codigo FROM productos WHERE id = $id";
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Tipo no válido']);
        exit;
}

// Ejecutar la consulta de actualización
if (mysqli_query($conn, $query)) {
    // Obtener datos del registro para registrar cambios
    $result_get = mysqli_query($conn, $sql_get);
    $row = mysqli_fetch_assoc($result_get);

    // Crear la descripción del cambio
    switch ($tipo) {
        case 'perfiles':
            $descripcion = "Perfil activado: {$row['nombre']} {$row['apellido']} (Cédula: {$row['cedula']})";
            break;

        case 'clientes':
            $descripcion = "Cliente activado: {$row['nombre']} {$row['apellido']} (Cédula: {$row['cedula']})";
            break;

        case 'proveedores':
            $descripcion = "Proveedor activado: {$row['nombre_empresa']} (Web: {$row['web']})";
            break;

        case 'productos':
            $descripcion = "Producto activado: {$row['nombre']} (Código: {$row['codigo']})";
            break;

    }

    // Registrar cambio
    registrar_cambio($usuario_nombre, $descripcion, 'Activo', $tabla_afectada, $id, $conn);

    echo json_encode(['status' => 'success', 'message' => 'Registro activado correctamente']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al activar el registro']);
}

mysqli_close($conn);
?>
