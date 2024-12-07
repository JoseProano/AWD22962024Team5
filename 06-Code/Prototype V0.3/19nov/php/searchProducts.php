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

    <script>
        const products = [
            {
                name: "Rompecabezas Arca de Noé",
                price: "$9.85",
                description: "Hecho de madera de buena calidad y con impresión UV directa. No tóxico. Edad recomendada a partir de 1 año.",
                image: "../img/products/puzzle1.png"
            },
            {
                name: "Rompecabezas de Animales Salvajes",
                price: "$6.00",
                description: "30x40cm. Hecho de madera de buena calidad y con impresión UV directa. No tóxico. Edad recomendada a partir de 1 año.",
                image: "../img/products/puzzle2.png"
            },
            {
                name: "Bloques de Construcción 100 piezas",
                price: "$25.00",
                description: "Set de construcción de madera de 100 piezas con formas geométricas. No tóxico. Edad recomendada a partir de 1 año.",
                image: "../img/products/blocks1.png"
            },
            {
                name: "Carro | Bloques de Construcción",
                price: "$30.00",
                description: "Set de construcción de madera de 38 piezas con formas geométricas y un carro con ruedas. No tóxico. Edad recomendada a partir de 1 año.",
                image: "../img/products/blocks2.png"
            },
            {
                name: "Bloques de Espuma para Construcción",
                price: "$75.00",
                description: "Bloques temáticos para castillos. Edad recomendada a partir de 1 año.",
                image: "../img/products/blocks3.png"
            },
            {
                name: "Ábaco Gigante",
                price: "$45.00",
                description: "Ábaco educativo para niños pequeños.",
                image: "../img/products/edutoy1.png"
            },
            {
                name: "Base 10 para Juguetes",
                price: "$17.00",
                description: "Set de bloques avanzado para aprender matemáticas.",
                image: "../img/products/edutoys2.png"
            },
            {
                name: "Circuito de 3 Vías",
                price: "$12.00",
                description: "Labertinto de madera con cuentas de diferentes formas geométricas.",
                image: "../img/products/edutoy3.png"
            },
            {
                name: "Tablero Geométrico",
                price: "$21.00",
                description: "Recurso educativo que ayuda a desarrollar conceptos geométricos.",
                image: "../img/products/edutoy4.png"
            }
        ];

        function searchProducts() {
            const query = document.getElementById('search-input').value.toLowerCase();
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';  // Limpiar resultados anteriores

            if (query === '') {
                resultsContainer.style.display = 'none';
                return;
            }

            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                resultsContainer.style.display = 'block';
                filteredProducts.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('result-item');

                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="result-img">
                        <div class="result-info">
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                            <p>${product.description}</p>
                        </div>
                    `;
                    resultsContainer.appendChild(productElement);
                });
            } else {
                resultsContainer.style.display = 'none';
            }
        }
    </script>

</body>
</html>
