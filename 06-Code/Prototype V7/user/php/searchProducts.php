<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/WEBP/admin/php/db.php');


if (isset($_GET['query'])) {
    $query = '%' . $_GET['query'] . '%';
    $sql = "SELECT id, nombre, precio, imagen, descripcion FROM productos WHERE nombre LIKE ? OR descripcion LIKE ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, 'ss', $query, $query);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    echo json_encode($products);
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Búsqueda de Productos</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/styleSearch.css">
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
    <div class="login-icon">
        <a href="../admin/php/login.php" title="Login">
            <i class="fa fa-sign-in" aria-hidden="true"></i>
        </a>
    </div>
</header>

<div class="top-menu">
    <?php generateMenu('../txt/menu.txt'); ?>
</div>

<div class="container">
    <div class="side-menu">
        <h3>Navegación</h3>
        <?php generateMenu('../txt/sideSearch.txt'); ?>
    </div>

    <div class="page-container">
        <div id="search-container">
            <h1 id="search-description">Busca productos como juguetes, bloques de construcción y más...</h1>
            <br><br><br>
            <input type="text" id="search-input" placeholder="Buscar Productos..." oninput="searchProducts()">
            <div id="results"></div>
        </div>
    </div>
</div>

<div id="product-modal" class="modal">
    <div id="modal-content">
        <img id="modal-product-image" src="" alt="Imagen del producto">
        <h3 id="modal-product-name"></h3>
        <p id="modal-product-price"></p>
        <p id="modal-product-description"></p>
        <button id="close-modal">Cerrar</button>
    </div>
</div>

<script>
    function searchProducts() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';  

        if (query === '') {
            resultsContainer.style.display = 'none';
            return;
        }
        
        fetch('searchProducts.php?query=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    resultsContainer.style.display = 'block';
                    data.forEach(product => {
                        const productElement = document.createElement('div');
                        productElement.classList.add('result-item');
                        productElement.innerHTML = `
                        <div class="result-info">
                            <img class="result-image" src="${product.imagen ? "../../admin/products/" + product.imagen : "../img/default.jpg"}" alt="Imagen del producto">
                            <div class="product-details">
                                <h3 class="product-name">${product.nombre}</h3>
                                <p class="product-price">${product.precio ? '$' + product.precio : "Precio no disponible"}</p>
                            </div>
                        </div>
                        `;
                        productElement.onclick = function() {
                            openModal(product);
                        };
                        resultsContainer.appendChild(productElement);
                    });
                } else {
                    resultsContainer.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error en la búsqueda:', error);
            });
    }

    function openModal(product) {
        const imageUrl = product.imagen ? "../../admin/products/" + product.imagen : "../img/default.jpg"; // Si no hay imagen, mostrar una por defecto
        document.getElementById('modal-product-image').src = imageUrl;
        document.getElementById('modal-product-name').textContent = product.nombre || "Nombre no disponible";
        document.getElementById('modal-product-price').textContent = product.precio ? `Precio: ${product.precio}` : "Precio no disponible";

        document.getElementById('product-modal').style.display = 'flex';
    }

    document.getElementById('close-modal').onclick = function() {
        document.getElementById('product-modal').style.display = 'none';
    };

    window.onclick = function(event) {
        const modal = document.getElementById('product-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
</script>

<style>
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }

    #modal-content {
        background-color: white;
        padding: 20px;
        width: 80%;
        max-width: 600px;
        border-radius: 10px;
        text-align: center;
    }

    #modal-product-image {
        max-width: 80%;
        height: auto;
        margin-bottom: 20px;
    }

    #close-modal {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    #close-modal:hover {
        background-color: #0056b3;
    }

    /* Estilos para los resultados de búsqueda */
    .result-item {
        margin-bottom: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .result-item:hover {
        background-color: #f0f0f0;
    }

    .result-info {
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .result-info img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        object-fit: cover;
    }

    .result-info h3 {
        margin: 0;
        font-size: 18px;
    }

    .result-info p {
        margin: 5px 0;
        font-size: 16px;
    }
</style>

</body>
</html>
