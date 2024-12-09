<?php

include_once($_SERVER['DOCUMENT_ROOT'] . '/WEBP/admin/php/db.php');

$query = "SELECT id, nombre, cantidad, proveedor, precio, marca, codigo, estado, fecha_creacion, imagen FROM productos WHERE estado = 'activo'";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(['status' => 'error', 'message' => 'Error al ejecutar la consulta: ' . mysqli_error($conn)]);
    exit;
}
$productos = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_close($conn);

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

if (isset($_GET['add'])) {
    $productId = $_GET['add'];
    $productName = urldecode($_GET['name']);
    $productPrice = floatval($_GET['price']);
    $productQuantity = intval($_GET['quantity']);
    $productProvider = urldecode($_GET['provider']);
    $productBrand = urldecode($_GET['brand']);

    $productExists = false;
    foreach ($_SESSION['cart'] as &$product) {
        if ($product['id'] == $productId) {
            $product['quantity'] += 1;
            $productExists = true;
            break;
        }
    }

    if (!$productExists) {
        $_SESSION['cart'][] = [
            'id' => $productId,
            'name' => $productName,
            'price' => $productPrice,
            'quantity' => 1,
        ];
    }

    header("Location: productCatalog.php");
    exit;
}

$cartCount = count($_SESSION['cart']);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Productos</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/styleCatalog.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
<?php include 'generateMenu.php'; ?>
<header class="main-header">
    <div class="logo-container">
        <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Logo MADECOR" class="team-photo"></a>
        <div class="company-info">
            <h1>MADECOR</h1>
            <p class="slogan">Materiales Educativos, Mobiliario Infantil y Juguetes</p>
        </div>
    </div>

<div class="cart-container">
    <a href="cart.php"><i class="fas fa-shopping-cart"></i> <span id="cart-count"><?php echo $cartCount; ?></span></a>
</div>

<div class="login-icon">
    <?php
    session_start();
    if (isset($_SESSION['usuario'])) {
        echo '<span>Bienvenido, ' . htmlspecialchars($_SESSION['usuario']) . '</span>';
        echo ' <a href="logout.php" title="Cerrar sesión"><i class="fa fa-sign-out" aria-hidden="true"></i></a>';
    } else {
        echo '<a href="../../admin/php/login.php" title="Login"><i class="fa fa-sign-in" aria-hidden="true"></i></a>';
        echo ' | <a href="customer_registration.php" title="Registrarse">Registrarse</a>';
    }
    ?>
</div>

<div class="logout-container">
    <?php if (isset($_SESSION['usuario'])): ?>
        <a href="logout.php" class="logout-button">Cerrar sesión</a>
    <?php endif; ?>
</div>
    
</header>
<div class="top-menu">
    <?php generateMenu('../txt/menu.txt'); ?>
</div>

<div class="container">
    <div class="side-menu">
        <h3>Navegación</h3>
        <?php generateMenu('../txt/sideProducts.txt'); ?>
    </div>

    <main>
        <section id="puzzles">
            <h2>Material Didactico y juguetes educativos para niños</h2>
            <div class="catalog">
                <?php foreach ($productos as $producto): ?>
                    <div class="product">
                        <img src="../../admin/products/<?php echo $producto['imagen']; ?>" alt="<?php echo $producto['nombre']; ?>">
                        <h3><?php echo $producto['nombre']; ?></h3>
                        <p>$<?php echo number_format($producto['precio'], 2); ?></p>
                        <button onclick="openModal(
                            '<?php echo addslashes($producto['nombre']); ?>', 
                            '<?php echo addslashes($producto['precio']); ?>', 
                            '<?php echo addslashes($producto['cantidad']); ?>', 
                            '<?php echo addslashes($producto['marca']); ?>', 
                            '<?php echo addslashes($producto['proveedor']); ?>')">Más Información</button>
                        <a href="productCatalog.php?add=<?php echo $producto['id']; ?>&name=<?php echo urlencode($producto['nombre']); ?>&price=<?php echo $producto['precio']; ?>&quantity=<?php echo $producto['cantidad']; ?>&provider=<?php echo urlencode($producto['proveedor']); ?>&brand=<?php echo urlencode($producto['marca']); ?>" class="button">Añadir al Carrito</a>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
    </main>
</div>

<!-- Modal -->
<div id="productModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3 id="modal-name"></h3>
        <p><strong>Precio:</strong> $<span id="modal-price"></span></p>
        <p><strong>Cantidad:</strong> <span id="modal-quantity"></span></p>
        <p><strong>Marca:</strong> <span id="modal-brand"></span></p>
        <p><strong>Proveedor:</strong> <span id="modal-provider"></span></p>
    </div>
</div>

<script>
    function openModal(name, price, quantity, brand, provider) {
        document.getElementById("modal-name").innerText = name;
        document.getElementById("modal-price").innerText = price;
        document.getElementById("modal-quantity").innerText = quantity;
        document.getElementById("modal-brand").innerText = brand;
        document.getElementById("modal-provider").innerText = provider;
        document.getElementById("productModal").style.display = "block";
    }

    document.querySelector(".close").onclick = function() {
        document.getElementById("productModal").style.display = "none";
    }
</script>

</body>
</html>
