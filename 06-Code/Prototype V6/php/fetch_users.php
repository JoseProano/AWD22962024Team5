<?php
session_start();
include 'db.php';

$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : 'perfiles'; 

switch ($tipo) {
    case 'perfiles':
        $query = "SELECT id, nombre, apellido, email, genero, fecha_nacimiento, cedula, usuario, perfil, estado FROM perfiles ORDER BY id DESC";
        $headers = ['ID', 'Nombres', 'Apellidos', 'Email', 'Género', 'Fecha de Nacimiento', 'Cédula', 'Usuario', 'Perfil', 'Estado', 'Acciones'];
        break;

    case 'clientes':
        $query = "SELECT id, nombre, apellido, email, genero, fecha_nacimiento, cedula, numero, locacion, estado FROM clientes ORDER BY id DESC";
        $headers = ['ID', 'Nombres', 'Apellidos', 'Email', 'Género', 'Fecha de Nacimiento', 'Cédula', 'Número', 'Locación', 'Estado', 'Acciones'];
        break;

    case 'proveedores':
        $query = "SELECT id, nombre_empresa, email, numero, web, estado FROM proveedores ORDER BY id DESC";
        $headers = ['ID', 'Nombre de la Empresa', 'Email', 'Número', 'Web', 'Estado', 'Acciones'];
        break;

    case 'productos':
        $query = "SELECT id, nombre, cantidad, proveedor, precio, marca, codigo, estado FROM productos ORDER BY id DESC";
        $headers = ['ID', 'Nombre', 'Cantidad', 'Proveedor', 'Precio de Venta', 'Material', 'Código Producto', 'Estado', 'Acciones'];
        break;

    case 'ventas':
        $query = "SELECT id, cedula_cliente, total_pagar, vendedor, fecha_creacion, estado FROM ventas ORDER BY id DESC";
        $headers = ['ID', 'Cédula Cliente', 'Total a Pagar', 'Vendedor', 'Fecha de Creación', 'Estado', 'Acciones'];
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Tipo no válido']);
        exit;
}

$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo '<table class="user-table">';
    echo '<thead><tr>';

    foreach ($headers as $header) {
        echo '<th>' . htmlspecialchars($header) . '</th>';
    }

    echo '</tr></thead>';
    echo '<tbody>';

    while ($row = mysqli_fetch_assoc($result)) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($row['id']) . '</td>';

        switch ($tipo) {
            case 'perfiles':
                echo '<td>' . htmlspecialchars($row['nombre']) . '</td>';
                echo '<td>' . htmlspecialchars($row['apellido']) . '</td>';
                echo '<td>' . htmlspecialchars($row['email']) . '</td>';
                echo '<td>' . htmlspecialchars($row['genero']) . '</td>';
                echo '<td>' . htmlspecialchars($row['fecha_nacimiento']) . '</td>';
                echo '<td>' . htmlspecialchars($row['cedula']) . '</td>';
                echo '<td>' . htmlspecialchars($row['usuario']) . '</td>';
                echo '<td>' . htmlspecialchars($row['perfil']) . '</td>';
                echo '<td>' . htmlspecialchars($row['estado']) . '</td>';
                break;

            case 'clientes':
                echo '<td>' . htmlspecialchars($row['nombre']) . '</td>';
                echo '<td>' . htmlspecialchars($row['apellido']) . '</td>';
                echo '<td>' . htmlspecialchars($row['email']) . '</td>';
                echo '<td>' . htmlspecialchars($row['genero']) . '</td>';
                echo '<td>' . htmlspecialchars($row['fecha_nacimiento']) . '</td>';
                echo '<td>' . htmlspecialchars($row['cedula']) . '</td>';    
                echo '<td>' . htmlspecialchars($row['numero']) . '</td>';
                echo '<td>' . htmlspecialchars($row['locacion']) . '</td>';
                echo '<td>' . htmlspecialchars($row['estado']) . '</td>';
                break;

            case 'proveedores':
                echo '<td>' . htmlspecialchars($row['nombre_empresa']) . '</td>';
                echo '<td>' . htmlspecialchars($row['email']) . '</td>';
                echo '<td>' . htmlspecialchars($row['numero']) . '</td>';
                echo '<td>' . htmlspecialchars($row['web']) . '</td>';
                echo '<td>' . htmlspecialchars($row['estado']) . '</td>';
                break;

            case 'productos':
                echo '<td>' . htmlspecialchars($row['nombre']) . '</td>';
                echo '<td>' . htmlspecialchars($row['cantidad']) . '</td>';
                echo '<td>' . htmlspecialchars($row['proveedor']) . '</td>';
                echo '<td>' . htmlspecialchars($row['precio']) . '</td>';
                echo '<td>' . htmlspecialchars($row['marca']) . '</td>';
                echo '<td>' . htmlspecialchars($row['codigo']) . '</td>';
                echo '<td>' . htmlspecialchars($row['estado']) . '</td>';
                break;


            case 'ventas':
                echo '<td>' . htmlspecialchars($row['cedula_cliente']) . '</td>';
                echo '<td>' . htmlspecialchars($row['total_pagar']) . '</td>';
                echo '<td>' . htmlspecialchars($row['vendedor']) . '</td>';
                echo '<td>' . htmlspecialchars($row['fecha_creacion']) . '</td>';
                echo '<td>' . htmlspecialchars($row['estado']) . '</td>';
                break;
        }

        echo '<td>';
        echo '<div class="action-buttons">';
        
        if ($tipo == 'productos') {
            echo '<button class="btn-add-product" data-id="' . htmlspecialchars($row['id']) . '"><i class="fa fa-plus"></i> Añadir</button>';
        }

        if ($tipo == 'ventas') {
            echo '<button class="btn-invoice" data-id="' . htmlspecialchars($row['id']) . '"><i class="fa fa-file"></i> Factura</button>';
        } else {
            if ($row['estado'] == 'inactivo') {
                echo '<button class="btn-activate" data-id="' . htmlspecialchars($row['id']) . '" data-tipo="' . htmlspecialchars($tipo) . '"><i class="fa fa-check"></i> Activar</button>';
            } else {
                echo '<button class="btn-deactivate" data-id="' . htmlspecialchars($row['id']) . '" data-tipo="' . htmlspecialchars($tipo) . '"><i class="fa fa-ban"></i> Desactivar</button>';
            }
            echo '<button class="btn-edit" data-id="' . htmlspecialchars($row['id']) . '" data-tipo="' . htmlspecialchars($tipo) . '"><i class="fa fa-pencil-alt"></i> Editar</button>';
        }

        echo '</div>';
        echo '</td>';
        echo '</tr>';
    }

    echo '</tbody>';
    echo '</table>';
} else {
    echo '<p>No hay datos disponibles.</p>';
}

mysqli_close($conn);
?>
