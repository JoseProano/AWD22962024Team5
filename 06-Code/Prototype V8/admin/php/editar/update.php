<?php
session_start();
include '../db.php';

date_default_timezone_set('America/Guayaquil');

$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
$usuario_nombre = isset($_SESSION['usuario']) ? $_SESSION['usuario'] : '';

function registrar_cambio($usuario_nombre, $descripcion, $tipo_cambio, $tabla_afectada, $id_cambiado, $conn) {
    $descripcion = mysqli_real_escape_string($conn, $descripcion);
    $sql = "INSERT INTO cambios (usuario_id, descripcion, tipo_cambio, tabla_afectada, id_cambiado) 
            VALUES ('$usuario_nombre', '$descripcion', '$tipo_cambio', '$tabla_afectada', $id_cambiado)";
    mysqli_query($conn, $sql);
}

switch ($tipo) {
    case 'perfil':

        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
        $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
        $genero = isset($_POST['genero']) ? mysqli_real_escape_string($conn, $_POST['genero']) : '';
        $fecha_nacimiento = isset($_POST['fecha_nacimiento']) ? mysqli_real_escape_string($conn, $_POST['fecha_nacimiento']) : '';
        $usuario = isset($_POST['usuario']) ? mysqli_real_escape_string($conn, $_POST['usuario']) : '';
        $password = isset($_POST['contraseña']) ? mysqli_real_escape_string($conn, $_POST['contraseña']) : '';
        $perfil = isset($_POST['perfil']) ? mysqli_real_escape_string($conn, $_POST['perfil']) : '';
        $permisos = isset($_POST['permisos']) ? implode(',', $_POST['permisos']) : '';

        $fecha_actualizacion = date('Y-m-d H:i:s');

        $updateQuery = "UPDATE perfiles SET email = '$email', genero = '$genero', fecha_nacimiento = '$fecha_nacimiento', usuario = '$usuario', perfil = '$perfil', permisos = '$permisos', fecha_creacion = '$fecha_actualizacion'";

        if (!empty($password)) {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $updateQuery .= ", contraseña = '$hashedPassword'";
        }

        $updateQuery .= " WHERE id = $id";

        if (mysqli_query($conn, $updateQuery)) {
            $sql_get = "SELECT nombre, apellido, cedula FROM perfiles WHERE id = $id";
            $result_get = mysqli_query($conn, $sql_get);
            $row = mysqli_fetch_assoc($result_get);

            $descripcion = "Perfil actualizado: {$row['nombre']} {$row['apellido']} (Cédula: {$row['cedula']})";
            registrar_cambio($usuario_nombre, $descripcion, 'Actualizar', 'perfiles', $id, $conn);

            echo json_encode(['status' => 'success', 'message' => 'Usuario actualizado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el usuario']);
        }
        break;

    case 'cliente':

        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
        $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
        $genero = isset($_POST['genero']) ? mysqli_real_escape_string($conn, $_POST['genero']) : '';
        $fecha_nacimiento = isset($_POST['fecha_nacimiento']) ? mysqli_real_escape_string($conn, $_POST['fecha_nacimiento']) : '';
        $numero = isset($_POST['numero']) ? mysqli_real_escape_string($conn, $_POST['numero']) : '';
        $locacion = isset($_POST['locacion']) ? mysqli_real_escape_string($conn, $_POST['locacion']) : '';

        $fecha_actualizacion = date('Y-m-d H:i:s');

        $updateQuery = "UPDATE clientes SET email = '$email', genero = '$genero', fecha_nacimiento = '$fecha_nacimiento', numero = '$numero', locacion = '$locacion', fecha_creacion = '$fecha_actualizacion' WHERE id = $id";

        if (mysqli_query($conn, $updateQuery)) {

            $sql_get = "SELECT nombre, apellido, cedula FROM clientes WHERE id = $id";
            $result_get = mysqli_query($conn, $sql_get);
            $row = mysqli_fetch_assoc($result_get);

            $descripcion = "Cliente actualizado: {$row['nombre']} {$row['apellido']} (Cédula: {$row['cedula']})";
            registrar_cambio($usuario_nombre, $descripcion, 'Actualizar', 'clientes', $id, $conn);

            echo json_encode(['status' => 'success', 'message' => 'Cliente actualizado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el cliente']);
        }
        break;

    case 'proveedor':

        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
        $nombre = isset($_POST['nombre_empresa']) ? mysqli_real_escape_string($conn, $_POST['nombre_empresa']) : '';
        $email = isset($_POST['email_proveedor']) ? mysqli_real_escape_string($conn, $_POST['email_proveedor']) : '';
        $numero = isset($_POST['numero_proveedor']) ? mysqli_real_escape_string($conn, $_POST['numero_proveedor']) : '';
        $web = isset($_POST['web_proveedor']) ? mysqli_real_escape_string($conn, $_POST['web_proveedor']) : '';

        $fecha_actualizacion = date('Y-m-d H:i:s');

        $updateQuery = "UPDATE proveedores SET nombre_empresa = '$nombre', email = '$email', numero = '$numero', web = '$web', fecha_creacion = '$fecha_actualizacion' WHERE id = $id";

        if (mysqli_query($conn, $updateQuery)) {

            $sql_get = "SELECT nombre_empresa, web FROM proveedores WHERE id = $id";
            $result_get = mysqli_query($conn, $sql_get);
            $row = mysqli_fetch_assoc($result_get);

            $descripcion = "Proveedor actualizado: {$row['nombre_empresa']} (Web: {$row['web']})";
            registrar_cambio($usuario_nombre, $descripcion, 'Actualizar', 'proveedores', $id, $conn);

            echo json_encode(['status' => 'success', 'message' => 'Proveedor actualizado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el proveedor']);
        }
        break;

    case 'producto':

        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
        $nombre = isset($_POST['nombre_producto']) ? mysqli_real_escape_string($conn, $_POST['nombre_producto']) : '';
        $cantidad = isset($_POST['cantidad_producto']) ? mysqli_real_escape_string($conn, $_POST['cantidad_producto']) : 0;
        $precio_c = isset($_POST['precio_compra']) ? mysqli_real_escape_string($conn, $_POST['precio_compra']) : 0;
        $precio = isset($_POST['precio_producto']) ? mysqli_real_escape_string($conn, $_POST['precio_producto']) : 0;
        $marca = isset($_POST['marca_producto']) ? mysqli_real_escape_string($conn, $_POST['marca_producto']) : '';

        $fecha_actualizacion = date('Y-m-d H:i:s');

        $updateQuery = "UPDATE productos SET nombre = '$nombre', cantidad = $cantidad, precio = $precio, precio_compra = $precio_c, marca = '$marca', fecha_creacion = '$fecha_actualizacion' WHERE id = $id";

        if (mysqli_query($conn, $updateQuery)) {

            $sql_get = "SELECT nombre, codigo FROM productos WHERE id = $id";
            $result_get = mysqli_query($conn, $sql_get);
            $row = mysqli_fetch_assoc($result_get);

            $descripcion = "Producto actualizado: {$row['nombre']} (Codigo: {$row['codigo']})";
            registrar_cambio($usuario_nombre, $descripcion, 'Actualizar', 'productos', $id, $conn);

            echo json_encode(['status' => 'success', 'message' => 'Producto actualizado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el producto']);
        }
        break;
  case 'servicio':

        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
        $descripcion = isset($_POST['descripcion']) ? mysqli_real_escape_string($conn, $_POST['descripcion']) : '';
        $costo_servicio = isset($_POST['costo_servicio']) ? mysqli_real_escape_string($conn, $_POST['costo_servicio']) : '';
        $coste_total = isset($_POST['coste_total']) ? mysqli_real_escape_string($conn, $_POST['coste_total']) : '';

        $fecha_actualizacion = date('Y-m-d H:i:s');

        $updateQuery = "UPDATE servicios SET descripcion = '$descripcion', costo_servicio = '$costo_servicio', coste_total = '$coste_total', fecha_creacion = '$fecha_actualizacion' WHERE id = $id";

        if (mysqli_query($conn, $updateQuery)) {

            $sql_get = "SELECT nombre, descripcion FROM servicios WHERE id = $id";
            $result_get = mysqli_query($conn, $sql_get);
            $row = mysqli_fetch_assoc($result_get);

            $descripcion = "Servicio actualizado: {$row['nombre']} (D: {$row['descripcion' ]})";
            registrar_cambio($usuario_nombre, $descripcion, 'Actualizar', 'servicios', $id, $conn);

            echo json_encode(['status' => 'success', 'message' => 'Servicio actualizado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el servicio']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Tipo de operación no válido']);
        break;
}

mysqli_close($conn);
?>
