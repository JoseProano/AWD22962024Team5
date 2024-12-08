<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header('Location: login.php');
    exit();
}
include 'db.php';

// Obtener estadísticas existentes
$sql_clients = "SELECT COUNT(*) as total FROM clientes";
$result_clients = mysqli_query($conn, $sql_clients);
$clients_count = mysqli_fetch_assoc($result_clients)['total'];

$sql_sales = "SELECT COUNT(*) as total FROM ventas";
$result_sales = mysqli_query($conn, $sql_sales);
$sales_count = mysqli_fetch_assoc($result_sales)['total'];

$sql_products = "SELECT COUNT(*) as total FROM productos";
$result_products = mysqli_query($conn, $sql_products);
$products_count = mysqli_fetch_assoc($result_products)['total'];

$sql_users = "SELECT COUNT(*) as total FROM perfiles";
$result_users = mysqli_query($conn, $sql_users);
$users_count = mysqli_fetch_assoc($result_users)['total'];

$sql_providers = "SELECT COUNT(*) as total FROM proveedores";
$result_providers = mysqli_query($conn, $sql_providers);
$providers_count = mysqli_fetch_assoc($result_providers)['total'];

$usuario = $_SESSION['usuario'];
$sql_user = "SELECT * FROM perfiles WHERE usuario = '$usuario'";
$result_user = mysqli_query($conn, $sql_user);
$user = mysqli_fetch_assoc($result_user);

$permisos = isset($_SESSION['permisos']) ? $_SESSION['permisos'] : [];

mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio - SPA</title>
    <link rel="stylesheet" href="../css/estilopaginas.css">
</head>
<body>
<div class="header">
    <div class="header-content">
        <div class="user-info">
			<div class="username">
                <?php echo htmlspecialchars($user['usuario'] ); ?>
            </div>
            <div class="avatar">
                <img src="../img/avatar-male2.png" alt="Avatar">
            </div>
            
        </div>
        <button class="logout" id="logoutBtn">
            <i class="fa fa-sign-out-alt"></i> Cerrar sesión
        </button>
    </div>
</div>


<div class="sidebar">
    <h1>Inicio</h1>
    <p>&nbsp</p>
    <div class="avatar">
        <img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Avatar">
    </div>
    <!-- Mostrar elementos de menú según permisos -->
    <?php if (in_array('Inicio', $permisos)): ?>
        <div class="menu-item">
            <a href="#">Inicio</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Asignar', $permisos)): ?>
        <div class="menu-item">
            <a href="asignar.php">Asignar</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Cliente', $permisos)): ?>
        <div class="menu-item">
            <a href="cliente.php">Cliente</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Ventas', $permisos)): ?>
        <div class="menu-item">
            <a href="ventas.php">Ventas</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Productos', $permisos)): ?>
        <div class="menu-item">
            <a href="productos.php">Inventario</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Proveedores', $permisos)): ?>
        <div class="menu-item">
            <a href="proveedores.php">Proveedores</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Reportes', $permisos)): ?>
        <div class="menu-item">
            <a href="reportes.php">Reportes</a>
        </div>
    <?php endif; ?>
</div>

<div class="main-content">
    <h2>Estadísticas</h2>
    <div class="stats">
        <div class="stat-box">
            <i class="fa fa-users"></i>
            <div>Total Clientes</div>
            <div><?php echo $clients_count; ?></div>
        </div>
        <div class="stat-box">
            <i class="fa fa-shopping-cart"></i>
            <div>Total Ventas</div>
            <div><?php echo $sales_count; ?></div>
        </div>
        <div class="stat-box">
            <i class="fa fa-box"></i>
            <div>Total Productos</div>
            <div><?php echo $products_count; ?></div>
        </div>
        <div class="stat-box">
            <i class="fa fa-user"></i>
            <div>Total Usuarios</div>
            <div><?php echo $users_count; ?></div>
        </div>
        <div class="stat-box">
            <i class="fa fa-truck"></i>
            <div>Total Proveedores</div>
            <div><?php echo $providers_count; ?></div>
        </div>
    </div>
</div>

<div id="logoutModal" style="display: none;">
    <div class="modal-content">
        <p>¿Estás seguro de que deseas cerrar sesión?</p>

        <button id="confirmLogout">Sí</button>
        <button id="cancelLogout">No</button>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
<script src="../js/codigos.js"></script>
</body>
</html>
