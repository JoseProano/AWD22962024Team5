<?php
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

if (isset($_GET['remove'])) {
    $productId = $_GET['remove'];
    foreach ($_SESSION['cart'] as $key => $product) {
        if ($product['id'] == $productId) {
            unset($_SESSION['cart'][$key]);
            break;
        }
    }
    header("Location: cart.php");
    exit;
}

function getTotalPrice() {
    $total = 0;
    foreach ($_SESSION['cart'] as $product) {
        $quantity = isset($product['quantity']) ? (int)$product['quantity'] : 1; 
        $total += (float)$product['price'] * $quantity;
    }
    return $total;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito de Compras</title>
    <link rel="stylesheet" href="../css/cartStyle.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <script>

        function updatePrice(productId) {
            const quantity = document.getElementById('quantity-' + productId).value;
            const price = document.getElementById('price-' + productId).value;
            const totalElement = document.getElementById('total-' + productId);
            const totalPrice = parseFloat(price) * parseInt(quantity);
            
            totalElement.innerHTML = '$' + totalPrice.toFixed(2);

            const formData = new FormData();
            formData.append('product_id', productId);
            formData.append('quantity', quantity);
            formData.append('update_quantity', true);

            fetch('cart.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('total-cart').innerHTML = '$' + data.newTotal.toFixed(2);
            });
        }
    </script>
    
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
</header>

<div class="cart-container">

    <?php if (count($_SESSION['cart']) > 0): ?>
        <form action="cart.php" method="POST">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($_SESSION['cart'] as $product): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($product['name']); ?></td>
                            <td>
                                <input type="hidden" id="price-<?php echo $product['id']; ?>" value="<?php echo $product['price']; ?>">
                                $<?php echo number_format($product['price'], 2); ?>
                            </td>
                            <td>
                                <input type="number" id="quantity-<?php echo $product['id']; ?>" name="quantity" value="<?php echo isset($product['quantity']) ? $product['quantity'] : 1; ?>" min="1" class="quantity-input" onchange="updatePrice(<?php echo $product['id']; ?>)">
                            </td>
                            <td><a href="?remove=<?php echo $product['id']; ?>" class="remove-btn">Eliminar</a></td>
                            <td id="total-<?php echo $product['id']; ?>">
                                $<?php echo number_format($product['price'], 2); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </form>

        <div class="cart-total">
            <h3>Total: $<?php echo number_format(getTotalPrice(), 2); ?></h3>
        </div>

        <div class="button-container">
            <button onclick="openModal()" class="pay-button">Pagar</button>
            <button onclick="history.back()" class="back-button">Atrás</button>
        </div>
    <?php else: ?>
        <p>Tu carrito está vacío.</p>
    <?php endif; ?>
</div>

<div id="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <div class="modal-header">
            <h2>Resumen de Compra</h2>
        </div>
        <div class="modal-body">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($_SESSION['cart'] as $product): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($product['name']); ?></td>
                            <td><?php echo isset($product['quantity']) ? $product['quantity'] : 1; ?></td>
                            <td>$<?php echo number_format($product['price'] * (isset($product['quantity']) ? $product['quantity'] : 1), 2); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button class="cancel" onclick="closeModal()">Cancelar</button>
            <button onclick="confirmPurchase()">Confirmar Compra</button>
        </div>
    </div>
</div>

<script>  
    function openModal() {
        document.getElementById('modal').style.display = 'flex';
    }
    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }
    function confirmPurchase() {
        window.location.href = "contactForm.php";
    }
</script>

<footer class="footer">
    <p>© 2025 MADECOR | Todos los derechos reservados</p>
</footer>

</body>

</html>
