<?php
include 'db.php';

$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
$usuario_nombre = isset($_SESSION['usuario']) ? $_SESSION['usuario'] : '';

switch ($tipo) {
    case 'perfil':
        $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
        $apellido = mysqli_real_escape_string($conn, $_POST['apellido']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $genero = mysqli_real_escape_string($conn, $_POST['genero']);
        $fecha_nacimiento = mysqli_real_escape_string($conn, $_POST['fecha_nacimiento']);
        $cedula = mysqli_real_escape_string($conn, $_POST['cedula']);
        $usuario = mysqli_real_escape_string($conn, $_POST['usuario']);
        $password = mysqli_real_escape_string($conn, $_POST['contraseña']);
        $perfil = mysqli_real_escape_string($conn, $_POST['perfil']);
        $permisos = isset($_POST['permisos']) ? implode(',', $_POST['permisos']) : '';
        $password = password_hash($password, PASSWORD_BCRYPT);

        $sql_check = "SELECT * FROM perfiles WHERE cedula='$cedula'";
        $result_check = mysqli_query($conn, $sql_check);

        if (mysqli_num_rows($result_check) > 0) {
            echo json_encode(['status' => 'error', 'message' => 'La cédula ya está registrada']);
        } else {
            $sql = "INSERT INTO perfiles (nombre, apellido, email, genero, fecha_nacimiento, cedula, usuario, contraseña, perfil, permisos)
                    VALUES ('$nombre', '$apellido', '$email', '$genero', '$fecha_nacimiento', '$cedula', '$usuario', '$password', '$perfil', '$permisos')";
            if (mysqli_query($conn, $sql)) {
                echo json_encode(['status' => 'success', 'message' => 'Perfil guardado con éxito']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al guardar el perfil: ' . mysqli_error($conn)]);
            }
        }
        break;

    case 'cliente':
        $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
        $apellido = mysqli_real_escape_string($conn, $_POST['apellido']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $genero = mysqli_real_escape_string($conn, $_POST['genero']);
        $fecha_nacimiento = mysqli_real_escape_string($conn, $_POST['fecha_nacimiento']);
        $cedula = mysqli_real_escape_string($conn, $_POST['cedula']);
		$numero = mysqli_real_escape_string($conn, $_POST['numero']);
        $locacion = mysqli_real_escape_string($conn, $_POST['locacion']);

        $sql_check = "SELECT * FROM clientes WHERE cedula='$cedula'";
        $result_check = mysqli_query($conn, $sql_check);

        if (mysqli_num_rows($result_check) > 0) {
            echo json_encode(['status' => 'error', 'message' => 'La cédula ya está registrada']);
        } else {
            $sql = "INSERT INTO clientes (nombre, apellido, email, genero, fecha_nacimiento, cedula, numero ,locacion)
                    VALUES ('$nombre', '$apellido', '$email', '$genero', '$fecha_nacimiento', '$cedula', '$numero' , '$locacion')";
            if (mysqli_query($conn, $sql)) {
                echo json_encode(['status' => 'success', 'message' => 'Cliente guardado con éxito']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al guardar el cliente: ' . mysqli_error($conn)]);
            }
        }
        break;

    case 'proveedor':
        $nombre = mysqli_real_escape_string($conn, $_POST['nombre_empresa']);
        $email = mysqli_real_escape_string($conn, $_POST['email_proveedor']);
        $numero = mysqli_real_escape_string($conn, $_POST['numero_proveedor']);
        $web = mysqli_real_escape_string($conn, $_POST['web_proveedor']);

        $sql_check = "SELECT * FROM proveedores WHERE web='$web'";
        $result_check = mysqli_query($conn, $sql_check);

        if (mysqli_num_rows($result_check) > 0) {
            echo json_encode(['status' => 'error', 'message' => 'La web ya está registrada']);
        } else {
            $sql = "INSERT INTO proveedores (nombre_empresa, email, numero, web)
                    VALUES ('$nombre', '$email', '$numero', '$web')";

			 if (mysqli_query($conn, $sql)) {
                echo json_encode(['status' => 'success', 'message' => 'Proveedor guardado con éxito']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al guardar el proveedor: ' . mysqli_error($conn)]);
            }
        }
        break;

    case 'producto':
        if (isset($_FILES['imagen_producto']) && $_FILES['imagen_producto']['error'] == 0) {
    $target_dir = "../products/";  
    $imagen_producto = $_FILES['imagen_producto']['name'];  
    $target_file = $target_dir . basename($imagen_producto);  
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));  
    $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];

    if (in_array($imageFileType, $allowed_types)) {
        if (move_uploaded_file($_FILES['imagen_producto']['tmp_name'], $target_file)) {
            $nombre = mysqli_real_escape_string($conn, $_POST['nombre_producto']);
            $cantidad = mysqli_real_escape_string($conn, $_POST['cantidad_producto']);
            $proveedor = mysqli_real_escape_string($conn, $_POST['proveedor_producto']);
            $precio = mysqli_real_escape_string($conn, $_POST['precio_producto']);
            $marca = mysqli_real_escape_string($conn, $_POST['marca_producto']);
            $categoria = mysqli_real_escape_string($conn, $_POST['categoria_producto']);

            $sql_check = "SELECT * FROM productos WHERE nombre='$nombre'";
            $result_check = mysqli_query($conn, $sql_check);

            if (mysqli_num_rows($result_check) > 0) {
                echo json_encode(['status' => 'error', 'message' => 'El producto ya está registrado']);
            } else {
                $sql = "INSERT INTO productos (nombre, cantidad, proveedor, precio, marca, codigo, imagen)
                        VALUES ('$nombre', $cantidad, '$proveedor', $precio, '$marca', '$categoria', '$target_file')";
                
                if (mysqli_query($conn, $sql)) {
                    echo json_encode(['status' => 'success', 'message' => 'Producto guardado con éxito']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error al guardar el producto: ' . mysqli_error($conn)]);
                }
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al mover la imagen']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Solo se permiten imágenes en formatos JPG, JPEG, PNG o GIF']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al recibir la imagen']);
}
        break;
		
		case 'venta':
    $cedula = mysqli_real_escape_string($conn, $_POST['cedula_cliente']);
    $productos = isset($_POST['productos_json']) ? $_POST['productos_json'] : '[]';
    $servicios = isset($_POST['servicios_json']) ? $_POST['servicios_json'] : '[]';
    $iva = mysqli_real_escape_string($conn, $_POST['iva_venta']);
    $total_pagar = mysqli_real_escape_string($conn, $_POST['total_venta']);
    $metodo_pago = mysqli_real_escape_string($conn, $_POST['metodo_pago']);	
    $vendedor = mysqli_real_escape_string($conn, $_POST['vendedor_venta']);

    $sql = "INSERT INTO ventas (cedula_cliente, productos, servicios, iva, total_pagar, metodo, vendedor)
            VALUES ('$cedula', '$productos', '$servicios', '$iva', '$total_pagar', '$metodo_pago','$vendedor')";

   if (mysqli_query($conn, $sql)) {
            echo json_encode(['status' => 'success', 'message' => 'Venta registrada con éxito']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al registrar la venta: ' . mysqli_error($conn)]);
        }
    break;


    default:
        echo json_encode(['status' => 'error', 'message' => 'Tipo no valido']);
        break;
}


mysqli_close($conn);
?>